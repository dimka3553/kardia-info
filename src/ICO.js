import React, { Component } from 'react'
import Loader from "./components/Loader";
import getWeb3 from "./components/getWeb3";
import getWob3 from "./components/getWob3";
import Cards from './components/subcomponents/svgs/Cards';
import Playsvg from './components/subcomponents/svgs/Playsvg'
import Altlogo from './components/subcomponents/svgs/Altlogo';
import icoABI from "./ABI/ico.json";
import refundABI from "./ABI/refund.json";

export default class ICO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buyModal: "",
            kaiBal: 0,
            kaiBalUsd: 0,
            infoBought: 0,
            price: 0,
            priceusd: 0,
            kaiDep: 0,
            kaiDepUsd: 0,
            userDep: 0,
            userDepUsd: 0,
            tr: "",
            started: false,
            ended: false,
            timeLeft: 0,
            clock: "",
            kaiPrice: 0,
            kairef: 0,
            newBuy: "",
            buyBtn: "ICO not started",
            disabled: true,
            bigBuyBtn: "Buy INFO now",
            disabled2: false
        }
        this.toggleBuyModal = this.toggleBuyModal.bind(this);
        this.handleMaxBuy = this.handleMaxBuy.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.handleBuyTx = this.handleBuyTx.bind(this);
        this.handlePercBuy = this.handlePercBuy.bind(this);
    }
    async handleBuyTx() {
        if (this.state.accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
            alert("Please use the KardiaChain wallet")
        }
        else {
            if (this.state.newBuy > 0) {
                var val = this.state.web3.utils.toWei(this.state.newBuy.toString(), 'ether')
                this.setState({ tr: "bu" })
                await this.state.ico.methods.buy().send({ from: this.state.accounts[0], value: val, gas: '20000000', gasPrice: '1000000000' }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "" })
                }.bind(this))
            }
            else {
                alert("Please enter an amount")
            }
        }
    }

    handleBuy(event) {
        if (event.target.value < this.state.kaiBal && event.target.value >= 0) {
            this.setState({ newBuy: event.target.value })
        }
        else if (event.target.value < this.state.kaiBal && event.target.value < 0) {
            this.setState({ newBuy: 0 })
        }
        else if (event.target.value > this.state.kaiBal) {
            this.handleMaxBuy(event)
        }
        else {
            this.setState({ newBuy: "" })
        }
    }
    handleMaxBuy(event) {
        var newBuy = this.state.kaiBal - 0.1;
        this.setState({ newBuy: newBuy })
    }
    async toggleBuyModal(event) {
        if (this.state.ended === false) {
            if (this.state.buyModal === "") {
                this.setState({ buyModal: "expanded", newbuy: "" })
            }
            else {
                this.setState({ buyModal: "", newBuy: "" })
            }
        }
        else {
            this.setState({ tr: "cl" })
            if (this.state.hasRefunded === true) {
                await this.state.ico.methods.claim().send({ from: this.state.accounts[0] }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "" })
                }.bind(this))
            }
            else {
                await this.state.refund.methods.refund().send({ from: this.state.accounts[0] }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "" })
                }.bind(this))
            }
        }
    }
    handlePercBuy(num) {
        var newBuy;
        if (num === 25) {
            newBuy = (this.state.kaiBal) * 0.25;
            this.setState({ newBuy: newBuy })
        }
        else if (num === 50) {
            newBuy = (this.state.kaiBal) * 0.5;
            this.setState({ newBuy: newBuy })
        }
        else if (num === 75) {
            newBuy = (this.state.kaiBal) * 0.75;
            this.setState({ newBuy: newBuy })
        }
        else if (num === 100) {
            newBuy = (this.state.kaiBal) - 0.1;
            this.setState({ newBuy: newBuy })
        }
    }
    async refreshData() {
        if (!this.state.web3) {
            window.dispatchEvent(new Event('load'))
        }

        if (this.state.tr === "") {
            try {
                var web3
                var wob3
                if (!this.state.web3) {
                    web3 = await getWeb3();
                    wob3 = await getWob3();
                }
                else {
                    web3 = this.state.web3
                    wob3 = this.state.wob3
                }
                var kaiPrice;
                if (this.state.kaiPrice === 0) {
                    var res = await fetch('https://api.kardiainfo.com/tokens/kai');
                    kaiPrice = await res.json();
                    kaiPrice = kaiPrice.price;
                }
                else {
                    kaiPrice = this.state.kaiPrice;
                }
                console.log(kaiPrice)
                // Use web3 to get the user's accounts.
                var accounts
                try {
                    accounts = await web3.eth.getAccounts();
                }
                catch (err) {
                    accounts = ["0x2784fc8cB498Cc66689339BC01d56D7157D2a85f"]
                }
                var icoAddr = "0x6c622c239bCc260c90157E63E0EA12bD4511477A"
                var refundAddr = "0xAe8445a082Ea51971D65cFf8a46B3A6761F07070"
                var ico
                var icows
                var refund
                if (!this.state.ico) {
                    ico = new web3.eth.Contract(icoABI, icoAddr);
                    icows = new wob3.eth.Contract(icoABI, icoAddr);
                    refund = new web3.eth.Contract(refundABI, refundAddr);
                }
                else {
                    ico = this.state.ico
                    icows = this.state.icows
                    refund = this.state.refund
                }
                var data

                let [kaiDep, userDep, ended, started, infoBought, startedon, kaiBal, hasBought, hasClaimed, hasRefunded] = await Promise.all([
                    icows.methods.kaiDeposited().call(),
                    icows.methods.depositedAmount(accounts[0]).call(),
                    icows.methods.ended().call(), icows.methods.started().call(),
                    icows.methods.infoToBuy(accounts[0]).call(),
                    icows.methods.icoBegun().call(),
                    wob3.eth.getBalance(accounts[0]),
                    icows.methods.hasBought(accounts[0]).call(),
                    icows.methods.hasClaimed(accounts[0]).call(),
                    refund.methods.hasRefunded(accounts[0]).call()
                ]);
                data = {
                    kaiDep: parseFloat(wob3.utils.fromWei(kaiDep)),
                    userDep: parseFloat(wob3.utils.fromWei(userDep)),
                    ended: ended,
                    started: started,
                    infoBought: parseFloat(wob3.utils.fromWei(infoBought)),
                    startedon: startedon,
                    kaiBal: parseFloat(wob3.utils.fromWei(kaiBal)),
                    hasBought: hasBought,
                    hasClaimed: hasClaimed,
                    hasRefunded: hasRefunded
                }
                data.kairef = (data.infoBought / 500000) * 3000000;
                if (data.started === false && data.ended === false) {
                    data.clock = "Not started yet"
                    data.buyBtn = "ICO not started yet"
                    data.disabled = true
                    data.disabled2 = false
                    data.bigBuyBtn = "Buy INFO now"
                }
                else if (data.started === true && data.ended === false) {
                    var now = parseInt(Math.floor(new Date().getTime()))
                    var timeleft = (604800 - (parseInt(Math.floor(now / 1000)) - data.startedon)) * 1000;

                    if (timeleft <= 0) {
                        data.clock = cM(0)
                    }
                    else if (timeleft > 0) {
                        data.clock = cM(timeleft)
                    }
                    data.buyBtn = "Buy INFO"
                    data.bigBuyBtn = "Buy INFO now"
                    data.disabled = true
                    data.disabled2 = true
                }
                else {
                    data.clock = "ICO is over"
                    data.buyBtn = "ICO is over"
                    data.disabled = true
                    if (hasBought === true && hasClaimed === false) {
                        data.disabled2 = false
                        if (hasRefunded === false) {
                            data.bigBuyBtn = "Claim " + parseFloat(data.kairef).toFixed(2) + " KAI"
                        }
                        else {
                            data.disabled2 = true
                            data.bigBuyBtn = "Claim " + parseFloat(data.infoBought).toFixed(2) + " INFO"
                        }
                    }
                    else if (hasBought === true && hasClaimed === true) {
                        data.bigBuyBtn = "Already claimed 😉"
                        data.disabled2 = true
                    }
                    else if (hasBought === false) {
                        data.bigBuyBtn = "No INFO to claim 😢"
                        data.disabled2 = true
                    }
                    if(hasBought === true && hasClaimed === true && hasRefunded === false){
                        data.disabled2 = false
                        data.bigBuyBtn = "Claim " + parseFloat(data.kairef).toFixed(2) + " KAI"
                    }
                }
                data.price = (data.kaiDep - 3000000) / 500000;
                data.priceusd = data.price * kaiPrice;
                data.kaiBalUsd = data.kaiBal * kaiPrice;
                data.userDepUsd = data.userDep * kaiPrice;
                data.kaiDepUsd = data.kaiDep * kaiPrice;
                this.setState({
                    clock: data.clock,
                    kaiBal: data.kaiBal,
                    kaiBalUsd: data.kaiBalUsd,
                    price: data.price,
                    priceusd: data.priceusd,
                    kaiDep: data.kaiDep,
                    kaiDepUsd: data.kaiDepUsd,
                    userDepUsd: data.userDepUsd,
                    userDep: data.userDep,
                    infoBought: data.infoBought,
                    kairef: data.kairef,
                    buyBtn: data.buyBtn,
                    disabled: data.disabled,
                    disabled2: data.disabled2,
                    bigBuyBtn: data.bigBuyBtn,
                    ended: data.ended,
                    started: data.started,
                    hasRefunded: data.hasRefunded,
                    ico,
                    web3,
                    wob3,
                    icows,
                    refund,
                    accounts,
                    kaiPrice
                })
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            if (this.state.tr === "cl") {
                this.setState({ bigBuyBtn: "Claiming", disabled2: true })
            }
            if (this.state.tr === "bu") {
                this.setState({ buyBtn: "Buying", disabled: true })
            }
        }

    }

    componentDidMount = async () => {
        document.title = `ICO - Kardia info`;
        this.refreshData()

        window.dispatchEvent(new Event('load'))
        this.interval = setInterval(() => this.refreshData(), 1000);
    };
    componentWillUnmount = async () => {
        clearInterval(this.interval)
    }


    render() {
        if (!this.state.accounts) {
            return <Loader />;
        }
        return (
            <div className="ico">
                <div className="icoWarapper">

                    <div className="top">
                        <p className="alerttt p-l-20 p-r-20 p-t-20 p-b-20 m-l-20 m-r-20 m-t-20 m-b-40">Dear ICO investors, <br/><br/>We have decided to make a last minute change to how the ICO works. The ICO will now follow an overflow system where you will be refunded any KAI that is over a $100,000 hard cap. The reason we did this is due to the fact that we raised way more KAI than expected which made listing very risky due to a significant amount of selling pressure. <br/><br/>All the overflow KAI can be claimed after the ICO. This allows INFO to be listed with more liquidity and at more 2x the ICO price.<br /> <br />Speaking of listing, it will be slightly postponed as the KAI team are in the reviewing process, INFO claiming will be enabled after listing. <br/><br/>Kind regards, <br /><br />Development team.</p>
                        <p className="p-t-0 m-t-0 p-l-40 m-b-24 fs-24 t-ab icot">ICO Stats</p>
                        <div className="ico-info p-t-10 p-b-10">
                            <div className="ico-info-box  m-l-40 tp">
                                <p className="fs-16 t-g fw-700 ">On Sale</p>
                                <p className="fs-32 t-ab p-t-10 bb">500,000 <span className="t-s"> INFO</span></p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.666504" width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M34.6666 20.5C34.6666 23.76 32.2666 26.45 29.1466 26.92V26.86C28.8366 22.98 25.6866 19.83 21.7766 19.52H21.7466C22.2166 16.4 24.9066 14 28.1666 14C31.7566 14 34.6666 16.91 34.6666 20.5Z" fill="#9699A5" />
                                    <path d="M27.6465 26.98C27.3965 23.81 24.8565 21.27 21.6865 21.02C21.5165 21.01 21.3365 21 21.1665 21C17.5765 21 14.6665 23.91 14.6665 27.5C14.6665 31.09 17.5765 34 21.1665 34C24.7565 34 27.6665 31.09 27.6665 27.5C27.6665 27.33 27.6565 27.15 27.6465 26.98ZM22.0465 28.38L21.1665 30L20.2865 28.38L18.6665 27.5L20.2865 26.62L21.1665 25L22.0465 26.62L23.6665 27.5L22.0465 28.38Z" fill="#9699A5" />
                                </svg>
                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">Price / INFO</p>
                                <p className="fs-32 t-ab p-t-10 bb">{this.state.price.toFixed(4)} <span className="t-s"> KAI</span></p>
                                <p className="fs-14 t-lbl p-t-10">${this.state.priceusd.toFixed(3)} → Listing: ~$0.55</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.333008" width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M21.0049 26.3298C21.0049 27.6198 21.9949 28.6598 23.2249 28.6598H25.7349C26.8049 28.6598 27.6749 27.7498 27.6749 26.6298C27.6749 25.4098 27.1449 24.9798 26.3549 24.6998L22.3249 23.2998C21.5349 23.0198 21.0049 22.5898 21.0049 21.3698C21.0049 20.2498 21.8749 19.3398 22.9449 19.3398H25.4549C26.6849 19.3398 27.6749 20.3798 27.6749 21.6698" stroke="#9699A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24.333 18V30" stroke="#9699A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">Deposited</p>
                                <p className="fs-32 t-ab p-t-10 bb">{nC(parseFloat(this.state.kaiDep).toFixed(0))} <span className="t-s"> KAI</span></p>
                                <p className="fs-14 p-t-10 t-lbl">${nC(parseFloat(this.state.kaiDepUsd).toFixed(2))}</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M30.0702 26.4301L24.0002 32.5001L17.9302 26.4301" stroke="#9699A5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24 15.5V32.33" stroke="#9699A5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="middle p-t-155 p-l-40 p-r-40">
                        <div className="myicostats">
                            <div className="left pos-r">
                                <Cards cn="ab-c-b" />
                                <button onClick={this.toggleBuyModal} disabled={this.state.disabled2} className={"icobuybtn tp ab-c-b m-b-37 btn " + this.state.bigBuyBtn}>{this.state.bigBuyBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.bigBuyBtn} src="./img/spin.gif"></img></button>
                                <div className="ab-c-b m-b-95 icowal">
                                    <p className="t-s fs-16 m-b-10">Balance</p>
                                    <p className="t-w fs-20 m-t-0 m-b-10">{nC(parseFloat(this.state.kaiBal).toFixed(2))} <span className="t-s">KAI</span></p>
                                    <p className="t-s fs-14 m-t-0 m-b-0">${nC(parseFloat(this.state.kaiBalUsd).toFixed(2))}</p>
                                </div>
                            </div>
                            <div className="right w-full p-t-30 p-b-30 p-l-30 p-r-30">
                                <div className="ico-mystats">
                                    <div className="ico-top-stats p-b-0">
                                        <span className="fs-24 t-ag m-r-15 m-b-15 stti">My Stats</span>
                                        <div className="clock m-b-15">
                                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#E99E35" strokeOpacity="0.52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51001" stroke="#E99E35" strokeOpacity="0.52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="m-l-12 fs-16 t-org">{this.state.clock}</span>
                                        </div>
                                    </div>

                                    <div className="ico-mynums">
                                        <div className="l m-t-15">
                                            <p className="fs-16 t-g m-t-0 m-b-10">Kai Deposited</p>
                                            <p className="fs-24 t-ab m-t-0 m-b-10">{nC(parseFloat(this.state.userDep).toFixed(2))} <span className="t-s fs-24">KAI</span></p>
                                            <p className="t-lbl fs-14 m-t-0 m-b-0">${nC(parseFloat(this.state.userDepUsd).toFixed(2))}</p>
                                        </div>
                                        <div className="r m-t-15">
                                            <p className="fs-16 t-g m-t-0 m-b-10">Receive</p>
                                            <p className="fs-24 t-ab m-t-0 m-b-10">{nC(parseFloat(this.state.infoBought).toFixed(2))} <span className="t-s fs-24">INFO</span></p>
                                            <p className="t-lbl fs-14 m-t-0 m-b-0">+ {nC(parseFloat(this.state.kairef).toFixed(2))} KAI (overflow)</p>
                                        </div>
                                    </div>
                                </div>
                                <button className={"icobuybtn bt ab-c-b m-t-25 btn " + this.state.bigBuyBtn} disabled={this.state.disabled2} onClick={this.toggleBuyModal}>{this.state.bigBuyBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.bigBuyBtn} src="./img/spin.gif"></img></button>
                            </div>

                        </div>
                    </div>
                    <div className="p-l-40 p-r-40 p-t-30 btmwrp">
                        <div className="btm m-b-100">
                            <div className="l">
                                <p className="t-ab fs-24 m-t-0 m-b-22 f-ws">Kardia info ICO</p>
                                <p className="t-lg fs-16 m-b-28 f-ws lh-1-8">The Info Token (INFO) is a revolutionary, deflationary, information backed token - The Chainlink for KardiaChain. It is now available for sale through the First ICO ever on KardiaChain.</p>
                                <a rel="noopener noreferrer" target="_blank" href="https://docs.kardiainfo.com/about-kardia-info/info-token-info">
                                    <button className="wtbtnico bg-white m-r-25 f-ws c-pointer">
                                        Token Metrics
                                    </button>
                                </a>
                                <a rel="noopener noreferrer" target="_blank" href="https://docs.kardiainfo.com/about-kardia-info/info-token-info/ico-information" className="fs-18 t-lg f-ws iclolnk t-d-none">
                                    ICO Information
                                </a>

                            </div>
                            <div className="r">
                                <Playsvg />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer dk pos-r">
                    <div>
                        <Altlogo />
                        <p className="hp-g fs-15">© 2021 KardiaInfo. All rights reserved.</p>
                    </div>
                    <div>
                        <a href="https://github.com" className="m-r-20">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.7919 1.71292C4.72094 1.78392 4.58544 2.22667 4.51009 2.6339C4.40936 3.17833 4.47584 4.08733 4.64596 4.49122C4.66113 4.52732 4.61813 4.60787 4.51819 4.73058C3.97118 5.40206 3.66386 6.15492 3.57538 7.0401C3.50918 7.70203 3.6247 8.8779 3.81789 9.5087C4.1377 10.5529 4.73288 11.3662 5.56673 11.8983C5.961 12.15 6.62568 12.4204 7.19988 12.5628C7.48886 12.6345 8.31612 12.7883 8.41259 12.7883C8.42936 12.7883 8.37912 12.8687 8.30088 12.9669C8.11075 13.2057 7.91749 13.6271 7.84156 13.9688L7.77958 14.2477L7.4727 14.349C6.87436 14.5467 6.38296 14.5625 5.89392 14.4C5.38589 14.2311 5.06901 13.9651 4.67981 13.3807C4.35558 12.8938 4.04353 12.5967 3.66403 12.4136C3.21781 12.1984 2.72261 12.1648 2.54935 12.338C2.4872 12.4001 2.48598 12.4128 2.53319 12.5033C2.59708 12.6256 2.71468 12.7339 3.00448 12.9374C3.43927 13.2426 3.79357 13.7086 4.05918 14.3247C4.24084 14.746 4.37599 14.9464 4.64463 15.1926C4.90688 15.4329 5.28578 15.6423 5.65297 15.75C6.00628 15.8535 6.92249 15.8814 7.37847 15.8024C7.55156 15.7724 7.70848 15.7479 7.72716 15.7479C7.74862 15.7479 7.76118 15.9852 7.76118 16.3912C7.76118 16.9271 7.77196 17.0691 7.82564 17.2416C7.99155 17.7747 8.43657 18.1813 8.97899 18.2954C9.09347 18.3194 9.63425 18.3333 10.4601 18.3333C11.5035 18.3333 11.7996 18.3233 11.9559 18.2825C12.5385 18.1308 12.9791 17.6807 13.0981 17.1155C13.1594 16.8245 13.1487 14.5025 13.0843 14.1337C12.996 13.6269 12.8003 13.1956 12.5275 12.9064C12.3974 12.7685 12.3754 12.7803 12.8993 12.707C15.3258 12.3673 16.7271 11.1794 17.1784 9.07977C17.3312 8.36862 17.3735 7.2401 17.2693 6.65026C17.1445 5.94278 16.7821 5.1739 16.3461 4.69128L16.23 4.5628L16.3215 4.2617C16.4058 3.98425 16.4131 3.91251 16.4149 3.34828C16.4169 2.71054 16.3947 2.54878 16.2316 2.01181C16.1262 1.66492 16.1071 1.65087 15.774 1.6754C15.1269 1.72303 14.218 2.09314 13.3782 2.65094L13.1655 2.79218L12.7 2.68938C11.978 2.52987 11.5151 2.47578 10.7038 2.45612C9.70539 2.4319 9.06962 2.49388 8.12983 2.70711L7.73308 2.79712L7.44127 2.60495C7.28077 2.49925 7.14303 2.41278 7.13514 2.41278C7.12725 2.41278 7.01468 2.35162 6.88501 2.27681C6.33333 1.95877 5.59337 1.70785 5.10609 1.67363C4.89426 1.65877 4.83922 1.66564 4.7919 1.71292Z" fill="#1C1C28" fillOpacity="0.54" />
                            </svg>
                        </a>
                        <a href="https://t.me/kardiainfo">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.788 17.3339C15.0295 17.5049 15.3407 17.5476 15.6182 17.4427C15.8957 17.3369 16.0997 17.0999 16.1612 16.8127C16.8129 13.7497 18.3939 5.99716 18.9871 3.21097C19.0321 3.00098 18.9571 2.78273 18.7921 2.64249C18.6271 2.50224 18.3984 2.46174 18.1944 2.53749C15.0497 3.70146 5.3652 7.33513 1.40679 8.79985C1.15554 8.89284 0.992049 9.13434 1.0003 9.39908C1.0093 9.66458 1.18779 9.89482 1.44504 9.97207C3.22025 10.5031 5.55044 11.2418 5.55044 11.2418C5.55044 11.2418 6.63942 14.5305 7.20716 16.2029C7.27841 16.4129 7.44265 16.5779 7.6594 16.6349C7.87539 16.6912 8.10639 16.6319 8.26763 16.4797C9.17961 15.6187 10.5896 14.2875 10.5896 14.2875C10.5896 14.2875 13.2685 16.2517 14.788 17.3339ZM6.53067 10.8263L7.78989 14.9797L8.06964 12.3495C8.06964 12.3495 12.9348 7.96137 15.7082 5.46017C15.7892 5.38667 15.8005 5.26368 15.733 5.17743C15.6662 5.09118 15.5432 5.07093 15.451 5.12943C12.2365 7.18213 6.53067 10.8263 6.53067 10.8263Z" fill="#1C1C28" fillOpacity="0.54" />
                            </svg>
                        </a>
                    </div>
                    <div>
                        <a className="m-r-20 t-d-none fs-15 hp-g" href="https://docs.kardiainfo.com">Docs</a>
                        <a className="t-d-none fs-15 hp-g" href="https://t.me/dima3553">Contact</a>
                    </div>
                </div>
                <div className={"modal stake " + this.state.buyModal}>
                    <div className="topbar m-b-15">
                        <div onClick={this.toggleBuyModal} className="icon-btn ab-l-m m-l-10 ripple hamb-menu cross noselect">
                            <svg className="hamburger-svg opened noselect" width="30" height="30" viewBox="0 0 100 100">
                                <path className="hamburger-line hamburger-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                <path className="hamburger-line hamburger-line2" d="M 20,50 H 80" />
                                <path className="hamburger-line hamburger-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                            </svg>
                        </div>
                        <div className="title ab-l-m fs-22 t-g m-l-60 f-rob noselect">
                            Buy INFO
                        </div>
                    </div>
                    <div className="cont p-l-15 p-r-15">
                        <p className="txt-r fs-14 t-bl c-pointer" onClick={this.handleMaxBuy}>Balance: {nC(parseFloat(this.state.kaiBal).toFixed(2))} KAI</p>
                        <div className="infoInp stakeInp m-b-15">
                            <svg className="ab-l-m m-l-5" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.2381 14.4L2.85714 0.378947L0 3.78947L2.85714 9.85263L7.2381 14.4Z" fill="#333333" />
                                <path d="M6.09524 4.92632L4.57143 0L8.19048 1.51579L7.04762 5.30526L6.09524 4.92632Z" fill="#333333" />
                                <path d="M8.7619 5.87368L10.0952 1.51579L14.0952 0.568421L16 4.73684L13.7143 7.76842L8.7619 5.87368Z" fill="#333333" />
                                <path d="M12.7619 9.28421L6.85714 7.01053L9.14286 14.2105L12.7619 9.28421Z" fill="#333333" />
                            </svg>
                            <input type="number" placeholder="Buy amount" value={this.state.newBuy} className="gametxtinp stakeInp fs-16 p-l-26" onChange={this.handleBuy}></input>
                        </div>
                        <div className="percBtns m-b-30">
                            <button onClick={() => this.handlePercBuy(25)} className="percBtn t-bl fs-14 c-pointer">25%</button>
                            <button onClick={() => this.handlePercBuy(50)} className="percBtn t-bl fs-14 c-pointer">50%</button>
                            <button onClick={() => this.handlePercBuy(75)} className="percBtn t-bl fs-14 c-pointer">75%</button>
                            <button onClick={() => this.handlePercBuy(100)} className="percBtn t-bl fs-14 c-pointer">100%</button>
                        </div>
                        <p className="m-b-20 fs-15">INFO Price: <span className="fw-600 t-bl">{parseFloat((this.state.kaiDep + parseFloat(this.state.newBuy)-3000000) / 500000).toFixed(4)} KAI </span><span className="t-g fs-12">(${nC(parseFloat((this.state.kaiDep + this.state.newBuy - 3000000) / 500000 * this.state.kaiPrice).toFixed(3))})</span></p>
                        <p className="m-b-20 fs-15">INFO to buy: <span className="fw-600 t-gr">~{((parseFloat(this.state.newBuy) / (parseFloat(this.state.kaiDep) + parseFloat(this.state.newBuy))) * 500000).toFixed(2)} INFO</span></p>
                        <button onClick={this.handleBuyTx} disabled={this.state.disabled} className={"stakebtn ico btn big bl m-l-auto m-r-auto m-t-30 " + this.state.buyBtn}>{this.state.buyBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.buyBtn} src="./img/spin.gif"></img></button>
                    </div>
                </div>
                <div onClick={this.toggleBuyModal} className={"modal-overlay " + this.state.buyModal}></div>
            </div>
        )
    }
}
function nC(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function cM(miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));

    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    switch (format) {
        case 's':
            return total_seconds;
        case 'm':
            return total_minutes;
        case 'h':
            return total_hours;
        case 'd':
            return days;
        default:
            return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
    }
};