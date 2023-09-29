import React from 'react'


const Tabs = ({ tabState, setTabState }) => {
    return (<>
            <div className="tabs">
                <input type="radio" id="radio-1" name="tabs" checked={tabState[0]} onChange={() => setTabState([1, 0, 0])}/>
                <label className="tab" htmlFor="radio-1"> Categories </label>
                <input type="radio" id="radio-2" name="tabs" checked={tabState[1]} onChange={() => setTabState([0, 1, 0])}/>
                <label className="tab" htmlFor="radio-2"> All Expenses </label>
                <input type="radio" id="radio-3" name="tabs" checked={tabState[3]} onChange={() => setTabState([0, 0, 1])}/>
                <label className="tab" htmlFor="radio-3"> Dashboard </label>
                <span className="glider"/>
            </div>
    </>)
}

export default Tabs;