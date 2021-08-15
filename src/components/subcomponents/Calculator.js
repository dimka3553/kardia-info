import React , { useState } from 'react'


export default function Calculator(props) {
    const [inp1, setInp1]=useState('')
    const [inp2, setInp2]=useState('')

    const changeInp1 = (e) => {
        if(e.target.value === ''){
            setInp1(e.target.value);
            setInp2(e.target.value);
        }
        else{
            setInp1(e.target.value);
            setInp2((e.target.value * props.price).toFixed(4));
        }
      }
    
      const changeInp2 = (e) => {
        if(e.target.value === ''){
            setInp1(e.target.value);
            setInp2(e.target.value);
        }
        else{
            setInp2(e.target.value);
            setInp1((e.target.value / props.price).toFixed(8));
        }  
      }
    return (
        <div className="section calc">
            <p className="fs-14">Calculator:</p>
            <label>{props.symbol}:</label><input type="number" value={inp1} placeholder="0" onChange={changeInp1} className="tokeninp m-b-15"></input>
            <br/>
            <label>USD:</label><input type="number" value={inp2} placeholder="0" onChange={changeInp2} className="tokeninp"></input>
        </div>
    )
}
