import React from 'react'

import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

export default function Bigchart(props) {
    return (
        <Line
            data={{
                labels: range(props.now, props.time, props.histData.length - 1),
                datasets: [{
                    backgroundColor: props.col,
                    borderColor: props.col,
                    data: props.histData,
                    fill: props.col,
                    lineTension: 0,
                    pointRadius: 0,
                    borderWidth: 3,
                    pointHoverRadius: 5
                }],
            }}
            options={{
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            autoSkip: true,
                            maxRotation: 0,
                            minRotation: 0,
                        },
                        type: "time"
                    },
                    y:
                    {
                        grid: {
                            drawBorder: false,
                            precision: 1,
                            color: "#f0f0f0"
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return ("$" + value.toPrecision(3))
                            },
                            maxTicksLimit: 6,
                            padding: 10
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                hover: {
                    intersect: false,
                    mode:'index',
                }
            }}

        />
    )
}

function range(now, time, length) {
    var arr = [now * 1000]
    var timearr = []
    for (let i = 0; i < length; i++) {
        var n = arr[0] - (time * 1000)
        arr.unshift(round(n, (time * 1000)))
    }
    for (let i = 0; i < arr.length; i++) {

        timearr.push(new Date(arr[i]))
    }
    return (timearr)
}

function round(num, time) {
    return Math.ceil(num / time) * time;
}