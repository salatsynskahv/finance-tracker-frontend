import React, {useState} from 'react';
import {InputLabel, MenuItem, Popover, Select} from "@mui/material";
import {CiEdit} from "react-icons/ci";

const PopoverCategoryChange = ({item, changeCategory, categories}) => {

    const [selectedRowToEdit, setSelectedRowToEdit] = useState();
    const [anchorEl, setAnchorEl] = useState();
    const [selectedCategory, setSelectedCategory] = useState(item && item.categoryName || (categories[0] && categories[0].name) || '');

    if(!categories) {
        return (<></>)
    }

    return (
        <>
            <button className="btn"
                    aria-describedby="popover"
                    onClick={(e) => {
                        setSelectedRowToEdit(item);
                        setAnchorEl(e.currentTarget);
                    }}>
                <h3><CiEdit/></h3>
            </button>

            {selectedRowToEdit && selectedRowToEdit.dateOfOperation === item.dateOfOperation}
            <Popover
                anchorEl={anchorEl}
                id="popover"
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                open={selectedRowToEdit && selectedRowToEdit.dateOfOperation === item.dateOfOperation}
            >
                <div className="edit-popover-content">
                    {/*<FormControl fullWidht>*/}
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={selectedCategory}
                        label="Category"
                        onChange={(event) => {
                            setSelectedCategory(event.target.value);
                        }}
                    >
                        {
                            categories.map((value, index) => (
                                <MenuItem key={index} value={value.name}>
                                    {value.name}
                                </MenuItem>)
                            )
                        }
                    </Select>
                    {/*</FormControl>*/}
                    <div className="d-flex">
                        <button className="btn btn-secondary m-3"
                                onClick={
                                    () => {
                                        setSelectedRowToEdit(null);
                                        setSelectedCategory(item.categoryName);
                                    }
                                }
                        >
                            Close
                        </button>
                        <button className="btn btn-primary m-3"
                                onClick={(e) => {
                                    const newItem = {...item, categoryName: selectedCategory}
                                    changeCategory(selectedCategory, selectedRowToEdit)
                                }}> Save
                        </button>
                    </div>
                </div>

            </Popover>
        </>
    )
}

export default PopoverCategoryChange;