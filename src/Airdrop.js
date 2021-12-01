// import {React, useEffect} from 'react'
import Altlogo from './components/subcomponents/svgs/Altlogo'
import Infosvg from './components/subcomponents/svgs/Infosvg'
import React, { Component } from 'react'
import Loader from "./components/Loader";
import getWeb3 from "./components/getWeb3";
import getWob3 from "./components/getWob3";
import tokenABI from "./ABI/token.json"
import claimABI from "./ABI/claim.json"


export default class Farm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tr: "",
            disabled: false,
        }
        this.airdropTx = this.airdropTx.bind(this);
    }

    async airdropTx(event) {
        if (this.state.accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
            alert('please install the KAI wallet to stake')
        }
        else {
            if(this.state.approved1 <=0){
                this.setState({ tr: "appr1" })
                await this.state.tkn1.methods.approve(this.state.airdropAddr, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "" })
                }.bind(this))
            }
            else {
                if(this.state.approved2 <=0){
                    this.setState({ tr: "appr2" })
                    await this.state.tkn2.methods.approve(this.state.airdropAddr, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                        if (error !== undefined && error !== null) {
                            console.log(error)
                            this.setState({ tr: "" })
                        }
                    }.bind(this)).then(function () {
                        this.setState({ tr: "" })
                    }.bind(this))
                }
                else{
                    this.setState({ tr: "cl" })
                    await this.state.airdrop.methods.swap().send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
                // Use web3 to get the user's accounts.
                var accounts
                try {
                    accounts = await web3.eth.getAccounts();
                }
                catch (err) {
                    accounts = ["0x2784fc8cB498Cc66689339BC01d56D7157D2a85f"]
                }
                var airdropAddr = "0xd4Ff268DaA19A83D06E21FC37Ee744F243B9f752"
                var tkn1Addr = "0x85AEed5960697A40fF97Fef575ad6987C1469251"
                var tkn2Addr = "0x10329b5Ed3F44a3242E5d796AD4Efd072cFf9D4a"

                var airdrop
                var tkn1
                var tkn2
                var airdropBtn
                var disabled = false
                var balance

                if (!this.state.ico) {
                    airdrop = new web3.eth.Contract(claimABI, airdropAddr);
                    tkn1 = new web3.eth.Contract(tokenABI, tkn1Addr);
                    tkn2 = new web3.eth.Contract(tokenABI, tkn2Addr);
                }
                else {
                    airdrop = this.state.airdrop
                    tkn1 = this.state.tkn1
                    tkn2 = this.state.tkn2
                }
                let [approved1, approved2, balance1, balance2, claimed] = await Promise.all([
                    tkn1.methods.allowance(accounts[0], airdropAddr).call(),
                    tkn2.methods.allowance(accounts[0], airdropAddr).call(),
                    tkn1.methods.balanceOf(accounts[0]).call(),
                    tkn2.methods.balanceOf(accounts[0]).call(),
                    airdrop.methods.hasClaimed(accounts[0]).call()
                ]);
                balance1 = parseFloat(wob3.utils.fromWei(balance1));
                balance2 = parseFloat(wob3.utils.fromWei(balance2));
                balance = balance1 + balance2
                
                if (approved2 <= 0) {
                    airdropBtn = "Approve 2/2"
                }
                if (approved1 <= 0) {
                    airdropBtn = "Approve 1/2"
                }
                if (balance1 + balance2 <= 0) {
                    airdropBtn = "No airdrop to claim"
                    disabled = true
                }
                if (claimed === true) {
                    airdropBtn = "Already Claimed 😉"
                    disabled = true
                }
                if (claimed === false && (approved2 !=0 && approved1 !=0)) {
                    airdropBtn = "Claim Airdrop"
                }
                console.log(approved1, approved2)
                if (this.state.tr === "") {
                    this.setState({
                        web3,
                        wob3,
                        airdrop,
                        tkn1,
                        tkn2,
                        approved1,
                        approved2,
                        airdropBtn,
                        disabled,
                        accounts,
                        balance,
                        tkn1Addr,
                        tkn2Addr,
                        airdropAddr
                    })
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            if (this.state.tr === "appr1") {
                this.setState({ airdropBtn: "Approving 1/2", disabled: true })
            }
            if (this.state.tr === "appr2") {
                this.setState({ airdropBtn: "Approving 2/2", disabled: true })
            }
            if (this.state.tr === "cl") {
                this.setState({ airdropBtn: "Claiming", disabled: true })
            }
        }

    }


    componentDidMount = async () => {
        document.title = `Airdrop - Kardia info`;
        this.refreshData()

        window.dispatchEvent(new Event('load'))
        this.interval = setInterval(() => this.refreshData(), 1000);
    };
    componentWillUnmount = async () => {
        clearInterval(this.interval)
    }



    render() {
        if (!this.state.web3) {
            return <Loader />;
        }
        return (
            <div>
                <div className="hpwrapper big">
                    <div className="bluebg">
                        <div className="topsec">
                            <div className="left">
                                <div className="textdiv ab-l-m m-l-70">
                                    <h1 className="fs-48 fw-600">Welcome to the <span className="t-bl fw-600">Kardia info </span>Airdrop</h1>
                                    <p className="hp-g fs-18 lh-1-8 ">You can swap ‘Airdrop INFO’ for INFO by clicking the button below</p>
                                    <br />
                                    <button disabled={this.state.disabled} onClick={this.airdropTx} className={"hpbtn-bl p-l-100 p-r-100 m-r-15 btn pos-r c-pointer m-b-15 trans-0-2 " + this.state.airdropBtn}><span className="m-l-50 m-r-50 t-w">{this.state.airdropBtn}</span><img alt="" className={"txwait ab-r-m m-r-10 " + this.state.airdropBtn} src="./img/spin.gif"></img></button>
                                </div>
                            </div>
                            <div className="rt">
                                <Infosvg />
                            </div>
                            <svg className="ab-b-r" width="864" height="510" viewBox="0 0 864 510" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 510C0 228.335 228.335 0 510 0H864V510H0V510Z" fill="#E4F2FF" />
                            </svg>
                        </div>
                        <div className="footer pos-r">
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
                    </div>
                </div>
                <div className="hpwrapper small">
                    <div className="smtopsec">
                        <div className="smwrapper airdrop">
                            <div className="top">
                                <Infosvg ccn="ffq" />
                            </div>
                            <div className="bottom p-l-20 p-r-20">
                                <div className="smtxtsec">
                                    <h1 className="fs-40 fw-600">Welcome to the <span className="t-bl fw-600">Kardia info </span>Airdrop</h1>
                                    <p className="hp-g fs-18 lh-1-8 ">You can swap ‘Airdrop INFO’ for INFO by clicking the button below</p>
                                    <br />
                                    <button disabled={this.state.disabled} onClick={this.airdropTx} className={"hpbtn-bl  p-r-50 p-l-50 btn pos-r c-pointer m-b-15 trans-0-2 " + this.state.airdropBtn}>{this.state.airdropBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.airdropBtn} src="./img/spin.gif"></img></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer pos-r">
                        <div>
                            <Altlogo />
                            <p className="hp-g fs-15">© 2021 KardiaInfo. All rights reserved.</p>
                        </div>
                        <div className="m-t-10 m-b-10 m-r-15">
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
                        <div className="m-t-10 m-b-10 m-r-15">
                            <a className="m-r-20 t-d-none fs-15 hp-g" href="https://docs.kardiainfo.com">Docs</a>
                            <a className="t-d-none fs-15 hp-g" href="https://t.me/dima3553">Contact</a>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}