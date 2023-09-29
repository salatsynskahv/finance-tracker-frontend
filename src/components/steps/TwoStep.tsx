"use client"
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAppStore} from "@/store/slice";
import {shallow} from "zustand/shallow";
import ParseXlsFile from "@/components/steps/ParseXlsFile";
import DownloadFile from "@/components/steps/DownloadFile";
import Login from "@/components/steps/Login";

function TwoStep() {
    const [step, setStep] = useState(0);
    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    };
    const defineStep = () => {
        switch (step) {
            case 0:
                return (<StepOne handleNextStep={handleNextStep}/>);
            case 1:
                return (<StepTwo/>);
        }
    }
    return (
        <div className="home-page">
            <header>
                <div className="info">
                    <span>
                        Hello! I am your finance helper. I will help you to research your expenses and incomes.
                    </span>
                </div>
            </header>
            <div className="column">
                <div className="multistep-container">
                    <div className="multistep">
                        <div className="line"></div>
                        <div className={(step === 0) ? "step-current" : 'step'}> Step 1</div>
                        <div className="line"></div>
                        <div className={(step === 1) ? "step-current" : 'step'}>Step 2</div>
                        <div className="line"></div>
                    </div>
                    {defineStep()}
                </div>
            </div>
        </div>

    );
}

// @ts-ignore
const StepOne = ({handleNextStep}) => {
    const username = useAppStore(
        (state) => state.username, shallow);

    useEffect(() => {
        if (username) {
            handleNextStep();
        }
    }, [username]);

    console.log(process.env.BACKEND_URL);
    return (
        <div>
            <h4>Please, login with Google to manage categories</h4>
            <Login/>
        </div>
    )
}

const StepTwo = () => {
    const initAllExpences = useAppStore((state) => state.initAllExpences, shallow);
    const router = useRouter();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const loadDemoData = async () => {
        const response = await fetch('/demo/demo.xlsx');
        const data = await response.arrayBuffer();
        ParseXlsFile(data, initAllExpences);
        setIsDataLoaded(true);
    }

    useEffect(() => {
        if (isDataLoaded) {
            router.push('/dashboard');
        }
    }, [isDataLoaded]);


    return (
        <div className="step-two-container">
            <div className="download-data">
                <DownloadFile/>
            </div>

            <div className="demo">
                <p>For Demo purpose use prepared data</p>
                <button type="button" onClick={loadDemoData} className="btn">Load Demo Data</button>
            </div>
        </div>
    )

}
export default TwoStep;