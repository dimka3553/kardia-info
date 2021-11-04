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
            InfoBal: "Loading",
            approved: null,
            gameBal: "Loading",
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
            profit:0,
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
            this.setState({ multiplier: 4750, winnings: (4750 * this.state.wager).toFixed(4), hi: "> 9998", lo: "< 2" }, () => {
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
            }, () => {
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
            }, () => {
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
            this.setState({ multiplier: 1.01, winnings: (1.01 * this.state.wager).toFixed(4), hi: "> 594", lo: "< 9406" }, () => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else if (event.target.value > 4750) {
            this.setState({ multiplier: 4750, winnings: (4750 * this.state.wager).toFixed(4), hi: "> 9998", lo: "< 2" }, () => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else if (event.target.value <= 4750 && event.target.value >= 1.01) {
            this.setState({ multiplier: event.target.value, winnings: (event.target.value * this.state.wager).toFixed(4) }, () => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else {
            this.setState({ multiplier: 2, winnings: (2 * this.state.wager).toFixed(4), hi: "> 5250", lo: "< 4750" }, () => {
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
            if (this.state.InfoBal < 0.0001) {
                alert('Please buy INFO to play')
            }
            else {
                var wager = this.state.web3.utils.toWei(this.state.wager.toString(), 'ether');
                this.setState({ tr: "hi" })
                await this.state.game.methods.play(1, (Math.round(this.state.multiplier * 100)), wager).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "", hasPlayed: true })
                }.bind(this)).then(
                    event = {
                        target: {
                            value: this.state.wager
                        }
                    },
                    this.handleBetMaths(event)
                )
            }
        }
        else {
            if (this.state.accounts[0] === "0x0000000000000000000000000000000000000000") {
                alert('please install the KAI wallet to play')
            }
            else {
                this.setState({ tr: "appr" })
                await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
    async handleLow(event) {
        if (this.state.approved === true) {
            if (this.state.InfoBal < 0.0001) {
                alert('Please buy INFO to play')
            }
            else {
                this.setState({ tr: "lo" })
                var wager = this.state.web3.utils.toWei(this.state.wager.toString(), 'ether');
                console.log(wager)
                await this.state.game.methods.play(0, Math.round(this.state.multiplier * 100), wager).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                    if (error !== undefined && error !== null) {
                        console.log(error)
                        this.setState({ tr: "" })
                    }
                }.bind(this)).then(function () {
                    this.setState({ tr: "", hasPlayed: true })
                }.bind(this)).then(
                    event = {
                        target: {
                            value: this.state.wager
                        }
                    },
                    this.handleBetMaths(event)
                )
            }

        }
        else {
            if (this.state.accounts[0] === "0x0000000000000000000000000000000000000000") {
                alert('please install the KAI wallet to play')
            }
            else {
                this.setState({ tr: "appr" })
                await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
        if (this.state.accounts[0] === "0x0000000000000000000000000000000000000000") {
            alert('please install the KAI wallet to stake')
        }
        else {
            if (this.state.InfoBal < 0.0001) {
                alert('Please buy INFO to stake')
            }
            else {
                if (this.state.newStake !== "") {
                    if (this.state.newStake > this.state.InfoBal) {
                        alert('Please buy more INFO to stake this amount')
                    }
                    else {
                        this.setState({ tr: "st" })
                        if (this.state.approved === true) {
                            var stake = this.state.web3.utils.toWei(this.state.newStake.toString(), 'ether');
                            await this.state.game.methods.stakeTokens(stake).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
                                if (error !== undefined && error !== null) {
                                    console.log(error)
                                    this.setState({ tr: "" })
                                }
                            }.bind(this)).then(function () {
                                this.setState({ tr: "" })
                            }.bind(this))
                        }
                        else {
                            if (this.state.accounts[0] !== "0x0000000000000000000000000000000000000000") {
                                this.setState({ tr: "appr" })
                                await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
        if (this.state.newStake !== "") {
            if (this.state.approved === true) {
                this.setState({ tr: "uns" })
                var stake = this.state.web3.utils.toWei(this.state.newStake.toString(), 'ether');
                await this.state.game.methods.unstakeTokens(stake).send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
                await this.state.token.methods.approve(this.state.gameAddress, "10000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' }, async function (error) {
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
        if (!this.state.web3) {
            window.dispatchEvent(new Event('load'))
        }
        if (this.state.tr === "") {
            try {
                var web3
                if (!this.state.web3) {
                    web3 = await getWeb3();
                }
                else {
                    web3 = this.state.web3
                }

                // Use web3 to get the user's accounts.
                var accounts
                try {
                    accounts = await web3.eth.getAccounts();
                }
                catch (err) {
                    accounts = ["0x0000000000000000000000000000000000000000"]
                }

                const tokenAddress = "0x5FFD7a138422cBbcfB53908AD51F656D7C6c640F";
                const gameAddress = "0x7A848Aa57D9D83b670f1Dd75A71AE1E6BF68E6CC";

                const token = new web3.eth.Contract(tokenABI, tokenAddress);
                const game = new web3.eth.Contract(gameABI, gameAddress);

                this.setState({ game, token, gameAddress, tokenAddress, accounts })

                var info = await getInfo();

                async function getInfo() {
                    var ret = {}
                    if (accounts[0] !== "0x0000000000000000000000000000000000000000") {
                        let [InfoBal, gameBal, allowed, stakedBal, originalBal, gameID, wagered, totalWon, arrayLen] = await Promise.all([
                            token.methods.balanceOf(accounts[0]).call(),
                            token.methods.balanceOf(gameAddress).call(),
                            token.methods.allowance(accounts[0], gameAddress).call(),
                            game.methods.currentBalance(accounts[0]).call(),
                            game.methods.originalBalance(accounts[0]).call(),
                            game.methods.id().call(),
                            game.methods.wagered().call(),
                            game.methods.totalWon().call(),
                            game.methods.gamesPlayed(accounts[0]).call()
                        ])
                        ret = {
                            InfoBal: InfoBal,
                            gameBal: gameBal,
                            allowed: allowed,
                            stakedBal: stakedBal,
                            originalBal: originalBal,
                            gameID: gameID,
                            wagered: wagered,
                            totalWon: totalWon,
                            arrayLen: arrayLen
                        }

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
                    }
                    else {
                        ret = {
                            InfoBal: "0",
                            gameBal: await token.methods.balanceOf(gameAddress).call(),
                            allowed: "0",
                            stakedBal: "0",
                            originalBal: "0",
                            gameID: 1,
                            wagered: await game.methods.wagered().call(),
                            totalWon: await game.methods.totalWon().call(),
                            arrayLen: await game.methods.gamesPlayed('0x0000000000000000000000000000000000000000').call()
                        }

                        if (ret.arrayLen > 0) {
                            ret.lastGame = await game.methods.gameHistory(0, (ret.arrayLen - 1)).call();
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
                if (accounts[0] !== "0x0000000000000000000000000000000000000000") {
                    info.gameres = {
                        bg: "",
                        message: ""
                    }
                }
                else {
                    info.gameres = {
                        bg: "bg-blue",
                        message: <a className="t-bl t-d-none" target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/kardiachain-wallet/pdadjkfkgcafgbceimcpbkalnfnepbnk">Please install the KardiaChain wallet to play</a>
                    }
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
