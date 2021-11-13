import React, { Component } from "react";
import getWeb3 from "./components/getWeb3";
import getWob3 from "./components/getWob3";
import Loader from "./components/Loader";
import gameABI from "./ABI/bet.json"
import Altlogo from "./components/subcomponents/svgs/Altlogo";


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameres: {
                bg: "",
                message: ""
            },
            num1: "0",
            num2: "0",
            num3: "0",
            num4: "0",
            hasPlayed: false,
            kaiBal: 0,
            tr: "",
            multiplier: 2,
            wager: 10,
            hi: "Bet High",
            lo: "Bet Low",
            winnings: 20.00
        };
        this.niceNum = this.niceNum.bind(this);
        this.weiToEth = this.weiToEth.bind(this);
        this.hilow = this.hilow.bind(this);
        this.handleMultiplier = this.handleMultiplier.bind(this);
        this.handleBet = this.handleBet.bind(this);
        this.handleMaxBet = this.handleMaxBet.bind(this);
        this.handleMM = this.handleMM.bind(this);
        this.handleBM = this.handleBM.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }

    niceNum(x, y, z) {
        if (z) {
            x = this.state.wob3.utils.fromWei(x)
        }

        x = roundDown(x, y)
        if (x >= 1000) {
            x = numberWithCommas(x);
        }
        return (x);
    }

    weiToEth(x, y) {
        x = this.state.wob3.utils.fromWei(x)
        x = roundDown(x, y)
        return (x)
    }

    hilow(x, y) {
        var lo = (950000 / (x * 100)).toFixed(0);
        var hi = 10000 - lo;

        if (y === "hi") {
            return (hi)
        }
        if (y === "lo") {
            return (lo)
        }
    }

    handleMultiplier(event) {
        var m = event.target.value
        if (m >= 4750) {
            m = 4750
        }
        if (m < 0) {
            m = ""
        }
        if (countDecimals(m) > 2) {
            m = roundDown(m, 2)
        }
        if (event.target.value === "") {
            m = ""
        }
        this.setState({ multiplier: m }, () => {
            event.target.value = this.state.wager
            this.handleBM(event)
        })
    }

    handleMM(event) {
        var m = event.target.value
        var w = this.state.wager

        if (m >= 4750) {
            m = 4750
        }
        else if (m <= 1.01) {
            m = 1.01
        }
        else if (m === "") {
            m = 1.01
        }
        if (m * w > this.state.maxWin) {
            w = this.state.maxWin / m
        }
        this.setState({ multiplier: roundDown(m, 2), wager: w })
    }

    handleBet(event) {
        var w = event.target.value
        var m = this.state.multiplier
        if (event.nativeEvent.inputType !== "deleteContentBackward") {
            if (w > this.weiToEth(this.state.kaiBal)) {
                w = roundDown((this.weiToEth(this.state.kaiBal, 4) - 0.1), 4)
            }
            if (m * w >= this.state.maxWin) {
                w = this.state.maxWin / m
            }
        }
        if (w < 0) {
            w = ""
        }

        this.setState({ wager: w })
    }
    handleBM(event) {
        var m = this.state.multiplier
        var w = event.target.value
        if (w === "") {
            w = 1
        }
        if (w > this.weiToEth(this.state.kaiBal) - 0.1) {
            w = roundDown((this.weiToEth(this.state.kaiBal, 4) - 0.1), 4)
        }
        if (m * w >= this.state.maxWin) {
            w = this.state.maxWin / m
        }

        this.setState({ wager: roundDown(w, 4) })
    }
    handleMaxBet() {
        var w = roundDown((this.weiToEth(this.state.kaiBal, 4) - 0.1), 4)
        var m = this.state.multiplier

        if (w * m > this.state.maxWin) {
            w = this.state.maxWin / m
        }
        this.setState({ wager: roundDown(w, 4) })
    }

    async handlePlay(event) {

        if (this.state.accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
            alert("Please install the KAI wallet to play")
        }
        var g
        if (event.target.innerText === "Bet High") {
            g = 1
            this.setState({ tr: "hi" })
        }
        else if (event.target.innerText === "Bet Low") {
            g = 0
            this.setState({ tr: "lo" })
        }
        var val = this.state.web3.utils.toWei(this.state.wager.toString(), 'ether')
        var m = Math.round(this.state.multiplier * 100)

        await this.state.game.methods.play(g, m).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000', value: val }, async function (error) {
            if (error !== undefined && error !== null) {
                console.log(error)
                this.setState({ tr: "" })
            }
        }.bind(this)).then(function () {
            this.setState({ tr: "", hasPlayed: true })
        }.bind(this))
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
                var gameAddr = "0x8af7E4581Fb50F892eAfFaB59C5269D71Dc572C7"
                var game, gamews;

                if (!this.state.game) {
                    game = new web3.eth.Contract(gameABI, gameAddr);
                    gamews = new wob3.eth.Contract(gameABI, gameAddr);

                }
                else {
                    game = this.state.game
                    gamews = this.state.gamews
                }

                let [kaiBal, gameKai, maxWin, gL] = await Promise.all([
                    wob3.eth.getBalance(accounts[0]),
                    gamews.methods.kai().call(),
                    gamews.methods.maxWin().call(),
                    gamews.methods.gamesL(accounts[0]).call()
                ]);
                maxWin = (wob3.utils.fromWei(gameKai) * maxWin) / 100

                var lg
                var num
                var gameres = {
                    bg: "",
                    message: ""
                }
                if (gL > 0) {
                    lg = await game.methods.games(accounts[0], (gL - 1)).call();
                    num = lg.ran;
                    if (num < 10) num = "000" + num;
                    else if (num < 100) num = "00" + num;
                    else if (num < 1000) num = "0" + num;
                    num = Array.from(num.toString()).map(Number);

                    if (this.state.hasPlayed === true) {
                        if (lg.win === true) {
                            gameres = {
                                bg: "bg-gr",
                                message: "🤑 You Won " + web3.utils.fromWei(lg.reward.toString()) + " KAI"
                            }
                        }
                        else {
                            gameres = {
                                bg: "bg-red",
                                message: "😢 You Lost " + web3.utils.fromWei(lg.bet.toString()) + " KAI"
                            }
                        }
                    }
                    else {
                        gameres = {
                            bg: "",
                            message: ""
                        }
                    }
                }
                else {
                    num = [0, 0, 0, 0]
                    gameres = {
                        bg: "",
                        message: ""
                    }
                }
                if (accounts[0] === "0x2784fc8cB498Cc66689339BC01d56D7157D2a85f") {
                    gameres = {
                        bg: "bg-blue",
                        message: <a className="t-bl t-d-none" target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/kardiachain-wallet/pdadjkfkgcafgbceimcpbkalnfnepbnk">Please install the KardiaChain wallet to play</a>
                    }
                }
                if (this.state.tr === "") {
                    this.setState({
                        web3,
                        wob3,
                        accounts,
                        game,
                        gamews,
                        kaiBal,
                        maxWin,
                        num1: num[0],
                        num2: num[1],
                        num3: num[2],
                        num4: num[3],
                        gameres,
                        hi: "Bet High",
                        lo: "Bet Low",
                        disabled: false
                    })
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            if (this.state.tr === "hi") {
                this.setState({ hi: "Playing", lo: "Waiting", num1: "", num2: "", num3: "", num4: "", disabled: true })
            }
            else if (this.state.tr === "lo") {
                this.setState({ hi: "Waiting", lo: "Playing", num1: "", num2: "", num3: "", num4: "", disabled: true })
            }
        }
    }

    componentDidMount = async () => {
        document.title = `Game - Kardia info`;
        this.refreshData()
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
            <div className="Game pos-r of-hidden">
                <div className="left pos-r p-b-100">
                    <div className="gametab">
                        <div className="gamesec">

                            <div className={"gameres txt-c " + this.state.gameres.bg}>
                                {this.state.gameres.message}
                            </div>
                            <div className="bottom game bor p-b-10 p-t-15 m-b-15">
                                <div className="ranCont">
                                    <div className="ranNum m-b-30">
                                        <span className={"onenum one " + this.state.hi + " " + this.state.lo}>{this.state.num1}</span>
                                        <span className={"onenum two " + this.state.hi + " " + this.state.lo}>{this.state.num2}</span>
                                        <span className={"onenum three " + this.state.hi + " " + this.state.lo}>{this.state.num3}</span>
                                        <span className={"onenum four " + this.state.hi + " " + this.state.lo}>{this.state.num4}</span>
                                    </div>
                                </div>
                                <div className="gameinput  m-b-20">
                                    <div className="tophalf m-b-5">
                                        <span className="fs-14 f-ws">Bet Amount</span>
                                        <span className="fs-14 f-ws t-bl c-pointer" onClick={this.handleMaxBet}>Balance: {this.niceNum(this.state.kaiBal, 2, 1)} KAI</span>
                                    </div>
                                    <div className="inpboxg">
                                        <input type="number" disabled={this.state.disabled} placeholder="Bet amount" value={this.state.wager} className="gametxtinput betamount fs-16 p-l-12" onBlur={this.handleBM} onChange={this.handleBet}></input>
                                        <svg className="ab-r-m m-r-50" width="18" height="18" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.2381 14.4L2.85714 0.378947L0 3.78947L2.85714 9.85263L7.2381 14.4Z" fill="#333333" />
                                            <path d="M6.09524 4.92632L4.57143 0L8.19048 1.51579L7.04762 5.30526L6.09524 4.92632Z" fill="#333333" />
                                            <path d="M8.7619 5.87368L10.0952 1.51579L14.0952 0.568421L16 4.73684L13.7143 7.76842L8.7619 5.87368Z" fill="#333333" />
                                            <path d="M12.7619 9.28421L6.85714 7.01053L9.14286 14.2105L12.7619 9.28421Z" fill="#333333" />
                                        </svg>
                                        <span className="ab-r-m m-r-14 fs-16 f-ws">KAI</span>
                                    </div>
                                </div>

                                <div className="gameinput b m-b-10">
                                    <div className="tophalf m-b-5">
                                        <span className="fs-14 f-ws">Multiplier [ x1.01 → x4750 ]</span>
                                    </div>
                                    <div className="inpboxg">
                                        <input type="number" disabled={this.state.disabled} placeholder="Multiplier" className="gametxtinput betamount fs-16 p-l-12" onChange={this.handleMultiplier} onBlur={this.handleMM} value={this.state.multiplier}></input>
                                    </div>
                                    <div className="gameBtns m-t-20">
                                        <button disabled={this.state.disabled} className={"btn " + this.state.lo} onClick={this.handlePlay}>{this.state.lo} <img alt="" className={"txwait ab-r-m m-r-10 " + this.state.lo} src="./img/spin.gif"></img></button>
                                        <button disabled={this.state.disabled} className={"btn " + this.state.hi} onClick={this.handlePlay}>{this.state.hi} <img alt="" className={"txwait ab-r-m m-r-10 " + this.state.hi} src="./img/spin.gif"></img></button>
                                    </div>
                                </div>
                                <div className="gamean">
                                    <div>
                                        <p className="f-ws fs-16 t-lg m-t-0 m-b-8">
                                            Low: <span className="f-ws fs-16 t-b ">{" < " + this.hilow(this.state.multiplier, "lo")}</span>
                                        </p>
                                        <p className="f-ws fs-16 t-lg m-t-8 m-b-0">
                                            High: <span className="f-ws fs-16 t-b ">{" > " + this.hilow(this.state.multiplier, "hi")}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="txt-r fs-13 f-ws t-g m-b-8 m-t-0">Payout if you win</p>
                                        <p className="txt-r fs-24 f-ws m-t-8 m-b-0">{this.niceNum(this.state.multiplier * this.state.wager, 2)} <span className="t-s">KAI</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="lnkss">
                                <a rel="noreferrer" className="t-d-none" href="https://docs.kardiainfo.com/info-game" target="_blank"><span className="t-bl m-t-10 t-d-none">Learn the rules</span></a>
                                <a className="t-d-none" href="/infogame" ><span className="t-bl m-t-10 t-d-none">Play with INFO</span></a>
                            </div>
                        </div>
                        <svg className="ab-c-b svon" width="2169" height="288" viewBox="0 0 2169 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M211.815 190.987C770.15 -64.7354 1412.47 -63.1181 1969.51 195.413L2169 288H0L211.815 190.987Z" fill="#E4F2FF" />
                        </svg>

                    </div>

                </div>
                <div className="footer dk pos-r">
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
        );
    }
}



function numberWithCommas(x) {
    roundDown(x, 3);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function roundDown(number, decimals) {
    decimals = decimals || 0;
    return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}

function countDecimals(value) {
    try {
        if (Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0;
    }
    catch (err) {
        return 0
    }
}

export default Game;
