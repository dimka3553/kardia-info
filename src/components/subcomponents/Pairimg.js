import React from 'react'

export default function Pairimg(props) {
    return (
        <div className="pairimg">
            <img className="sm-tk-img ab-t-l" alt="logo" src={props.img1}/>
            <img className="sm-tk-img ab-b-r" alt="logo" src={props.img2}/>
        </div>
    )
}
