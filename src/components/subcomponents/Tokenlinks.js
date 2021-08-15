import React from 'react'
import Explorer from './svgs/Explorer';
import Globe from './svgs/Globe';
import Telegram from './svgs/Telegram'

export default function Tokenlinks(props) {
    var tklnks = []

    tklnks.push(
        <a key="1" rel="noreferrer" target="_blank" href={`https://explorer.kardiachain.io/token/${props.id}`}>
            <div className=" sidelink bl ">
                <Explorer />
                <span className="sidelink-text ab-l-m m-l-50 t-bl fs-16 noselect">View in Explorer</span>
            </div>
        </a>
    )
    if (props.website !== "" && props.website !== undefined) {
        tklnks.push(
            <a key="2" rel="noreferrer" target="_blank" href={props.website}>
                <div className=" sidelink bl m-t-9">
                    <Globe />
                    <span className="sidelink-text ab-l-m m-l-50 t-bl fs-16 noselect">Visit Website</span>
                </div>
            </a>
        )
    }
    if (props.chat !== "" && props.chat !== undefined) {
        console.log(props.chat)
        tklnks.push(
            <a key="3" rel="noreferrer" target="_blank" href={props.chat}>
                <div className=" sidelink bl m-t-9">
                    <Telegram/>
                    <span className="sidelink-text ab-l-m m-l-50 t-bl fs-16 noselect">Telegram chat</span>
                </div>
            </a>
        )
    }
    return (
        <div className="section">
            {tklnks}
        </div>
    )
}
