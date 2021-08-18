import React from 'react'
import Pairimg from './Pairimg'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Tokenpairs(props) {
    let img1, img2
    var pairs = []
    for (let i = 0; i < props.token.pairs.length; i++) {
        for (let b = 0; b < props.tokens.length; b++) {
            if (props.token.pairs[i].token1 === props.tokens[b].id) {
                img1 = props.tokens[b].logo
            }
            if (props.token.pairs[i].token2 === props.tokens[b].id) {
                img2 = props.tokens[b].logo
            }
        }
        var pairlink="https://kaidex.io/exchange/"+props.token.pairs[i].pairID
        pairs.push(
            <a key={i} className="t-d-none" rel="noreferrer" target="_blank" href={pairlink}>
                <div className="pairstats">
                    <div className="pair-name">
                        <Pairimg img1={img1} img2={img2} />
                        <span className="fs-14 p-l-12 p-r-25">{props.token.pairs[i].pairName}</span>
                    </div>
                    <span className="fs-14 m-t-10 m-b-10">TVL: ${numberWithCommas(parseFloat(props.token.pairs[i].pairTVL).toFixed(2))}</span>
                </div>
            </a>
        )
    }
    return (
        <div className={"section pairsec " + props.cn}>
            <div className="fs-14 p-t-15 p-b-15 p-l-15 bor">
                Pairs:
            </div>
            {pairs}
        </div>
    )
}
