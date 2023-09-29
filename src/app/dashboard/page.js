"use client"
import {useAppStore} from "@/app/store/slice";
import {useState} from "react";
import CategoryList from "@/app/dashboard/categoryDashboard/CategoryList";
import AllList from "@/app/dashboard/AllList";
import {shallow} from "zustand/shallow";
import Statistics from "@/app/dashboard/chart/Statistics";
import {useRouter} from "next/navigation";
import Tabs from "./Tabs";

export default function Page() {
    const [tabState, setTabState] = useState([1, 0, 0]);
    const [allExpences, username] = useAppStore(
        (state) => [state.allExpences, state.username],
        shallow
    );
    const router = useRouter();

    if(!allExpences || allExpences.length <= 0) {
        router.push('/');
    }

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