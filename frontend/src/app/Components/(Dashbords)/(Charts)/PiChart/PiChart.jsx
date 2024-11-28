'use client'
import React from 'react'
import { Pie, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJs, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJs.register(
    CategoryScale,
    LinearScale,
    // PointElement,
    // LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

const PiChart = ({ Type = Doughnut, labels, myData, bgColors }) => {

    const data = {
        labels: labels,
        datasets: [{
            label: 'Prompts are',
            data: myData,
            backgroundColor: bgColors,
            hoverOffset: 4,
            borderWidth: 2,
            // cutout: '70%'
        }]
    };

    return (
        <div style={{ height: '100px', width: '240px' }}>
            <Type
                data={data}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'left',
                            labels: {
                                color: 'black'

                            },
                        }
                    }
                }}

            />
        </div>
    )
}

export default PiChart

// https://react-chartjs-2-two.vercel.app/
// https://www.chartjs.org/