import Blockies from 'react-blockies';
import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

export default class Tokens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            wallet: props.match.params.id,
            kaibal: 0,
            tokens: [],
            tokensbal: [],
            icon: ""
        };
    }


    componentDidMount() {
        Promise.all([
            fetch('https://api.kardiainfo.com/tokens').then(res => res.json()),
            fetch(`https://backend.kardiachain.io/api/v1/addresses/${this.state.wallet}/tokens`).then(res => res.json()),
            fetch(`https://backend.kardiachain.io/api/v1/addresses/${this.state.wallet}`).then(res => res.json())
        ]).then(([urlData, url2Data, url3Data]) => {
            document.title = `Wallet - Kardia info`;

            this.setState({
                isLoaded: true,
                tokens: urlData.tokens,
                tokensbal: url2Data.data.data,
                kaibal: parseFloat(url3Data.data.balance)
            });
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <Loader />;
        }
        else {
            if (this.state.tokensbal === null && this.state.kaibal === 0) {
                return (
                    <div className="p-t-20 p-l-20 p-r-20">
                        This seems to be an invalid wallet
                        <br />
                        <br />
                        <Link className="t-bl t-d-none" to="/wallet">Click here to try again</Link>
                    </div>
                )
            }
            else {
                var wal = this.state.wallet.substring(0, 5) + "..." + this.state.wallet.slice(this.state.wallet.length - 3);
                var assets = []
                var total = 0
                for (let i = 0; i < this.state.tokens.length; i++) {
                    if (this.state.tokens[i].id === "0xAF984E23EAA3E7967F3C5E007fbe397D8566D23d") {
                        var obj = {
                            name: "KardiaChain",
                            logo: "https://api.kardiainfo.com/images/KAI.png",
                            symbol: "KAI",
                            balance: parseFloat(this.state.kaibal / 10 ** 18),
                            usd: this.state.kaibal / 10 ** 18 * this.state.tokens[i].price
                        }
                        assets.push(obj)
                        total = total + obj.usd
                        break;
                    }
                }
                for (let i = 0; i < this.state.tokensbal.length; i++) {
                    for (let b = 0; b < this.state.tokens.length; b++) {
                        if (this.state.tokensbal[i].contractAddress.toLowerCase() === this.state.tokens[b].id.toLowerCase() && this.state.tokensbal[i].balance != 0) {
                            obj = {
                                name: this.state.tokensbal[i].tokenName,
                                logo: this.state.tokens[b].logo,
                                symbol: this.state.tokensbal[i].tokenSymbol,
                                balance: this.state.tokensbal[i].balance / 10 ** this.state.tokensbal[i].tokenDecimals,
                                usd: this.state.tokens[b].price * this.state.tokensbal[i].balance / 10 ** this.state.tokensbal[i].tokenDecimals
                            }
                            assets.push(obj)
                            total = total + obj.usd
                        }
                    }
                }
                assets.sort((a, b) => {
                    return b.usd - a.usd;
                });
                var table = []
                for (let i = 0; i < assets.length; i++) {
                    if (assets[i].balance < 1) {
                        assets[i].balance = assets[i].balance.toPrecision(4)
                    }
                    else if (assets[i].balance > 10000) {
                        assets[i].balance = abbbr(assets[i].balance, 3)
                    }
                    else {
                        assets[i].balance = numberWithCommas(assets[i].balance.toFixed(2))
                    }
                    table.push(
                        <div key={i} className="asset">
                            <div className="l">
                                <span className="fs-12 t-g m-l-12 m-r-12">{i + 1}</span>
                                <div className="assetname">
                                    <img alt="logo" className="tokenlogo m-l-12 m-r-12" src={assets[i].logo} />
                                    <div>
                                        <p className="fs-14 m-b-5 m-t-8">{assets[i].name}</p>
                                        <p className="fs-12 t-s fw-400 m-t-5 m-b-8">Bal: {assets[i].balance} {assets[i].symbol}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="r fs-14">
                                ${assets[i].usd.toFixed(6)}
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="waltab">
                        <div className="walsec">
                            <div className="top">
                                <div className="l">
                                    <Blockies
                                        seed={this.state.wallet}
                                        size={10}
                                        scale={4}
                                        className="identicon m-r-15"
                                    />
                                    {wal}
                                </div>
                                <div className="r p-l-25 p-t-14 p-b-14">
                                    {"$" + total.toFixed(2)}
                                </div>
                            </div>
                            {table}
                        </div>
                    </div>
                )
            }
        }
    }
}

const abbbr = function (num, fixed) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(4).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
    return e;
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}