"use client"

import React, {useState} from "react";

import {shallow} from "zustand/shallow";
import {useAppStore} from "../../store/slice";
import CategoryList from "../../components/categoryDashboard/CategoryList";
import AllList from "../../components/AllList";
import Statistics from "../../components/chart/Statistics";
import Tabs from "@/components/Tabs";

export default function Page() {
    const [tabState, setTabState] = useState([1, 0, 0]);
    const [allExpences, username] = useAppStore(
        (state) => [state.allExpences, state.username],
        shallow
    );
    function getTargetComponent() {
        return (
            tabState[0] && <CategoryList allRecords={allExpences}/> ||
            tabState[1] && <AllList allExpences={allExpences}/> ||
            tabState[2] && <Statistics/>
        )
    }

    return (
        <div className="tabs-main">
            {/*{username}*/}
            <div className="center-container">
                <Tabs tabState={tabState} setTabState={setTabState}/>
            </div>
            <div className="tabs-container">
                {
                    getTargetComponent()
                }
            </div>
        </div>);
}