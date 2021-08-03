import React from 'react'
import Hamburger from './subcomponents/Hamburger'
import Logo from './subcomponents/svgs/Logo'
import Logotext from './subcomponents/svgs/Logotext'

function navbar() {
    return (
        <div id="navbar">
            <Hamburger/>
            <Logo/>
            <Logotext/>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="buyinfo-link ab-r-m m-r-15 fs-16 t-bl w-f-c nowrap t-d-none trans-0-2">Buy INFO</a>
            
        </div>
    )
}

export default navbar
