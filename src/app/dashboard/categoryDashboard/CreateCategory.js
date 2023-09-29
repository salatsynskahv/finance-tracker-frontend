import React, {useRef, useState} from 'react';
import {Button, Popover} from "@mui/material";
import {MdOutlineAddCircleOutline} from "react-icons/md";
import axios from "axios";
import {useAppStore} from "@/app/store/slice";
import {error} from "next/dist/build/output/log";


const CreateCategory = ({setCategories}) => {
    // const {username} = useAppStore((state) => state.username);
    const username = 'salatsynskahv@gmail.com';
    console.log(username);
    const [categoryName, setCategoryName] = useState();

    const [anchorEl, setAnchorEl] = useState();
    const [validationMessage, setValidationMessage] = useState();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'createCategoryModal' : undefined;

    const addCategory = () => {
        if (validationMessage) {
            return;
        }
        axios.post(`http://localhost:3001/newUserCategory`,
            {
                username: username,
                newCategoryName: categoryName
            }).then(
            (response) => {
                setCategories(response.data.categories);
                handleClose();
            }).catch(error => console.log(error));
    }

    const isValidName = (name) => {
        if (!name || name.length === 0) {
            setValidationMessage((<>Please, provide <em>Category Name</em></>));
            return false;
        }
        setValidationMessage(null);
        return true;
    }

    const clearValidationMessage = (name) => {
        if (name &&  name.length > 0) {
            setValidationMessage(null);
        }
    }

    return (<>
            <button
                type="button"
                className="btn"
                aria-describedby={id}
                onClick={handleClick}
            >
                <MdOutlineAddCircleOutline/>
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className="create-category">
                    <label htmlFor="category-name">
                        Category name
                    </label>
                    <br/>
                    <input id="category-name"
                           value={categoryName}
                           onChange={(e) => {
                               setCategoryName(e.target.value);
                               clearValidationMessage(e.target.value);
                    }}/>
                    <div className="d-flex">
                        <button
                            className="btn btn-primary m-2"
                            onClick={() => {
                                if(isValidName(categoryName)) {
                                    addCategory(categoryName);
                                }
                            }}>
                            Add
                        </button>
                    </div>
                    {validationMessage && <div>{validationMessage}</div>}
                </div>
            </Popover>
        </>
    );
}

export default CreateCategory;