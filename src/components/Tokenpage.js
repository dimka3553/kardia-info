import React from 'react'
import Loader from './Loader';
import Calculator from './subcomponents/Calculator';
import Tokenlinks from './subcomponents/Tokenlinks';
import Tokenpairs from './subcomponents/Tokenpairs';

export default class Tokens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            symbol: props.match.params.id.replace(/_/g, ' '),
            data: [],
            inp1: "",
            inp2: ""
        };
    }

    componentDidMount() {
        Promise.all([
            fetch('https://kardia-info-backend.herokuapp.com/api').then(res => res.json())
        ]).then(([urlData]) => {
            this.setState({
                isLoaded: true,
                data: urlData
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
        const { error, isLoaded, data, symbol } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <Loader />;
        }
        else {
            var tokens = data.tokens;
            var token = {}
            var kai = {}
            var dayCol = ""
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].symbol.toLowerCase() === symbol.toLowerCase()) {
                    token = tokens[i];
                }
                if (tokens[i].symbol.toLowerCase() === 'kai') {
                    kai = tokens[i];
                }
            }
            if (token.dayChange < 0) {
                dayCol = 't-red'
            }
            else if (token.dayChange === 0) {
                dayCol = 't-grey'
            }
            else if (token.dayChange > 0) {
                dayCol = 't-green'
            }
            else {
                dayCol = 't-grey'
            }
            var high = token.price;;
            var low = token.price;
            for (let i = 0; i < 25; i++) {
                if (token.histData[i] > high) {
                    high = token.histData[i]
                }
                if (token.histData[i] < low) {
                    low = token.histData[i]
                }
            }


        }
        return (
            <div className="tokenpage">
                <div className="box left">
                    <div className="section top">
                        graph
                    </div>
                    <div className="section">
                        price changes
                    </div>
                    <Tokenpairs token={token} tokens={tokens} cn="nopad"/>
                </div>

                <div className="box right">
                    <div className="section top tokeninfo">
                        <div className="tokn p-t-8 p-b-8">
                            <img className="tok-p-logo" alt={token.name} src={token.logo}></img>
                            <span className="p-l-8"><span className="p-r-8">{token.name}</span><span className=" t-g fw-400 fs-12"> {token.symbol}</span></span>
                        </div>
                        <div className="tokp p-t-8 p-b-8">
                            <span className="fw-700">${parseFloat(token.price).toPrecision(4)}</span>
                            <span className={"fe p-l-8 fs-14 " + dayCol}>{parseFloat(token.dayChange).toFixed(2)}%</span>
                        </div>
                    </div>
                    <div className="section op">
                        graph
                    </div>
                    <div className="section op">
                        price changes
                    </div>
                    <div className="section infosec">
                        <div className="smallsec">
                            <p>
                                <span className="fs-12 t-g fw-400">Open </span>
                                <span className="fs-12 p-l-20">${parseFloat(token.histData[24]).toPrecision(4)}</span>
                            </p>
                            <p>
                                <span className="fs-12 t-g fw-400">High </span>
                                <span className="fs-12 p-l-20">${parseFloat(high).toPrecision(4)}</span>
                            </p>
                            <p>
                                <span className="fs-12 t-g fw-400">Low </span>
                                <span className="fs-12 p-l-20">${parseFloat(low).toPrecision(4)}</span>
                            </p>
                        </div>
                        <div className="smallsec bl">
                            <p>
                                <span className="fs-12 t-g fw-400">Mcap </span>
                                <span className="fs-12 p-l-20">${abbreviateNumber(token.mcap, 1)}</span>
                            </p>
                            <p>
                                <span className="fs-12 t-g fw-400">TVL </span>
                                <span className="fs-12 p-l-20">${abbreviateNumber(token.tvl, 1)}</span>
                            </p>
                            <p>
                                <span className="fs-12 t-g fw-400">Supply </span>
                                <span className="fs-12 p-l-20">{abbreviateNumber(token.supply, 1)}</span>
                            </p>
                        </div>
                        <div className="smallsec bl">
                            <p>
                                <span className="fs-12 t-g fw-400">KAI Pr </span>
                                <span className="fs-12 p-l-20">{(parseFloat(token.price) / parseFloat(kai.price)).toPrecision(4)}</span>
                            </p>
                        </div>
                    </div>
                    <Tokenlinks id={token.id} website={token.website} chat={token.chat}/>
                    <Calculator symbol={token.symbol} price={token.price} />
                    <Tokenpairs token={token} tokens={tokens} cn="op nopad"/>
                </div>
            </div>
        )
    }
}

const abbreviateNumber = function (num, fixed) {
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