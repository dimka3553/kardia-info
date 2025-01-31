import React, { useState } from 'react'


export default function Calculator(props) {
    const [inp1, setInp1] = useState('')
    const [inp2, setInp2] = useState('')

    const changeInp1 = (e) => {
        if (e.target.value === '') {
            setInp1(e.target.value);
            setInp2(e.target.value);
        }
        else {
            setInp1(e.target.value);
            setInp2((e.target.value * props.price).toFixed(4));
        }
    }

    const changeInp2 = (e) => {
        if (e.target.value === '') {
            setInp1(e.target.value);
            setInp2(e.target.value);
        }
        else {
            setInp2(e.target.value);
            setInp1((e.target.value / props.price).toFixed(8));
        }
    }
    return (
        <div className="section calc nopad">
            <div className="fs-14 p-t-15 p-b-15 p-l-15 m-b-10 bor">
                Calculator:
            </div>
            <div className="p-l-15 p-r-15">
                <div className="calcinp ">
                    <label className="ab-l-m m-l-15">{props.symbol}:</label>
                    <input type="number" value={inp1} placeholder="0" onChange={changeInp1} className="tokeninp m-b-15"></input>
                </div>
                <br />
                <div className="calcinp m-b-15">
                    <label className="ab-l-m m-l-15">USD:</label>
                    <input type="number" value={inp2} placeholder="0" onChange={changeInp2} className="tokeninp m-b-15"></input>
                </div>
            </div>

        </div>
    )
}
