import React from 'react'
import Hamburger from './subcomponents/Hamburger'
import Logo from './subcomponents/svgs/Logo'
import Logotext from './subcomponents/svgs/Logotext'
import {Link} from 'react-router-dom'

function navbar() {
    return (
        <div id="navbar">
            <Hamburger/>
            <Link to="/">
                <Logo/>
                <Logotext/>
            </Link>
            <a href="https://t.me/kardiainfo" className="buyinfo-link ab-r-m m-r-15 fs-16 t-bl w-f-c nowrap t-d-none trans-0-2">Join our Telegram</a>
            
        </div>
    )
}

export default navbar
