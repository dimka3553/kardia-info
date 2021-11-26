import React, { Component } from 'react'
import Loader from "./components/Loader";
import getWeb3 from "./components/getWeb3";
import getWob3 from "./components/getWob3";
import clubABI from "./ABI/club.json"
import tokenABI from "./ABI/token.json"
import swapABI from "./ABI/swap.json"
import priceABI from "./ABI/infoprice.json"

export default class Farm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tr: "",
            stakeModal: "",
            unstakeModal: "",
            stakeBtn: "Stake",
            disabled: false,
            swapam: "",
            newStake: ""
        }
        this.toggleStakeModal = this.toggleStakeModal.bind(this);
        this.handleStake = this.handleStake.bind(this);
        this.handleMaxStake = this.handleMaxStake.bind(this);
        this.handlePercStake = this.handlePercStake.bind(this);
        this.handlePercUnstake = this.handlePercUnstake.bind(this);
        this.handleStakeTx = this.handleStakeTx.bind(this);
        this.toggleUnstakeModal = this.toggleUnstakeModal.bind(this);
        this.handleMaxUnstake = this.handleMaxUnstake.bind(this);
        this.handleUnstakeTx = this.handleUnstakeTx.bind(this);
        this.handleClaimTx = this.handleClaimTx.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
        this.handleMaxSwap = this.handleMaxSwap.bind(this);
        this.handleSwapTx = this.handleSwapTx.bind(this);
    }
    toggleUnstakeModal(event) {
        if (this.state.unstakeModal === "") {
            this.setState({ unstakeModal: "expanded", newStake: "" })
        }
        else {
            this.setState({ unstakeModal: "", newStake: "" })
        }
    }
    toggleStakeModal(event) {
        if (this.state.stakeModal === "") {
            this.setState({ stakeModal: "expanded", newStake: "" })
        }
        else {
            this.setState({ stakeModal: "", newStake: "" })
        }
    }
    handleSwap(event) {
        this.setState({ swapam: event.target.value })
    }
    handleMaxSwap(event) {
        this.setState({ swapam: roundDown(this.state.finfoBal, 5) })
    }
    handleStake(event) {
        this.setState({ newStake: event.target.value })
    }
    handleMaxStake(event) {
        var newStake = roundDown(this.state.infoBal, 5);
        this.setState({ newStake: newStake })
    }
    handlePercStake(num) {
        var newStake;
        if (num === 25) {
            newStake = (this.state.infoBal) * 0.25;
            this.setState({ newStake: newStake })
        }
        else if (num === 50) {
            newStake = (this.state.infoBal) * 0.5;
            this.setState({ newStake: newStake })
        }
        else if (num === 75) {
            newStake = (this.state.infoBal) * 0.75;
            this.setState({ newStake: newStake })
        }
        else if (num === 100) {
            newStake = roundDown(this.state.infoBal, 5);
            this.setState({ newStake: newStake })
        }
    }
    handleMaxUnstake(event) {
        var newStake = this.state.userStaked;
        this.setState({ newStake: newStake })
    }
    handlePercUnstake(num) {
        var newStake;
        if (num === 25) {
            newStake = (this.state.userStaked) * 0.25;
            this.setState({ newStake: newStake })
        }
        else if (num === 50) {
            newStake = (this.state.userStaked) * 0.5;
            this.setState({ newStake: newStake })
        }
        else if (num === 75) {
            newStake = (this.state.userStaked) * 0.75;
            this.setState({ newStake: newStake })
        }
        else if (num === 100) {
            newStake = (this.state.userStaked);
            this.setState({ newStake: newStake })
        }
    }

    async handleClaimTx() {
        if (this.state.accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
            alert('please install the KAI wallet to stake')
        }
        else {
            if (this.state.approved === true) {
                // eslint-disable-next-line
                if (this.state.userStaked == 0) {
                    this.toggleStakeModal()
                }
                else {
                    this.setState({ tr: "cl" })
                    await this.state.club.methods.getReward().send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                        if (error !== undefined && error !== null) {
                            console.log(error)
                            this.setState({ tr: "" })
                        }
                    }.bind(this)).then(function () {
                        this.setState({ tr: "" })
                    }.bind(this))
                }
            }
            else {
                this.setState({ tr: "appr" })
                await this.state.info.methods.approve(this.state.clubAddr, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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

    async handleStakeTx(event) {
        if (this.state.accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
            alert('please install the KAI wallet to stake')
        }
        else {
            if (this.state.infoBal < 0.0001) {
                alert('Please buy INFO to stake')
            }
            else {
                if (this.state.newStake !== "") {
                    if (this.state.newStake > this.state.infoBal) {
                        alert('Please buy more INFO to stake this amount')
                    }
                    else {
                        this.setState({ tr: "st" })
                        if (this.state.approved === true) {
                            var stake = this.state.web3.utils.toWei(this.state.newStake.toString(), 'ether');
                            await this.state.club.methods.stake(stake).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                                if (error !== undefined && error !== null) {
                                    console.log(error)
                                    this.setState({ tr: "" })
                                }
                            }.bind(this)).then(function () {
                                this.setState({ tr: "" })
                            }.bind(this))
                        }
                        else {
                            if (this.state.accounts[0] !== "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
                                this.setState({ tr: "appr" })
                                await this.state.info.methods.approve(this.state.clubAddr, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
                else {
                    alert("please input an amount of INFO to stake")
                }
            }
        }
    }
    async handleUnstakeTx(event) {
        if (this.state.accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
            alert('please install the KAI wallet to unstake')
        }
        else {
            if (this.state.userStaked < 0.0001) {
                alert('Please stake to unstake')
            }
            else {
                if (this.state.newStake !== "") {
                    if (this.state.newStake > this.state.userStaked) {
                        alert('Please stake more to unstake this amount')
                    }
                    else {
                        this.setState({ tr: "unst" })
                        if (this.state.approved === true) {
                            var stake = this.state.web3.utils.toWei(this.state.newStake.toString(), 'ether');
                            await this.state.club.methods.withdraw(stake).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                                if (error !== undefined && error !== null) {
                                    console.log(error)
                                    this.setState({ tr: "" })
                                }
                            }.bind(this)).then(function () {
                                this.setState({ tr: "" })
                            }.bind(this))
                        }
                        else {
                            if (this.state.accounts[0] !== "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
                                this.setState({ tr: "appr" })
                                await this.state.info.methods.approve(this.state.clubAddr, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
                else {
                    alert("please input an amount of INFO to stake")
                }
            }
        }
    }

    async handleSwapTx(event) {
        if (this.state.accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
            alert('please install the KAI wallet to swap')
        }
        else {
            if (this.state.finfoBal < 0.0001) {
                alert('Please earn some fINFO to stake')
            }
            else {
                if (this.state.approved2 === true) {
                    if (this.state.swapam !== "") {
                        if (this.state.swapam > this.state.finfoBal) {
                            alert('Please earn more fINFO to swap this amount')
                        }
                        else {
                            this.setState({ tr: "sw" })
                            var stake = this.state.web3.utils.toWei(this.state.swapam.toString(), 'ether');
                            await this.state.swap.methods.swap(stake).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                                if (error !== undefined && error !== null) {
                                    console.log(error)
                                    this.setState({ tr: "" })
                                }
                            }.bind(this)).then(function () {
                                this.setState({ tr: "" })
                            }.bind(this))
                        }

                    }
                    else {
                        alert("please input an amount of fINFO to swap")
                    }
                }
                else {
                    if (this.state.accounts[0] !== "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
                        this.setState({ tr: "appr2" })
                        await this.state.finfo.methods.approve(this.state.swapAddr, "1000000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
                var clubAddr = "0x238714D59FFDf9ebd2F2AdDC9E61e14283c3243b"
                var infoAddr = "0x3eFB8AC1D1b289be515a7D44Ae643AC156f57A9F"
                var finfoAddr = "0x54E5A1772Fc6C011abDcf176E47b02F4F001AE9F"
                var swapAddr = "0x89A8f0616f55cdA05bdbA8BAD7ec8d5F0bCcd8CF"
                var priceAddr = "0xE439bC4d52D66eE5F275B5D5859dA40b6aC31422"
                var club
                var clubws
                var info
                var finfo
                var swap
                var price
                if (!this.state.ico) {
                    club = new web3.eth.Contract(clubABI, clubAddr);
                    clubws = new wob3.eth.Contract(clubABI, clubAddr);
                    info = new web3.eth.Contract(tokenABI, infoAddr);
                    finfo = new web3.eth.Contract(tokenABI, finfoAddr);
                    swap = new web3.eth.Contract(swapABI, swapAddr);
                    price = new web3.eth.Contract(priceABI, priceAddr);
                }
                else {
                    club = this.state.club
                    clubws = this.state.clubws
                    info = this.state.info
                    finfo = this.state.finfo
                    swap = this.state.swap
                    price = this.state.price
                }

                let [totalStaked, userStaked, rewards, infoBal, finfoBal, approved, rate, approved2, prices] = await Promise.all([
                    clubws.methods._totalSupply().call(),
                    clubws.methods._balances(accounts[0]).call(),
                    clubws.methods.earned(accounts[0]).call(),
                    info.methods.balanceOf(accounts[0]).call(),
                    finfo.methods.balanceOf(accounts[0]).call(),
                    info.methods.allowance(accounts[0], clubAddr).call(),
                    swap.methods.rate().call(),
                    finfo.methods.allowance(accounts[0], swapAddr).call(),
                    price.methods.tokenPrice().call()
                ]);
                totalStaked = parseFloat(wob3.utils.fromWei(totalStaked));
                userStaked = parseFloat(wob3.utils.fromWei(userStaked));
                rewards = parseFloat(wob3.utils.fromWei(rewards));
                infoBal = parseFloat(wob3.utils.fromWei(infoBal));
                finfoBal = parseFloat(wob3.utils.fromWei(finfoBal));
                rate = parseFloat(wob3.utils.fromWei(rate));
                var infoPrice = parseFloat(wob3.utils.fromWei(prices[0]));
                var lpPrice = parseFloat(wob3.utils.fromWei(prices[1]));
                console.log(infoPrice, lpPrice)
                // eslint-disable-next-line
                if (approved == 0) {
                    approved = false
                }
                else {
                    approved = true
                }
                // eslint-disable-next-line
                if (approved2 == 0) {
                    approved2 = false
                }
                else {
                    approved2 = true
                }
                var stakeBtn
                var unstakeBtn
                var claimBtn
                var morebtns = "d-none"
                var swapbtn
                if (approved === true) {
                    stakeBtn = "Stake LP"
                    unstakeBtn = "Unstake"
                    if (userStaked > 0) {
                        claimBtn = "Claim Rewards"
                        morebtns = ""
                    }
                    else {
                        claimBtn = "Stake LP"

                    }
                }
                else {
                    stakeBtn = "Approve"
                    unstakeBtn = "Approve"
                    claimBtn = "Approve"
                }
                if (approved2 === true) {
                    swapbtn = "Swap"
                }
                else {
                    swapbtn = "Approve Swap"
                }
                if (this.state.tr === "") {
                    this.setState({
                        web3,
                        wob3,
                        clubws,
                        club,
                        info,
                        finfo,
                        swap,
                        price,
                        accounts,
                        totalStaked,
                        userStaked,
                        rewards,
                        infoBal,
                        finfoBal,
                        clubAddr,
                        priceAddr,
                        approved,
                        tr: "",
                        stakeBtn,
                        unstakeBtn,
                        claimBtn,
                        morebtns,
                        disabled: false,
                        rate,
                        swapbtn,
                        swapAddr,
                        approved2,
                        infoPrice,
                        lpPrice
                    })
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            if (this.state.tr === "appr") {
                this.setState({ stakeBtn: "Approving", unstakeBtn: "Approving", claimBtn: "Approving", swapbtn: "Waiting", disabled: true })
            }
            else if (this.state.tr === "st") {
                this.setState({ stakeBtn: "Staking", unstakeBtn: "Waiting", claimBtn: "Waiting", swapbtn: "Waiting", disabled: true })
            }
            else if (this.state.tr === "unst") {
                this.setState({ stakeBtn: "Waiting", unstakeBtn: "Unstaking", claimBtn: "Waiting", swapbtn: "Waiting", disabled: true })
            }
            else if (this.state.tr === "cl") {
                this.setState({ stakeBtn: "Waiting", unstakeBtn: "Waiting", claimBtn: "Claiming", swapbtn: "Waiting", disabled: true })
            }
            else if (this.state.tr === "appr2") {
                this.setState({ stakeBtn: "Waiting", unstakeBtn: "Waiting", claimBtn: "Waiting", swapbtn: "Approving", disabled: true })
            }
            else if (this.state.tr === "sw") {
                this.setState({ stakeBtn: "Waiting", unstakeBtn: "Waiting", claimBtn: "Waiting", swapbtn: "Swapping", disabled: true })
            }
        }

    }


    componentDidMount = async () => {
        document.title = `Farm - Kardia info`;
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
            <div className="clubhouse">
                <div className="icoWarapper">
                    <div className="top m-b-100">
                        <p className="p-t-0 m-t-0 p-l-40 m-b-24 fs-24 t-ab icot">INFO Farm stats</p>
                        <div className="ico-info p-t-10 p-b-10">
                            <div className="ico-info-box  m-l-40 tp">
                                <p className="fs-16 t-g fw-700 ">fINFO price</p>
                                <p className="fs-32 t-ab p-t-10 bb">{parseFloat(this.state.rate).toFixed(5)} <span className="t-s"> INFO</span></p>
                                <p className="fs-14 t-lbl p-t-10">${parseFloat(this.state.rate*this.state.infoPrice).toFixed(5)}</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.333008" width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M21.0049 26.3298C21.0049 27.6198 21.9949 28.6598 23.2249 28.6598H25.7349C26.8049 28.6598 27.6749 27.7498 27.6749 26.6298C27.6749 25.4098 27.1449 24.9798 26.3549 24.6998L22.3249 23.2998C21.5349 23.0198 21.0049 22.5898 21.0049 21.3698C21.0049 20.2498 21.8749 19.3398 22.9449 19.3398H25.4549C26.6849 19.3398 27.6749 20.3798 27.6749 21.6698" stroke="#9699A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24.333 18V30" stroke="#9699A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">APR</p>
                                <p className="fs-32 t-ab p-t-10 bb">{numberWithCommas(((((846 * this.state.rate*this.state.infoPrice) * 365) / this.state.totalStaked*this.state.lpPrice) * 100).toFixed(2))} <span className="t-s"> %</span></p>
                                <p className="fs-14 t-lbl p-t-10">~846 fINFO per day</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width={49} height={48} viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.333984" width={48} height={48} rx={12} fill="#F2F4FA" />
                                    <path d="M33.3431 21.6074H29.6621V34.0001H33.3431V21.6074Z" fill="#9699A5" />
                                    <path d="M33.3436 14V18.8773H31.5031V17.4663L26.227 23.0184H22.1166L16.5031 28.5092L15 26.9755L21.227 20.8712H25.3067L30.0613 15.8405H28.4663V14H33.3436Z" fill="#9699A5" />
                                    <path d="M26.7181 25.5337H23.0371V33.9999H26.7181V25.5337Z" fill="#9699A5" />
                                    <path d="M20.0921 30.3804H16.4111V34H20.0921V30.3804Z" fill="#9699A5" />
                                </svg>


                            </div>
                            <div className="ico-info-box">
                                <p className="fs-16 t-g fw-700 ">Deposited</p>
                                <p className="fs-32 t-ab p-t-10 bb">{numberWithCommas(this.state.totalStaked.toFixed(0))} <span className="t-s"> LP</span></p>
                                <p className="fs-14 p-t-10 t-lbl">${numberWithCommas((this.state.totalStaked*this.state.lpPrice).toFixed(2))}</p>
                                <svg className="ab-t-r m-t-18 m-r-18" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="48" height="48" rx="12" fill="#F2F4FA" />
                                    <path d="M30.0702 26.4301L24.0002 32.5001L17.9302 26.4301" stroke="#9699A5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24 15.5V32.33" stroke="#9699A5" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="ch-bot">
                        <div className="ch-bg farms m-b-100">
                            <div className="ch-overlay farms">
                                <div>
                                    <h3 className="fs-24 m-b-25 fw-700 t-ab">Farm INFO Liquidity</h3>
                                    <p className="fs-18 t-g m-b-40 fw-100">
                                        Farm INFO-KAI Liquidity to receive fINFO that can be swapped for INFO at any time.<br/><br/><a className="t-bl t-d-none" href="https://docs.kardiainfo.com/info-farm" >Learn how to farm</a><br/><br/><a className="t-bl t-d-none" href="https://kaidex.io/portfolio/add/0x3eFB8AC1D1b289be515a7D44Ae643AC156f57A9F" >Receive LP tokens</a>
                                    </p>
                                </div>
                                <div className="ch-info">
                                    <p className="fs-13 t-g m-b-10 t-g">
                                        My INFO-KAI LP in the farm
                                    </p>
                                    <p className="fs-32 m-t-0 fw-700 m-b-0">
                                        {this.state.userStaked.toFixed(2)} <span className="t-s">LP</span>
                                    </p>
                                    <p className="fs-14 t-lbl  m-b-25 m-t-5 p-t-0">~ ${(this.state.userStaked*this.state.lpPrice).toFixed(2)}</p>
                                    <p className="fs-13 t-g m-b-10 t-g">
                                        Rewards to claim
                                    </p>
                                    <p className="fs-24 m-t-0 fw-700 m-b-25 t-ab">
                                        {this.state.rewards.toFixed(4)} <span className="t-bl">fINFO</span><span className={"fs-14 t-lbl " + this.state.morebtns}><br />→ ~ {parseFloat(this.state.userStaked / this.state.totalStaked * 846).toFixed(3)} fINFO / Day</span>
                                    </p>
                                    <button disabled={this.state.disabled} onClick={this.handleClaimTx} className={"clbtn btn m-b-20 " + this.state.claimBtn}>
                                        {this.state.claimBtn}
                                        <img alt="" className={"txwait ab-r-m m-r-10 " + this.state.claimBtn} src="./img/spin.gif"></img>
                                    </button>
                                    <div className={"stakemore fs-16 t-g " + this.state.morebtns}>
                                        <span onClick={this.toggleStakeModal} className="t-bl c-pointer">Stake more</span>
                                        <span onClick={this.toggleUnstakeModal} className="t-g c-pointer">Unstake LP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swapWrapper">
                        <div className="swapbox">
                            <p className="fs-24 ">
                                Swap fINFO for INFO
                            </p>
                            <div className="gameinput pos-r m-b-16">
                                <div className="tophalf m-b-5">
                                    <span className="fs-14 f-ws">Swap Amount</span>
                                    <span className="fs-14 f-ws t-bl c-pointer" onClick={this.handleMaxSwap}>Balance: {numberWithCommas(parseFloat(this.state.finfoBal).toFixed(2))} fINFO</span>
                                </div>
                                <div className="inpboxg">
                                    <input type="number" disabled={this.state.disabled} placeholder="Amount" value={this.state.swapam} className="gametxtinput betamount fs-16 p-l-12" onChange={this.handleSwap}></input>
                                    <span className="ab-r-m m-r-10 fs-16 f-ws">fINFO</span>
                                </div>
                            </div>
                            <p className="t-g f-ws fs-12 m-t-0 m-b-16">
                                Rate: {this.state.rate.toFixed(6)} fINFO / INFO
                            </p>
                            <hr />
                            <p className="f-ws fs-16 t-g">Receive: <span className="t-bl">~ {(this.state.swapam * this.state.rate).toFixed(3)} INFO</span></p>
                            <button onClick={this.handleSwapTx} disabled={this.state.disabled} className={"btn swapbtn " + this.state.swapbtn}>
                                {this.state.swapbtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.swapbtn} src="./img/spin.gif"></img>
                            </button>
                        </div>
                        <svg className="ab-c-b" width="2169" height="288" viewBox="0 0 2169 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M211.815 190.987C770.15 -64.7354 1412.47 -63.1181 1969.51 195.413L2169 288H0L211.815 190.987Z" fill="#E4F2FF" />
                        </svg>
                    </div>



                </div>

                <div className={"modal stake " + this.state.stakeModal}>
                    <div className="topbar m-b-15">
                        <div onClick={this.toggleStakeModal} className="icon-btn ab-l-m m-l-10 ripple hamb-menu cross noselect">
                            <svg className="hamburger-svg opened noselect" width="30" height="30" viewBox="0 0 100 100">
                                <path className="hamburger-line hamburger-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                <path className="hamburger-line hamburger-line2" d="M 20,50 H 80" />
                                <path className="hamburger-line hamburger-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                            </svg>
                        </div>
                        <div className="title ab-l-m fs-22 t-g m-l-60 f-rob noselect">
                            Stake LP
                        </div>
                    </div>
                    <div className="cont p-l-15 p-r-15">
                        <p className="txt-r fs-14 t-bl c-pointer" onClick={this.handleMaxStake}>Balance: {numberWithCommas(parseFloat(this.state.infoBal).toFixed(2))} LP</p>
                        <div className="infoInp stakeInp m-b-15">
                            <img className="ab-l-m m-l-5" src="./img/smalllogo.png" alt=""></img>
                            <input type="number" placeholder="Stake amount" value={this.state.newStake} className="gametxtinp stakeInp fs-16 p-l-26" onChange={this.handleStake}></input>
                        </div>
                        <div className="percBtns m-b-30">
                            <button onClick={() => this.handlePercStake(25)} className="percBtn t-bl fs-14 c-pointer">25%</button>
                            <button onClick={() => this.handlePercStake(50)} className="percBtn t-bl fs-14 c-pointer">50%</button>
                            <button onClick={() => this.handlePercStake(75)} className="percBtn t-bl fs-14 c-pointer">75%</button>
                            <button onClick={() => this.handlePercStake(100)} className="percBtn t-bl fs-14 c-pointer">100%</button>
                        </div>
                        <p className="m-b-20 fs-15">Currently Staked: <span className="fw-600 t-g">{numberWithCommas(parseFloat(this.state.userStaked).toFixed(3))} LP</span></p>
                        <p className="m-b-20 fs-15">New Stake: <span className="fw-600 t-bl">{numberWithCommas(parseFloat(parseFloat(this.state.userStaked) + parseFloat(this.state.newStake)).toFixed(3))} LP</span></p>
                        <p className="m-b-30 fs-15">Daily profit: <span className={"fw-600 t-gr"}>{numberWithCommas(parseFloat((parseFloat(this.state.userStaked) + parseFloat(this.state.newStake)) / (parseFloat(this.state.totalStaked) + parseFloat(this.state.newStake)) * 846).toFixed(3))} fINFO</span></p>
                        <button onClick={this.handleStakeTx} disabled={this.state.disabled} className={"stakebtn btn big bl m-l-auto m-r-auto m-t-30 " + this.state.stakeBtn}>{this.state.stakeBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.stakeBtn} src="./img/spin.gif"></img></button>
                        <p className="t-g f-ws">Please note: unstaking comes with a <span className="t-or ">1% tax</span> so plan your actions accordingly.</p>
                    </div>
                </div>
                <div onClick={this.toggleStakeModal} className={"modal-overlay " + this.state.stakeModal}></div>

                <div className={"modal unstake " + this.state.unstakeModal}>
                    <div className="topbar m-b-15">
                        <div onClick={this.toggleUnstakeModal} className="icon-btn ab-l-m m-l-10 ripple hamb-menu cross noselect">
                            <svg className="hamburger-svg opened noselect" width="30" height="30" viewBox="0 0 100 100">
                                <path className="hamburger-line hamburger-line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                                <path className="hamburger-line hamburger-line2" d="M 20,50 H 80" />
                                <path className="hamburger-line hamburger-line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                            </svg>
                        </div>
                        <div className="title ab-l-m fs-22 t-g m-l-60 f-rob noselect">
                            Unstake LP
                        </div>
                    </div>
                    <div className="cont p-l-15 p-r-15">
                        <p className="txt-r fs-14 t-bl c-pointer" onClick={this.handleMaxUnstake}>Staked: {numberWithCommas(parseFloat(this.state.userStaked).toFixed(2))} LP</p>
                        <div className="infoInp stakeInp m-b-15">
                            <img className="ab-l-m m-l-5" src="./img/smalllogo.png" alt=""></img>
                            <input type="number" placeholder="Unstake amount" value={this.state.newStake} className="gametxtinp stakeInp fs-16 p-l-26" onChange={this.handleStake}></input>
                        </div>
                        <div className="percBtns m-b-30">
                            <button onClick={() => this.handlePercUnstake(25)} className="percBtn t-bl fs-14 c-pointer">25%</button>
                            <button onClick={() => this.handlePercUnstake(50)} className="percBtn t-bl fs-14 c-pointer">50%</button>
                            <button onClick={() => this.handlePercUnstake(75)} className="percBtn t-bl fs-14 c-pointer">75%</button>
                            <button onClick={() => this.handlePercUnstake(100)} className="percBtn t-bl fs-14 c-pointer">100%</button>
                        </div>
                        <p className="m-b-20 fs-15">Current Profit: <span className="fw-600 t-bl">{parseFloat(this.state.userStaked / this.state.totalStaked * 846).toFixed(3)} fINFO / Day</span></p>
                        <p className="m-b-30 fs-15">New Profit: <span className={"fw-600 t-or"}>{numberWithCommas(parseFloat((parseFloat(this.state.userStaked) - parseFloat(this.state.newStake)) / (parseFloat(this.state.totalStaked) + parseFloat(this.state.newStake)) * 846).toFixed(3))} fINFO / Day</span></p>
                        <button disabled={this.state.disabled} onClick={this.handleUnstakeTx} className={"stakebtn btn big bl m-l-auto m-r-auto m-t-30 " + this.state.unstakeBtn}>{this.state.unstakeBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.unstakeBtn} src="./img/spin.gif"></img></button>
                        <p className="t-g f-ws">Please note: unstaking comes with a <span className="t-or ">1% tax</span> so plan your actions accordingly.</p>
                    </div>
                </div>
                <div onClick={this.toggleUnstakeModal} className={"modal-overlay " + this.state.unstakeModal}></div>
            </div>
        )
    }
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function roundDown(number, decimals) {
    decimals = decimals || 0;
    return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}