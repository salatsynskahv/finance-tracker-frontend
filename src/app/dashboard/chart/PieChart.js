import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {useAppStore} from "@/app/store/slice";
import {shallow} from "zustand/shallow";
import axios from "axios";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const sumByCategories = useAppStore((state) => state.sumByCategories, shallow);

    if(!sumByCategories){
        return;
    }


    const colors = [
        '#FFC0C0', // Pale Red
        '#8FBC8F', // Dark Sea Green
        '#FFDAB9', // Pale Peach
        '#FAFFC3', // Pale Lime
        '#D9EBFF', // Pale Sky Blue
        '#FFD9FF', // Pale Lavender
        '#a4d5a4', // Forest Green
        '#E0CCFF', // Pale Purple
        '#CFCFFF', // Pale Violet
        '#20B2AA', // Light Sea Green
        '#FFDBFF', // Pale Magenta
        '#FFECB3', // Pale Mustard
        '#E0CCFF', // Pale Purple
        '#FFD9FF', // Pale Lavender
        '#D9EBFF', // Pale Sky Blue
        '#FFECB3', // Pale Mustard
        '#3CB371', // Medium Sea Green
        '#FAFFC3', // Pale Lime
        '#20B2AA', // Light Sea Green
    ];


    const data = {
        labels: Object.keys(sumByCategories),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(sumByCategories),
                backgroundColor: colors,
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                // ],
                borderWidth: 1,
            },
        ],
    };

    return <div className="pie-chart"> <Pie data={data}/> </div>
}

export default PieChart;