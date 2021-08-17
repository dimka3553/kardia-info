import React from 'react'

import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

export default function Smallchart(props) {

    return (
        <Line
            data={{
                labels: range(props.now, props.time, props.histData.length - 1),
                datasets: [{
                    backgroundColor: props.col,
                    borderColor: props.col,
                    data: dps(props.histData),
                    fill: false,
                    lineTension: 0,
                    pointRadius: 0,
                    borderWidth: 3
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
                        ticks: {
                            maxTicksLimit: 8,
                            maxRotation: 0,
                            minRotation: 0,
                            format: { style: 'currency', currency: 'USD' }
                        },
                        type: "time"
                    },
                    y:
                    {
                        grid: {
                            drawBorder: false,
                            precision: 1
                        },
                        ticks: {

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

function range(now, time, length) {
    var arr = [now * 1000]
    var timearr = []
    for (let i = 0; i < length; i++) {
        arr.unshift(arr[0] - (time * 1000))
    }
    for (let i = 0; i < arr.length; i++) {
        timearr.push(new Date(arr[i]))
    }
    return (timearr)
}

function dps(arr) {
    var ret = [];
    for (let i = 0; i < arr.length; i++) {
        ret.push(arr[i].toPrecision(4))
    }
    return (ret)
}