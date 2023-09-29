import React, {useEffect, useState} from 'react';

import {FormControl, MenuItem, Select} from "@mui/material";

import {CiEdit} from "react-icons/ci";
import {FcCheckmark} from "react-icons/fc";
import {VscClose} from "react-icons/vsc";
import CreateCategory from "@/app/dashboard/categoryDashboard/CreateCategory";
import CategoryNamesList from "@/app/dashboard/categoryDashboard/CategoryNamesList";
import {useAppStore} from "@/app/store/slice";
import {shallow} from "zustand/shallow";
import FTrClient from "@/app/service/axios/FTrClient";
import PopoverCategoryChange from "./PopoverCategoryChange";

const CategoryList = ({allRecords}) => {
    console.log(process.env.BACKEND_URL);
    const [username, initSumByCategories] = useAppStore(
        (state) => [state.username, state.initSumByCategories],
        shallow
    );
    const [expences, setExpences] = useState(allRecords);
    const [categories, setCategories] = useState([]);
    const [groupedByCategory, setGroupedByCategory] = useState({});
    const [sumByCategories, setSumByCategories] = useState({});
    const [onEdit, setOnEdit] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    // const username = useAppStore((state) => state.username);
    // const username = 'salatsynskahv@gmail.com';

    //if user login and have categories - apply users
    //if user logged and don't have categories - find used categories by user and copy them to table


    useEffect(() => {
            const getCategories = async () => {
                console.log(allRecords);

                const createDefaultUserCategories = async () => {
                    const defaultCategories = await FTrClient.get('/allCategories');

                    const usedKeys = new Set();
                    allRecords.forEach(record => usedKeys.add(record.categoryCode));

                    const flatDefaultCategories = {};
                    defaultCategories.data.forEach(item => {
                        return item.codes.forEach(code => {
                            flatDefaultCategories[code] = item;
                        });
                    });

                    const usedCategories = new Set();
                    usedKeys.forEach((key) => {
                        const category = flatDefaultCategories[key];
                        if (category) {
                            usedCategories.add(category);
                            const value = groupedByCategory[key];
                            delete groupedByCategory[key];
                            groupedByCategory[category.name] = groupedByCategory[category.name] ? [...groupedByCategory[category.name], ...value] : value;
                        }
                    });
                    return usedCategories;
                }
                FTrClient.get('/allUserCategories', {params: {username: username}})
                    .then(
                        async (response) => {
                            let usedCategories;
                            if (response.data.length < 1) {
                                usedCategories = await createDefaultUserCategories();
                                usedCategories = Array.from(usedCategories);
                                setCategories(usedCategories);
                                // console.log(usedCategories);
                                await FTrClient.post('/allUserCategories',
                                    {
                                        username: username,
                                        categories: usedCategories
                                    }
                                );
                                groupByCategoriesAllExpences(usedCategories);
                            } else {
                                usedCategories = response.data[0].categories;
                                setCategories(usedCategories);
                                groupByCategoriesAllExpences(usedCategories);
                            }
                        }
                    );
            }
            getCategories();

        }, []
    );

    useEffect(() => {
        initSumByCategories(sumByCategories);
    }, [sumByCategories]);

    const sortList = (list) => {
        const res = {}
        const sortedKeys = Object.keys(list).sort();
        sortedKeys.forEach(key => res[key] = list[key]);
        console.log(res);
        return res;
    }


    const groupByCategoriesAllExpences = (usedCategories) => {
        if (!usedCategories || usedCategories.length < 1) {
            return;
        }
        const flatCodesCategories = {};
        const flatShopsCategories = {}
        usedCategories.forEach(item => {
            item.codes?.forEach(code => {
                flatCodesCategories[code] = item;
            });
            item.shops?.forEach(shop => {
                flatShopsCategories[shop] = item;
            });
        });
        const sumByCtgLocal = {};
        const groupedByCtg = expences.reduce((accumulator, currentValue) => {
            const foundByShopCategory = flatShopsCategories[currentValue.details];
            if (foundByShopCategory) {
                (accumulator[foundByShopCategory.name] = accumulator[foundByShopCategory.name] || []).push(currentValue);
                sumByCtgLocal[foundByShopCategory.name] = (sumByCtgLocal[foundByShopCategory.name] || 0) + currentValue.sum;
                return accumulator;
            }
            const foundByCodeCategory = flatCodesCategories[currentValue.categoryCode];
            if (foundByCodeCategory) {
                console.log(foundByCodeCategory);
                (accumulator[foundByCodeCategory.name] = accumulator[foundByCodeCategory.name] || []).push(currentValue);
                sumByCtgLocal[foundByCodeCategory.name] = (sumByCtgLocal[foundByCodeCategory.name] || 0) + currentValue.sum;
                return accumulator;
            }
            (accumulator['Others'] = accumulator['Others'] || []).push(currentValue);
            sumByCtgLocal['Others'] = (sumByCtgLocal['Others'] || 0) + currentValue.sum;
            return accumulator;
        }, {});
        console.log(groupedByCtg);
        setSumByCategories(sumByCtgLocal);
        setGroupedByCategory(sortList(groupedByCtg));
    }
    const toggleItem = (e) => {
        const classList = e.currentTarget.classList;
        const nextElement = e.currentTarget.nextSibling;
        if (!classList.contains('active')) {
            classList.add('active');
            nextElement.style.display = 'block';
        } else {
            classList.remove('active');
            nextElement.style.display = 'none';
        }
    }

    const nameSpan = (key) => {
        if (onEdit === key) {
            return <>
                <div style={{display: "inline"}}>
                    <FormControl sx={{m: 1}} size="small">
                        <Select
                            id="edit-category-select"
                            value={selectedCategory || 'select category'}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                            }}
                        >
                            {
                                categories.map((value, index) => {
                                    return (
                                        <MenuItem key={index} value={value.name}>
                                            {value.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <button className="btn"
                            onClick={() => {
                                saveSelectedCategory(key);
                            }}>
                        <FcCheckmark/>
                    </button>
                </div>
                <button className="btn"
                        onClick={() => {
                            setSelectedCategory(null);
                            setOnEdit(null);
                        }}>
                    <VscClose/>
                </button>

            </>
        } else {
            return <>
                <span>{key} <strong>{sumByCategories[key]}</strong></span>
                <button className="btn"
                        onClick={() => {
                            setOnEdit(key);
                        }}>
                    <CiEdit/>
                </button>
            </>
        }
    }


    const saveSelectedCategory = (key) => {
        const newGroupedByCategory = {...groupedByCategory};
        // console.log(newGroupedByCategory);
        const value = newGroupedByCategory[key];
        delete newGroupedByCategory[key];
        // console.log(selectedCategory);

        newGroupedByCategory[selectedCategory] = newGroupedByCategory[selectedCategory] ? [...newGroupedByCategory[selectedCategory], ...value] : [...value];
        setGroupedByCategory(newGroupedByCategory);
        setOnEdit(null);


        const newCategories = [...categories];
        const targetCategory = newCategories.find(value => value.name === selectedCategory);
        targetCategory && targetCategory.codes.push(key);
        // console.log(newCategories);
        setCategories(newCategories);
        FTrClient.patch(`/editUserCategoryCode`, {
            username: 'salatsynskahv@gmail.com',
            categoryName: selectedCategory,
            codes: targetCategory.codes

        }).then((response) => {
                // console.log(response);
            }
        );
        // console.log(targetCategory);
    }

    const showDateRange = () => {
        console.log(allRecords);
        if(!allRecords || allRecords.length <= 0) {
            return;
        }
        const start = allRecords[allRecords.length-1]?.dateOfOperation;
        const end = allRecords[0]?.dateOfOperation;
        return start.slice(0, 10) + ' - '+ end.slice(0,10);
    }

    return (
        <>
            {
                categories &&
                    <div className="custom-category-container">
                        <div>
                            <div className="d-flex align-middle">
                                <span className="custom-category-title"> All Categories </span>
                                <CreateCategory categories={categories} setCategories={setCategories}/>
                            </div>
                            <CategoryNamesList
                                categories={categories}
                                setCategories={setCategories}
                                toggleItem={toggleItem}
                            />
                        </div>
                        <div className="list-container">
                            <div className="date-range"><p>Date range: {showDateRange()}</p></div>
                            <ul className="acc">
                                {
                                    Object.entries(groupedByCategory).map(([key, values]) => (
                                            <li key={key} className="li-item">
                                                {nameSpan(key)}

                                                <button className="acc_ctrl" onClick={toggleItem}>
                                                </button>
                                                <div className="acc_panel">
                                                    {
                                                        values.map(item =>
                                                            <div key={item.dateOfOperation} className="category-item">
                                                                <p> {item.details} </p>
                                                                <p> {item.sum}</p>
                                                                <PopoverCategoryChange item={item}
                                                                                       changeCategory={(category, expenseItem) => {
                                                                                           // console.log(category);

                                                                                           const newCategories = [...categories];
                                                                                           const targetCategory = newCategories.find(item => item.name === category);
                                                                                           if (targetCategory) {
                                                                                               targetCategory.shops.push(expenseItem.details);
                                                                                               setCategories(newCategories);
                                                                                               // console.log(categories);
                                                                                           }
                                                                                           // console.log(expenseItem);

                                                                                           FTrClient.patch('/editUserCategoryShop', {
                                                                                               username: 'salatsynskahv@gmail.com',
                                                                                               categoryName: targetCategory.name,
                                                                                               shops: targetCategory.shops

                                                                                           }).then((response) => {
                                                                                                   groupByCategoriesAllExpences(categories);
                                                                                               }
                                                                                           );

                                                                                       }}
                                                                                       categories={categories}
                                                                />
                                                            </div>)
                                                    }
                                                </div>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                    </div>

            }
        </>
    )

}

export default CategoryList;