import React from "react";
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import {MdOutlineExpandMore} from "react-icons/md";
import { TiDelete} from "react-icons/ti";
import axios from "axios";
import {useAppStore} from "@/app/store/slice";
import {shallow} from "zustand/shallow";
import FTrClient from "@/app/service/axios/FTrClient";

const CategoryNamesList = ({categories, setCategories}) => {
    const username = useAppStore((state) => state.username, shallow);

    const categoryDelete = (id, name) => {
        console.log(id);
        FTrClient.delete('/deleteCategoryById', {
            data: {
                username: username,
                name: name,
                '_id': id
            }
        }).then((result) => {
            setCategories([...categories.filter(category => category._id !== id)]);
        });


    }
    return (
        <Accordion className="category-names-container">
            {
                categories.map((item) => (
                    <AccordionItem key={item._id}>
                        <AccordionHeader className="category-name-header">
                            <div className="menu"
                                    onClick={(e) => {
                                        categoryDelete(item._id, item.name);
                                    }}>
                                <TiDelete/>
                            </div>
                            <div>
                                <span>{item.name}</span>
                            </div>
                            <MdOutlineExpandMore/>
                        </AccordionHeader>

                        <AccordionBody className="category-name-body">
                            <div className="accordion-body">
                                {item.codes && item.codes.length > 0 && <>
                                    <i>Codes</i>
                                    <ul>
                                        {
                                            item.codes.map(
                                                (code, index) =>
                                                    <li key={index}>
                                                        {code}
                                                    </li>
                                            )
                                        }
                                    </ul>
                                </>
                                }
                                {
                                    item.shops && item.shops.length > 0 && <>
                                        <i>Custom added shops</i>
                                        <ul>
                                            {
                                                item.shops.map((shop, index) => <li key={index}>{shop}</li>
                                                )
                                            }
                                        </ul>
                                    </>
                                }
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                ))
            }
        </Accordion>

    )
}

export default CategoryNamesList;