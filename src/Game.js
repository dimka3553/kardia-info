import React, { Component } from "react";
import getWeb3 from "./components/getWeb3";
import Blockies from 'react-blockies';
import Loader from "./components/Loader";
import tokenABI from "./ABI/token.json"
import gameABI from "./ABI/game.json"


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameAddress: null,
            tokenAddress: null,
            web3: null,
            accounts: null,
            InfoBal: null,
            approved: null,
            gameBal: null,
            winnings: 6.0000,
            multiplier: 2,
            wager: 3,
            hi: "> 5250",
            lo: "< 4750",
            game: null,
            token: null,
            loading: false,
            disabled: false,
            profitcol: "",
            newStake: "",
            stakeBtn: "",
            stakeModal: "",
            unstakeModal: "",
            num1: "0",
            num2: "0",
            num3: "0",
            num4: "0",
            tr: "",
            hasPlayed: false,
            gameres: {
                bg: "",
                message: ""
            },
            isStaking: "d-none"
        };
        this.handleBet = this.handleBet.bind(this);
        this.handleMultiplier = this.handleMultiplier.bind(this);
        this.handleMultiplierMaths = this.handleMultiplierMaths.bind(this);
        this.handleHigh = this.handleHigh.bind(this);
        this.handleLow = this.handleLow.bind(this);
        this.handleStake = this.handleStake.bind(this);
        this.handleMaxStake = this.handleMaxStake.bind(this);
        this.handleMaxUnstake = this.handleMaxUnstake.bind(this);
        this.handlePercStake = this.handlePercStake.bind(this);
        this.handlePercUnstake = this.handlePercUnstake.bind(this);
        this.handleStakeTx = this.handleStakeTx.bind(this);
        this.toggleStakeModal = this.toggleStakeModal.bind(this);
        this.toggleUnstakeModal = this.toggleUnstakeModal.bind(this);
        this.handleBetMaths = this.handleBetMaths.bind(this);
        this.handleUnstakeTx = this.handleUnstakeTx.bind(this);
    }

    toggleStakeModal(event) {
        if (this.state.stakeModal === "") {
            this.setState({ stakeModal: "expanded", newStake: "" })
        }
        else {
            this.setState({ stakeModal: "", newStake: "" })
        }
    }
    toggleUnstakeModal(event) {
        if (this.state.unstakeModal === "") {
            this.setState({ unstakeModal: "expanded", newStake: "" })
        }
        else {
            this.setState({ unstakeModal: "", newStake: "" })
        }
    }
    handleStake(event) {
        this.setState({ newStake: event.target.value })
    }
    handleMaxStake(event) {
        var newStake = this.state.InfoBal;
        this.setState({ newStake: newStake })
    }
    handleMaxUnstake(event) {
        var newStake = this.state.stakedBal;
        this.setState({ newStake: newStake })
    }

    handlePercStake(num) {
        var newStake;
        if (num === 25) {
            newStake = (this.state.InfoBal) * 0.25;
            this.setState({ newStake: newStake })
        }
        else if (num === 50) {
            newStake = (this.state.InfoBal) * 0.5;
            this.setState({ newStake: newStake })
        }
        else if (num === 75) {
            newStake = (this.state.InfoBal) * 0.75;
            this.setState({ newStake: newStake })
        }
        else if (num === 100) {
            newStake = (this.state.InfoBal);
            this.setState({ newStake: newStake })
        }
    }
    handlePercUnstake(num) {
        var newStake;
        if (num === 25) {
            newStake = (this.state.stakedBal) * 0.25;
            this.setState({ newStake: newStake })
        }
        else if (num === 50) {
            newStake = (this.state.stakedBal) * 0.5;
            this.setState({ newStake: newStake })
        }
        else if (num === 75) {
            newStake = (this.state.stakedBal) * 0.75;
            this.setState({ newStake: newStake })
        }
        else if (num === 100) {
            newStake = (this.state.stakedBal);
            this.setState({ newStake: newStake })
        }
    }
    handleBet(event) {
        var max = parseFloat(this.state.InfoBal)
        var inp = event.target.value;
        var mul = parseFloat(this.state.multiplier)
        var maxrev = parseFloat(this.state.gameBal) / 10.05
        var rev = inp * mul


        if (inp > max) {
            if (rev > maxrev) {
                console.log()
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(4) });
            }
            else {
                this.setState({ wager: max, winnings: (max * mul).toFixed(4) });
            }
        }
        else if (inp > 0.0001 && inp < max) {
            if (inp * mul > maxrev) {
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(4) });
            }
            else {
                this.setState({ wager: inp, winnings: (inp * mul).toFixed(4) });
            }
        }
        else {
            this.setState({ wager: inp, winnings: (inp * mul).toFixed(4) });
        }
    }
    handleBetMaths(event) {
        var max = parseFloat(this.state.InfoBal)
        var inp = event.target.value;
        var mul = parseFloat(this.state.multiplier)
        var maxrev = parseFloat(this.state.gameBal) / 10.05

        console.log(inp, max)
        if (inp < 0.0001) {
            this.setState({ wager: 0.0001, winnings: (0.0001 * mul).toFixed(4) });
        }
        else if (inp > max) {
            if (inp * mul > maxrev) {
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(4) });
            }
            else {
                this.setState({ wager: max, winnings: (max * mul).toFixed(4) });
            }
        }
        else {
            if (inp * mul > maxrev) {
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(4) });
            }
            else {
                this.setState({ wager: parseFloat(inp), winnings: (inp * mul).toFixed(4) });
            }
        }
    }
    handleMultiplier(event) {

        var lo = (950000 / (event.target.value * 100)).toFixed(0);
        var hi = 10000 - lo;

        hi = "> " + hi
        lo = "< " + lo

        if (event.target.value > 4750) {
            this.setState({ multiplier: 4750, winnings: (4750 * this.state.wager).toFixed(4), hi: "> 9998", lo: "< 2" },() => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else if (event.target.value <= 4750 && event.target.value >= 1.01) {
            this.setState({
                hi: hi,
                lo: lo,
                multiplier: event.target.value,
                winnings: (event.target.value * this.state.wager).toFixed(4)
            },() => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else {
            this.setState({
                hi: hi,
                lo: lo,
                multiplier: event.target.value,
                winnings: (event.target.value * this.state.wager).toFixed(4)
            },() => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
    }
    handleMultiplierMaths(event) {
        if (event.target.value < 1.01) {
            this.setState({ multiplier: 1.01, winnings: (1.01 * this.state.wager).toFixed(4), hi: "> 594", lo: "< 9406" },() => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else if (event.target.value > 4750) {
            this.setState({ multiplier: 4750, winnings: (4750 * this.state.wager).toFixed(4), hi: "> 9998", lo: "< 2" },() => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else if (event.target.value <= 4750 && event.target.value >= 1.01) {
            this.setState({ multiplier: event.target.value, winnings: (event.target.value * this.state.wager).toFixed(4) },() => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else {
            this.setState({ multiplier: 2, winnings: (2 * this.state.wager).toFixed(4), hi: "> 5250", lo: "< 4750" },() => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
    }

    async handleHigh(event) {
        if (this.state.approved === true) {
            var wager = this.state.web3.utils.toWei(this.state.wager.toString(), 'ether');
            this.setState({ tr: "hi" })
            await this.state.game.methods.play(1, (Math.round(this.state.multiplier * 100)), wager).send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000' }, async function (error) {
                if (error !== undefined && error !== null) {
                    console.log(error)
                    this.setState({ tr: "" })
                }
            }.bind(this)).then(function () {
                this.setState({ tr: "", hasPlayed: true })
            }.bind(this))

        }
        else {
            this.setState({ tr: "appr" })
            await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000'  }, async function (error) {
                if (error !== undefined && error !== null) {
                    console.log(error)
                    this.setState({ tr: "" })
                }
            }.bind(this)).then(function () {
                this.setState({ tr: "" })
            }.bind(this))
        }
    }
    async handleLow(event) {
        if (this.state.approved === true) {
            this.setState({ tr: "lo" })
            var wager = this.state.web3.utils.toWei(this.state.wager.toString(), 'ether');
            console.log(wager)
            await this.state.game.methods.play(0, Math.round(this.state.multiplier * 100), wager).send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000'  }, async function (error) {
                if (error !== undefined && error !== null) {
                    console.log(error)
                    this.setState({ tr: "" })
                }
            }.bind(this)).then(function () {
                this.setState({ tr: "", hasPlayed: true })
            }.bind(this))
        }
        else {
            this.setState({ tr: "appr" })
            await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000'  }, async function (error) {
                if (error !== undefined && error !== null) {
                    console.log(error)
                    this.setState({ tr: "" })
                }
            }.bind(this)).then(function () {
                this.setState({ tr: "" })
            }.bind(this))
        }
    }
    async handleStakeTx(event) {
        if (this.state.newStake !== "") {
            this.setState({ tr: "st" })
            if (this.state.approved === true) {
                var stake = this.state.web3.utils.toWei(this.state.newStake.toString(), 'ether');
                await this.state.game.methods.stakeTokens(stake).send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000'  }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "" })
                }.bind(this))
            }
            else {
                this.setState({ tr: "appr" })
                await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000'  }, async function (error) {
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
    async handleUnstakeTx(event) {
        if (this.state.newStake !== "") {
            if (this.state.approved === true) {
                this.setState({ tr: "uns" })
                var stake = this.state.web3.utils.toWei(this.state.newStake.toString(), 'ether');
                await this.state.game.methods.unstakeTokens(stake).send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000'  }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "" })
                }.bind(this))
            }

            else {
                this.setState({ tr: "appr" })
                await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0],gasPrice: '3000000000', gas:'700000'  }, async function (error) {
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

    async refreshData() {
        window.dispatchEvent( new Event('load') );
        if (this.state.tr === "") {
            try {
                // Get network provider and web3 instance.
                var web3
                if (!this.state.web3) {
                    web3 = await getWeb3();
                }
                else {
                    web3 = this.state.web3;
                }

                // Use web3 to get the user's accounts.
                const accounts = await web3.eth.getAccounts();

                const tokenAddress = "0xFbdD162a0FD45657d3754b9d17A4e9Cce33543dd";
                const gameAddress = "0x8659Be7d4bC2752544F8aC2aC1505ef4A906863d";

                const token = new web3.eth.Contract(tokenABI, tokenAddress);
                const game = new web3.eth.Contract(gameABI, gameAddress);

                this.setState({ game, token, gameAddress, tokenAddress })

                var info = await getInfo();

                async function getInfo() {
                    var ret = {};
                    ret.InfoBal = await token.methods.balanceOf(accounts[0]).call();
                    ret.gameBal = await token.methods.balanceOf(gameAddress).call();
                    ret.allowed = await token.methods.allowance(accounts[0], gameAddress).call();
                    ret.stakedBal = await game.methods.currentBalance(accounts[0]).call();
                    ret.originalBal = await game.methods.originalBalance(accounts[0]).call();
                    ret.gameID = await game.methods.id().call();
                    ret.wagered = await game.methods.wagered().call();
                    ret.totalWon = await game.methods.totalWon().call();
                    ret.arrayLen = await game.methods.gamesPlayed(accounts[0]).call();
                    if (ret.arrayLen > 0) {
                        ret.lastGame = await game.methods.gameHistory(accounts[0], (ret.arrayLen - 1)).call();
                    }
                    else {
                        ret.lastGame = false;
                    }

                    ret.gameBal = web3.utils.fromWei(ret.gameBal);
                    ret.InfoBal = web3.utils.fromWei(ret.InfoBal);
                    ret.totalWon = web3.utils.fromWei(ret.totalWon);
                    ret.wagered = web3.utils.fromWei(ret.wagered);
                    ret.originalBal = web3.utils.fromWei(ret.originalBal);
                    ret.stakedBal = web3.utils.fromWei(ret.stakedBal);
                    // eslint-disable-next-line
                    if (ret.allowed == 0) {
                        ret.allowed = false;
                    }
                    else {
                        ret.allowed = true;
                    }

                    return (ret)
                }
                var lo = (950000 / (this.state.multiplier * 100)).toFixed(0);
                var hi = 10000 - lo;

                hi = "> " + hi
                lo = "< " + lo
                var profit = info.stakedBal - info.originalBal;
                var profitcol;

                if (profit > 0) {
                    profitcol = "t-green"
                }
                else if (profit === 0) {
                    profitcol = "t-grey"
                }
                else {
                    profitcol = "t-red"
                }
                // eslint-disable-next-line
                if (info.stakedBal == 0) {
                    info.isStaking = "d-none"
                }
                else {
                    info.isStaking = ""
                }
                info.gameres = {
                    bg: "",
                    message: ""
                }
                var num;
                if (info.lastGame !== false) {
                    num = info.lastGame.ran;
                    if (num < 10) num = "000" + num;
                    else if (num < 100) num = "00" + num;
                    else if (num < 1000) num = "0" + num;
                    num = Array.from(num.toString()).map(Number);

                    if (this.state.hasPlayed === true) {
                        if (info.lastGame.won === true) {
                            info.gameres = {
                                bg: "bg-gr",
                                message: "🤑 You Won " + web3.utils.fromWei(info.lastGame.winnings) + " INFO"
                            }
                        }
                        else {
                            info.gameres = {
                                bg: "bg-red",
                                message: "😢 You Lost " + web3.utils.fromWei(info.lastGame.wagered) + " INFO"
                            }
                        }
                    }
                }
                else {
                    num = [0, 0, 0, 0]
                }

                if (info.allowed === true) {
                    this.setState({
                        web3,
                        accounts,
                        InfoBal: info.InfoBal,
                        approved: info.allowed,
                        gameBal: info.gameBal,
                        hi: hi,
                        lo: lo,
                        disabled: false,
                        profit: profit,
                        gameID: info.gameID,
                        totalWon: info.totalWon,
                        wagered: info.wagered,
                        stakedBal: info.stakedBal,
                        profitcol: profitcol,
                        originalBal: info.originalBal,
                        stakeBtn: "Stake",
                        unstakeBtn: "Unstake",
                        num1: num[0],
                        num2: num[1],
                        num3: num[2],
                        num4: num[3],
                        gameres: {
                            bg: info.gameres.bg,
                            message: info.gameres.message
                        },
                        isStaking: info.isStaking
                    });
                }
                else {
                    this.setState({
                        web3,
                        accounts,
                        InfoBal: info.InfoBal,
                        approved: info.allowed,
                        gameBal: info.gameBal,
                        hi: "Approve",
                        lo: "Approve",
                        profit: profit,
                        gameID: info.gameID,
                        totalWon: info.totalWon,
                        wagered: info.wagered,
                        stakedBal: info.stakedBal,
                        profitcol: profitcol,
                        originalBal: info.originalBal,
                        stakeBtn: "Approve",
                        unstakeBtn: "Approve",
                        num1: "0",
                        num2: "0",
                        num3: "0",
                        num4: "0",
                        isStaking: info.isStaking,
                        gameres: {
                            bg: info.gameres.bg,
                            message: info.gameres.message
                        },
                    });
                }


            } catch (error) {
                // Catch any errors for any of the above operations.
                console.error(error);
            }
        }
        else {
            if (this.state.tr === "hi") {
                this.setState({ hi: "Playing", lo: "Waiting", stakeBtn: "Waiting", unstakeBtn: "Waiting", num1: "", num2: "", num3: "", num4: "", disabled: true })
            }
            else if (this.state.tr === "lo") {
                this.setState({ hi: "Waiting", lo: "Playing", stakeBtn: "Waiting", unstakeBtn: "Waiting", num1: "", num2: "", num3: "", num4: "", disabled: true })
            }
            else if (this.state.tr === "st") {
                this.setState({ hi: "Waiting", lo: "Waiting", stakeBtn: "Staking", unstakeBtn: "Waiting", disabled: true })
            }
            else if (this.state.tr === "uns") {
                this.setState({ hi: "Waiting", lo: "Waiting", stakeBtn: "Waiting", unstakeBtn: "Unstaking", disabled: true })
            }
            else if (this.state.tr === "appr") {
                this.setState({ hi: "Approving", lo: "Approving", stakeBtn: "Approving", unstakeBtn: "Approving", disabled: true })
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
        var wal = this.state.accounts[0].substring(0, 5) + "..." + this.state.accounts[0].slice(this.state.accounts[0].length - 3);
        return (
            <div className="Game">
                <div className="left">
                    <div className="waltab">
                        <div className="walsec">
                            <div className="top">
                                <div className="l">
                                    <Blockies
                                        seed={this.state.accounts[0]}
                                        size={10}
                                        scale={4}
                                        className="identicon m-r-15"
                                    />
                                    {wal}
                                </div>
                                <div className="r p-l-25 p-t-14 p-b-14">
                                    {numberWithCommas(parseFloat(this.state.InfoBal).toFixed(3)) + " INFO"}
                                </div>
                            </div>
                            <div className="top fs-18">
                                Guess where the next random will land and multiply your intitial investment
                            </div>
                            <div className={"gameres txt-c " + this.state.gameres.bg}>
                                {this.state.gameres.message}
                            </div>
                            <div className="bottom game bor p-b-30 p-t-30">
                                <div className="ranCont">
                                    <div className="ranNum m-b-30">
                                        <span className={"onenum one " + this.state.hi + " " + this.state.lo}>{this.state.num1}</span>
                                        <span className={"onenum two " + this.state.hi + " " + this.state.lo}>{this.state.num2}</span>
                                        <span className={"onenum three " + this.state.hi + " " + this.state.lo}>{this.state.num3}</span>
                                        <span className={"onenum four " + this.state.hi + " " + this.state.lo}>{this.state.num4}</span>
                                    </div>
                                </div>
                                <div className="gameInp pos-r">
                                    <div className="gameInpCont">
                                        <div className="gameInputs m-b-30">
                                            <div className="infoInp">
                                                <img className="ab-l-m m-l-5" src="./img/smalllogo.png" alt=""></img>
                                                <input type="number" disabled={this.state.disabled} placeholder="Bet amount" value={this.state.wager} className="gametxtinp betamount fs-16 p-l-26" onBlur={this.handleBetMaths} onChange={this.handleBet}></input>
                                            </div>
                                            <div className="mult fs-20 fw-600 t-bl">×</div>
                                            <input disabled={this.state.disabled} className="gametxtinp multiplier fs-16 txt-c" placeholder="Multip" type="number" onChange={this.handleMultiplier} onBlur={this.handleMultiplierMaths} value={this.state.multiplier}></input>
                                            <div className="eq fs-20 fw-600 t-bl">=</div>
                                            <div className="infoInp">
                                                <img className="ab-l-m m-l-5" src="./img/smalllogo.png" alt=""></img>
                                                <input disabled value={this.state.winnings} className="gametxtinp winnings fs-16 p-l-26 f-w-600"></input>
                                            </div>
                                        </div>
                                        <div className="gameBtns">
                                            <button disabled={this.state.disabled} className={"btn " + this.state.lo} onClick={this.handleLow}>{this.state.lo} <img alt="" className={"txwait ab-r-m m-r-10 " + this.state.lo} src="./img/spin.gif"></img></button>
                                            <button disabled={this.state.disabled} className={"btn " + this.state.hi} onClick={this.handleHigh}>{this.state.hi} <img alt="" className={"txwait ab-r-m m-r-10 " + this.state.hi} src="./img/spin.gif"></img></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="waltab">
                        <div className='walsec'>
                            <div className="top ">
                                <span className="fs-18">
                                    Stake INFO and earn a portion of the profits generated by the game
                                </span>
                                <img alt="" className="avimg" src="./img/smalllogo.png"></img>
                            </div>
                            <div className="poolinfo">
                                <div className="farm">
                                    <p className="t-g txt-c fs-16 m-t-30 m-b-20">Info Tokens staked:</p>
                                    <p className="txt-c fs-20 fw-600  m-t-0 m-b-0">{numberWithCommas(parseFloat(this.state.stakedBal).toFixed(3))} INFO</p>
                                    <p className={this.state.profitcol + ` fs-14 txt-c m-t-5`}>Profit: {numberWithCommas((this.state.profit).toFixed(3))} INFO</p>
                                    <button onClick={this.toggleStakeModal} className="stakebtn bl m-l-auto m-r-auto m-t-30">Stake</button>
                                    <br />
                                    <button onClick={this.toggleUnstakeModal} className={"stakebtn gr m-l-auto m-r-auto m-b-20 " + this.state.isStaking}>Unstake</button>
                                </div>
                                <div className="stats">
                                    <h4 className="txt-c fs-18 fw-600">Stats</h4>
                                    <p className="t-g txt-c">INFO staked:  <span className="fw-600 t-b">{numberWithCommas(parseFloat(this.state.gameBal).toFixed(3))}</span></p>
                                    <p className="t-g txt-c">Total games played:  <span className="fw-600 t-b">{this.state.gameID}</span></p>
                                    <p className="t-g txt-c">INFO wagered:  <span className="fw-600 t-b">{numberWithCommas(parseFloat(this.state.wagered).toFixed(3))}</span></p>
                                    <p className="t-g txt-c">INFO won:  <span className="fw-600 t-b">{numberWithCommas(parseFloat(this.state.totalWon).toFixed(3))}</span></p>
                                </div>
                            </div>
                        </div>
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
                            Stake INFO
                        </div>
                    </div>
                    <div className="cont p-l-15 p-r-15">
                        <p className="txt-r fs-14 t-bl c-pointer" onClick={this.handleMaxStake}>Balance: {numberWithCommas(parseFloat(this.state.InfoBal).toFixed(2))} INFO</p>
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
                        <p className="m-b-20 fs-15">Initial Investmet: <span className="fw-600 t-bl">{numberWithCommas(parseFloat(this.state.originalBal).toFixed(2))} INFO</span></p>
                        <p className="m-b-20 fs-15">Currently Staked: <span className="fw-600 t-bl">{numberWithCommas(parseFloat(this.state.stakedBal).toFixed(2))} INFO</span></p>
                        <p className="m-b-30 fs-15">Profit: <span className={"fw-600 " + this.state.profitcol}>{numberWithCommas(parseFloat(this.state.profit).toFixed(2))} INFO</span></p>
                        <button onClick={this.handleStakeTx} disabled={this.state.disabled} className={"stakebtn btn big bl m-l-auto m-r-auto m-t-30 " + this.state.stakeBtn}>{this.state.stakeBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.stakeBtn} src="./img/spin.gif"></img></button>
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
                            Unstake INFO
                        </div>
                    </div>
                    <div className="cont p-l-15 p-r-15">
                        <p className="txt-r fs-14 t-bl c-pointer" onClick={this.handleMaxUnstake}>Staked: {numberWithCommas(parseFloat(this.state.stakedBal).toFixed(2))} INFO</p>
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
                        <p className="m-b-20 fs-15">Unstake: <span className="fw-600 t-bl">{WithdrawFigureOuter(this.state.newStake, this.state.profit, this.state.stakedBal)[0]} INFO</span></p>
                        <p className="m-b-30 fs-15">Burn: <span className={"fw-600 t-or"}>{WithdrawFigureOuter(this.state.newStake, this.state.profit, this.state.stakedBal)[1]} INFO</span></p>
                        <button disabled={this.state.disabled} onClick={this.handleUnstakeTx} className={"stakebtn btn big bl m-l-auto m-r-auto m-t-30 " + this.state.unstakeBtn}>{this.state.unstakeBtn}<img alt="" className={"txwait ab-r-m m-r-10 " + this.state.unstakeBtn} src="./img/spin.gif"></img></button>
                    </div>
                </div>
                <div onClick={this.toggleUnstakeModal} className={"modal-overlay " + this.state.unstakeModal}></div>
            </div>
        );
    }
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function WithdrawFigureOuter(withd, profit, staked) {
    var x = []
    if (profit > 0) {
        x[0] = numberWithCommas(parseFloat((withd) - (((profit) * (withd / staked) * 0.05))).toFixed(2));
        x[1] = numberWithCommas(parseFloat((profit) * (withd / staked) * 0.05).toFixed(2))
    }
    else {
        x[0] = numberWithCommas((withd * 0.95).toFixed(2));
        x[1] = numberWithCommas((withd - (withd * 0.95)).toFixed(2));
    }

    return x
}


export default Game;
