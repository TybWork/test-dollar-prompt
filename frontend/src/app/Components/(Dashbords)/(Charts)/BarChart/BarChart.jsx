'use client'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend } from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

const BarChart = ({ labels, myData, bgColor }) => {

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Revenue Graph',
                backgroundColor: bgColor,
                barPercentage: 0.3,
                data: myData,
                borderColor: '#44c151',
                pointHoverRadius: 8,
            },
        ],
    };


    return (
        <div style={{ width: '880px', height: 'auto' }}>
            <Bar
                data={data}
                options={{
                    // maintainAspectRatio: true,
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }}
            />
        // </div>
    )
}

export default BarChart