import React, { useEffect, useState } from 'react';
import { RadialLinearScale, Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie,Bubble,Doughnut} from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function MyChart({ toys }) {
    console.log(toys)
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Percentage of Toys in Stock by Label',
            data: [],
            backgroundColor: [
                'rgba(100, 99, 132, 0.1)',
                'rgba(100, 162, 235, 0.1)',
                'rgba(100, 20, 86, 0.1)',
                'rgba(100, 192, 192, 0.1)',
                'rgba(100, 102, 255, 0.1)',
                'rgba(100, 159, 64, 0.1)',
            ],
            borderColor: [
                'rgba(100, 100, 100, 1)',
                'rgba(100, 100, 100, 1)',
                'rgba(100, 100, 100, 1)',
                'rgba(100, 100, 100, 1)',
                'rgba(100, 100, 100, 1)',
                'rgba(100, 100, 100, 1)',
            ],
            borderWidth: 1,
        }],
    })

    useEffect(() => {
        const labelCounts = toys.reduce((acc, toy) => {
            // if (toy.inStock) {
                toy.labels.forEach(label => {
                    acc[label] = (acc[label] || 0) + 1
                    // console.log(label)
                })
            // }
            return acc
        }, {})

        const totalInStock = Object.values(labelCounts).reduce((sum, count) => sum + count, 0)
        const percentages = Object.values(labelCounts).map(count => (count / totalInStock) * 100)
            console.log(labelCounts)
        setChartData({
            labels: Object.keys(labelCounts),
            datasets: [{
                ...chartData.datasets[0],
                data: percentages,
            }],
        })
    }, [toys])

    return <Doughnut data={chartData} />
}
