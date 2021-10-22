import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Sidelink(props) {
    return (
        <NavLink to={props.lnk} exact activeClassName="active" className="sidelinkwrapper">
            <div className = {props.cName + " sidelink m-b-16"}>
                {props.children}
                <span className="sidelink-text ab-l-m m-l-50 fs-18 noselect">{props.name}</span>
            </div>
        </NavLink>
    )
}
