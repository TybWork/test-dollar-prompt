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

const LineChart = () => {

    const data = {
        labels: ["A", 'B', 'C', 'D', 'E', 'F', 'G'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: .5,
                pointHoverRadius: 8
            },
            {
                label: 'My second Dataset',
                data: [23, 100, 20, 8, 56, 25, 10],
                fill: true,
                borderColor: 'yellow',
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