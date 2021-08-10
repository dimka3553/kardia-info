import React from 'react'

import { Line } from 'react-chartjs-2';

export default function Smallchart(props) {

    return (
        <Line
            data={{
                labels: range(0, props.histData.length - 1),
                datasets: [{
                    backgroundColor: props.col,
                    borderColor: props.col,
                    data: props.histData,
                    fill: false,
                    lineTension: 0,
                    pointRadius: 0,
                    borderWidth:2.5
                }
                ],
            }}
            options={{
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks:{
                            display:false
                        }
                    },
                    y:
                    {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks:{
                            display:false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}

        />
    )
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
