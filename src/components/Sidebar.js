import React, { Component } from 'react'
import Hamburger from './subcomponents/Hamburger'
import Sidelink from './subcomponents/Sidelink'
import Homesvg from './subcomponents/svgs/Homesvg'
import Lpssvg from './subcomponents/svgs/Lpssvg'
import Tokensvg from './subcomponents/svgs/Tokensvg'
import Walletsvg from './subcomponents/svgs/Walletsvg'

export default class Sidebar extends Component {
    render() {
        return (
            <div id="sidebarWrapper noselect">
                <div id="sidebar">
                    <div className="sidelinks m-t-6">
                        <Sidelink name="Overview" cName="overview" lnk="/">
                            <Homesvg/>
                        </Sidelink>
                        <Sidelink name="Tokens" cName="tokens" lnk="/tokens">
                            <Tokensvg/>
                        </Sidelink>
                        <Sidelink name="LPs" cName="lps" lnk="/lps">
                            <Lpssvg/>
                        </Sidelink>
                        <Sidelink name="Wallet" cName="wallet" lnk="/wallet">
                            <Walletsvg/>
                        </Sidelink>
                    </div>
                </div>
                <div id="smallsidebar">
                    <div className="sidebar-nav trans-0-2 pos-r">
                        <Hamburger/>
                        <span className="smallsidebar-menu t-g ab-l-m m-l-51 fs-20 noselect">Menu</span>
                    </div>
                    <div className="sidelinks m-t-15 p-l-15 p-r-15">
                        <Sidelink name="Overview" cName="overview" lnk="/">
                            <Homesvg/>
                        </Sidelink>
                        <Sidelink name="Tokens" cName="tokens" lnk="/tokens">
                            <Tokensvg/>
                        </Sidelink>
                        <Sidelink name="LPs" cName="lps" lnk="/lps">
                            <Lpssvg/>
                        </Sidelink>
                        <Sidelink name="Wallet" cName="wallet" lnk="/wallet">
                            <Walletsvg/>
                        </Sidelink>
                    </div>
                </div>
                <div className="sidebar-overlay hamb-menu"></div>
            </div>
        )
    }
}
