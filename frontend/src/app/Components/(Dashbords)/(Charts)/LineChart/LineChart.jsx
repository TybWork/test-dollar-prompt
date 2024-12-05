'use client'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

const LineChart = ({ labels, datasets }) => {

    const data = {
        labels: labels || ["Dall-E", 'Midjourney', 'GPT'],
        datasets: datasets || [
            {
                label: 'Active Prompts',
                data: [5, 2, 3],
                fill: false,
                borderColor: 'green',
                tension: .5,
                pointHoverRadius: 8
            },
            {
                label: 'Pending Prompts',
                data: [3, 3, 2],
                fill: true,
                borderColor: 'gray',
                tension: .5,
                pointHoverRadius: 8,
            },
            {
                label: 'Rejected Prompts',
                data: [2, 4, 1],
                fill: true,
                borderColor: 'red',
                tension: .5,
                pointHoverRadius: 8,
            },
        ]
    };

    return (
        // <div style={{ height: 'auto', maxHeight: '100%', width: '100vw' }}>
        <div style={{ width: '880px', height: 'auto' }}>
            <Line
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
        </div>
    )
}

export default LineChart