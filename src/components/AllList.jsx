import React from 'react'

const AllList = ({allExpences}) => {
    return (
        <div className="center-container all-list-padding">
            <table className="all-expences">
                <thead>
                <tr>
                    <th>Date of Operation</th>
                    <th>Details</th>
                    <th>Code</th>
                    <th>Sum</th>
                </tr>
                </thead>
                <tbody>
                {
                    allExpences.map(item =>
                        <tr key={item.dateOfOperation}>
                            {
                                Object.values(item).map((value, index) =>
                                <td key={index}> {value} </td>)
                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default AllList;