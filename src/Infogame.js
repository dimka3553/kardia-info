import React, { Component } from "react";
import getWeb3 from "./components/getWeb3";
import Loader from "./components/Loader";
import tokenABI from "./ABI/token.json"
import gameABI from "./ABI/game.json"
import Altlogo from "./components/subcomponents/svgs/Altlogo";


class Infogame extends Component {
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
            winnings: "6.00",
            multiplier: 2,
            wager: 3,
            hi: "Bet High",
            lo: "Bet Low",
            hinum: "> 5250",
            lonum: "< 4750",
            game: null,
            token: null,
            loading: false,
            disabled: false,
            profitcol: "",
            newStake: "",
            stakeBtn: "",
            stakeModal: "",
            unstakeModal: "",
            profit: 0,
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
        this.handleMaxBet = this.handleMaxBet.bind(this);
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
    handleMaxBet() {
        var event = {
            target: {
                value:roundDown(parseFloat(this.state.InfoBal).toFixed(3), 3) 
            }
        }
        this.handleBet(event)
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
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(2) });
            }
            else {
                this.setState({ wager: max, winnings: (max * mul).toFixed(2) });
            }
        }
        else if (inp > 0.0001 && inp < max) {
            if (inp * mul > maxrev) {
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(2) });
            }
            else {
                this.setState({ wager: inp, winnings: (inp * mul).toFixed(2) });
            }
        }
        else {
            this.setState({ wager: inp, winnings: (inp * mul).toFixed(2) });
        }
    }
    handleBetMaths(event) {
        var max = parseFloat(this.state.InfoBal)
        var inp = event.target.value;
        var mul = parseFloat(this.state.multiplier)
        var maxrev = parseFloat(this.state.gameBal) / 10.05

        console.log(inp, max)
        if (inp < 0.0001) {
            this.setState({ wager: 0.0001, winnings: (0.0001 * mul).toFixed(2) });
        }
        else if (inp > max) {
            if (inp * mul > maxrev) {
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(2) });
            }
            else {
                this.setState({ wager: max, winnings: (max * mul).toFixed(4) });
            }
        }
        else {
            if (inp * mul > maxrev) {
                this.setState({ wager: (maxrev / mul).toFixed(4), winnings: (maxrev).toFixed(2) });
            }
            else {
                this.setState({ wager: parseFloat(inp), winnings: (inp * mul).toFixed(2) });
            }
        }
    }
    handleMultiplier(event) {

        var lo = (950000 / (event.target.value * 100)).toFixed(0);
        var hi = 10000 - lo;

        hi = "> " + hi
        lo = "< " + lo

        if (event.target.value > 4750) {
            this.setState({ multiplier: 4750, winnings: (4750 * this.state.wager).toFixed(2) }, () => {
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
                hinum: hi,
                lonum: lo,
                multiplier: event.target.value,
                winnings: (event.target.value * this.state.wager).toFixed(2)
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
                hinum: hi,
                lonum: lo,
                multiplier: event.target.value,
                winnings: (event.target.value * this.state.wager).toFixed(2)
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
            this.setState({ multiplier: 1.01, winnings: (1.01 * this.state.wager).toFixed(2), hinum: "> 594", lonum: "< 9406" }, () => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else if (event.target.value > 4750) {
            this.setState({ multiplier: 4750, winnings: (4750 * this.state.wager).toFixed(2), hinum: "> 9998", lonum: "< 2" }, () => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else if (event.target.value <= 4750 && event.target.value >= 1.01) {
            this.setState({ multiplier: event.target.value, winnings: (event.target.value * this.state.wager).toFixed(2) }, () => {
                event = {
                    target: {
                        value: this.state.wager
                    }
                }
                this.handleBetMaths(event)
            });
        }
        else {
            this.setState({ multiplier: 2, winnings: (2 * this.state.wager).toFixed(2), hinum: "> 5250", lonum: "< 4750" }, () => {
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
                        hi: "Bet High",
                        lo: "Bet Low",
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
                        hinum: hi,
                        lonum: lo,
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
        return (
            <div className="Game">
                <div className="left">
                    <div className="gametab m-b-100">
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
                                        <span className="fs-14 f-ws t-bl c-pointer" onClick={this.handleMaxBet}>Balance: {numberWithCommas(parseFloat(this.state.InfoBal).toFixed(2))} INFO</span>
                                    </div>
                                    <div className="inpboxg">
                                        <input type="number" disabled={this.state.disabled} placeholder="Bet amount" value={this.state.wager} className="gametxtinput betamount fs-16 p-l-12" onBlur={this.handleBetMaths} onChange={this.handleBet}></input>
                                        <img className="ab-r-m m-r-55 smlogimg" src="./img/smalllogo.png" alt=""></img>
                                        <span className="ab-r-m m-r-10 fs-16 f-ws">INFO</span>
                                    </div>
                                </div>

                                <div className="gameinput b m-b-10">
                                    <div className="tophalf m-b-5">
                                        <span className="fs-14 f-ws">Multiplier [ x1.01 → x4750 ]</span>
                                    </div>
                                    <div className="inpboxg">
                                        <input type="number" disabled={this.state.disabled} placeholder="Bet amount" className="gametxtinput betamount fs-16 p-l-12" onChange={this.handleMultiplier} onBlur={this.handleMultiplierMaths} value={this.state.multiplier}></input>
                                    </div>
                                    <div className="gameBtns m-t-20">
                                        <button disabled={this.state.disabled} className={"btn l " + this.state.lo} onClick={this.handleLow}>{this.state.lo} <img alt="" className={"txwait ab-r-m m-r-10 " + this.state.lo} src="./img/spin.gif"></img></button>
                                        <button disabled={this.state.disabled} className={"btn r " + this.state.hi} onClick={this.handleHigh}>{this.state.hi} <img alt="" className={"txwait ab-r-m m-r-10 " + this.state.hi} src="./img/spin.gif"></img></button>
                                    </div>
                                </div>
                                <div className="gamean">
                                    <div>
                                        <p className="f-ws fs-16 t-lg m-t-0 m-b-8">
                                            Low: <span className="f-ws fs-16 t-b ">{this.state.lonum}</span>
                                        </p>
                                        <p className="f-ws fs-16 t-lg m-t-8 m-b-0">
                                            High: <span className="f-ws fs-16 t-b ">{this.state.hinum}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="txt-r fs-13 f-ws t-g m-b-8 m-t-0">Payout if you win</p>
                                        <p className="txt-r fs-24 f-ws m-t-8 m-b-0">{this.state.winnings} <span className="t-s">INFO</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="lnkss">
                                <a rel="noreferrer" className="t-d-none" href="https://docs.kardiainfo.com/info-game" target="_blank"><span className="t-bl m-t-10 t-d-none">Learn the rules</span></a>
                                <a className="t-d-none" href="/game" ><span className="t-bl m-t-10 t-d-none">Play with KAI</span></a>
                            </div>
                        </div>
                        <svg className="ab-c-b svon" width="2169" height="288" viewBox="0 0 2169 288" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M211.815 190.987C770.15 -64.7354 1412.47 -63.1181 1969.51 195.413L2169 288H0L211.815 190.987Z" fill="#E4F2FF" />
                        </svg>
                    </div>
                </div>
                {/* <div className="right">
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
                <div onClick={this.toggleUnstakeModal} className={"modal-overlay " + this.state.unstakeModal}></div>*/}
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// function WithdrawFigureOuter(withd, profit, staked) {
//     var x = []
//     if (profit > 0) {
//         x[0] = numberWithCommas(parseFloat((withd) - (((profit) * (withd / staked) * 0.05))).toFixed(2));
//         x[1] = numberWithCommas(parseFloat((profit) * (withd / staked) * 0.05).toFixed(2))
//     }
//     else {
//         x[0] = numberWithCommas((withd * 0.95).toFixed(2));
//         x[1] = numberWithCommas((withd - (withd * 0.95)).toFixed(2));
//     }

//     return x
// }
function roundDown(number, decimals) {
    decimals = decimals || 0;
    return (Math.floor(number * Math.pow(10, decimals)) / Math.pow(10, decimals));
}

export default Infogame;
