import React from 'react'

export default function Changes(props) {
    var hc = (((props.tkn.price - props.data.dayHist[5]) / props.data.dayHist[5]) * 100).toFixed(3)
    var dc = props.tkn.dayChange.toFixed(3)
    var wc = props.tkn.weekChange.toFixed(3)
    var mc = (((props.tkn.price - props.data.monthHist[179]) / props.data.monthHist[179]) * 100).toFixed(3)
    var yc = (((props.tkn.price - props.data.yearHist[364]) / props.data.monthHist[364]) * 100).toFixed(3)
    var ac = (((props.tkn.price - props.data.firstPrice) / props.data.firstPrice) * 100).toFixed(3)

    var pcs = [hc, dc, wc, mc, yc, ac]
    var cols = [];
    var cls = []
    var d2 = new Date();
    var d1 = new Date(props.data.firstTimestamp * 1000);
    console.log(d1)
    console.log(d2)

    var diff = d2.getTime() - d1.getTime();

    var days = (diff / (1000 * 60 * 60 * 24)).toFixed(0);

    for (let i = 0; i < pcs.length; i++) {
        if (pcs[i] < 0) {
            cols.push('t-red')
            cls.push("")
        }
        else if (pcs[i] > 0) {
            cols.push('t-green')
            cls.push("")
        }
        else if (pcs[i] === 0) {
            cols.push('t-grey')
            cls[i] = ""
        }
        else {
            cols.push("")
            cls.push("d-none")
        }
    }
    return (
        <div className={"section changes nopad " + props.cn} >
            <div className={`changesec fs-14 ${cls[0]}`}>
                <span>1H Change:</span>
                <br />
                <br />
                <span className={cols[0]}>{hc}%</span>
            </div>
            <div className={`changesec fs-14 ${cls[1]}`}>
                <span>1D Change:</span>
                <br />
                <br />
                <span className={cols[1]}>{dc}%</span>
            </div>
            <div className={`changesec fs-14 ${cls[2]}`}>
                <span>1W Change:</span>
                <br />
                <br />
                <span className={cols[2]}>{wc}%</span>
            </div>
            <div className={`changesec fs-14 ${cls[3]}`}>
                <span>1M Change:</span>
                <br />
                <br />
                <span className={cols[3]}>{mc}%</span>
            </div>
            <div className={`changesec fs-14 ${cls[4]}`}>
                <span>1Y Change:</span>
                <br />
                <br />
                <span className={cols[4]}>{yc}%</span>
            </div>
            <div className={`changesec fs-14 nob  ${cls[5]}`}>
                <span>All Change ({days} Days):</span>
                <br />
                <br />
                <span className={cols[5]}>{ac}%</span>
            </div>
        </div>
    )
}
