import React from 'react'

export default function Changes(props) {
    var hc = (((props.tkn.price-props.data.dayHist[5])/props.data.dayHist[5])*100).toFixed(3)+"%"
    var dc = props.tkn.dayChange.toFixed(3)+"%"
    var wc = props.tkn.weekChange.toFixed(3)+"%"
    var mc = (((props.tkn.price-props.data.monthHist[props.data.monthHist.length-1])/props.data.monthHist[props.data.monthHist.length-1])*100).toFixed(3)+"%"
    return (
        <div className={"section changes nopad " + props.cn} >
            <div className="changesec fs-14">
                1H Change:
                <br />
                <br />
                {hc}
            </div>
            <div className="changesec fs-14">
                1D Change:
                <br />
                <br />
                {dc}
            </div>
            <div className="changesec fs-14">
                1W Change:
                <br />
                <br />
                {wc}
            </div>
            <div className="changesec fs-14">
                1M Change:
                <br />
                <br />
                {mc}
            </div>
            <div className="changesec fs-14">
                1Y Change:
                <br />
                <br />
                0.1%
            </div>
            <div className="changesec fs-14 nob">
                All Change:
                <br />
                <br />
                0.1%
            </div>
        </div>
    )
}
