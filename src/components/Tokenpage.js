import React from 'react'
import Loader from './Loader';
import Calculator from './subcomponents/Calculator';
import Tokenlinks from './subcomponents/Tokenlinks';
import Tokenpairs from './subcomponents/Tokenpairs';
import Bigchart from './subcomponents/Bigchart';
import Changes from './subcomponents/Changes';

export default class Tokens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            link: props.match.params.id,
            symbol: props.match.params.id.replace(/_/g, ' '),
            data: [],
            inp1: "",
            inp2: "",
            allHistData: {},
            chartData: [],
            chartCol: "",
            timeframe: 3600,
            now: parseInt(Math.floor(new Date().getTime() / 1000.0)),
            cns: ["", "active", "", "", "", ""]
        };
    }
    

    componentDidMount() {
        Promise.all([
            fetch('https://kardia-info-backend.herokuapp.com/api').then(res => res.json()),
            fetch(`https://kardia-info-backend.herokuapp.com/api/hist/${this.state.link}`).then(res => res.json())
        ]).then(([urlData, url2Data]) => {
            var d = []
            d.push([...url2Data.weekHist].reverse())
            d = d[0]
            console.log(d)
            var col = getCol(d)
            this.setState({
                isLoaded: true,
                data: urlData,
                allHistData: url2Data,
                chartData: d,
                chartCol: col
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


    dayChart = () => {
        var d = []
        d.push([...this.state.allHistData.dayHist].reverse())
        d = d[0]
        var col = getCol(d)
        this.setState({
            chartData: d,
            chartCol: col,
            timeframe: 900,
            cns: ["active", "", "", "", "", ""]
        })
    }
    weekChart = () => {
        var d = []
        d.push([...this.state.allHistData.weekHist].reverse())
        d = d[0]
        var col = getCol(d)
        this.setState({
            chartData: d,
            chartCol: col,
            timeframe: 3600,
            cns: ["", "active", "", "", "", ""]
        })
    }
    monthChart = () => {
        var d = []
        d.push([...this.state.allHistData.monthHist].reverse())
        d = d[0]
        var col = getCol(d)
        this.setState({
            chartData: d,
            chartCol: col,
            timeframe: 14400,
            cns: ["", "", "active", "", "", ""]
        })
    }
    sixMonthChart = () => {
        var d = []
        d.push([...this.state.allHistData.sixMonthHist].reverse())
        d = d[0]
        var col = getCol(d)
        this.setState({
            chartData: d,
            chartCol: col,
            timeframe: 86400,
            cns: ["", "", "", "active", "", ""]
        })
    }
    yearChart = () => {
        var d = []
        d.push([...this.state.allHistData.yearHist].reverse())
        d = d[0]
        var col = getCol(d)
        this.setState({
            chartData: d,
            chartCol: col,
            timeframe: 86400,
            cns: ["", "", "", "", "active", ""]
        })
    }
    allChart = () => {
        var d = []
        d.push([...this.state.allHistData.allHist].reverse())
        d = d[0]
        var col = getCol(d)
        this.setState({
            chartData: d,
            chartCol: col,
            timeframe: 604800,
            cns: ["", "", "", "", "", "active"]
        })
    }


    render() {
        const { error, isLoaded, data, symbol, chartData, now } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <Loader />;
        }
        else {
            console.log(chartData)
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
                    <div className="section top charttitle">
                        <h2 className="fs-16 p-l-12">Chart</h2>
                        <div className="btns ">
                            <button className={this.state.cns[0]} onClick={this.dayChart}>1D</button>
                            <button className={this.state.cns[1]} onClick={this.weekChart}>1W</button>
                            <button className={this.state.cns[2]} onClick={this.monthChart}> 1M</button>
                            <button className={this.state.cns[3]} onClick={this.sixMonthChart}>6M</button>
                            <button className={this.state.cns[4]} onClick={this.yearChart}>1Y</button>
                            <button className={this.state.cns[5]} onClick={this.allChart}>All</button>
                        </div>
                    </div>
                    <div className="section">
                        <br />
                        <Bigchart histData={this.state.chartData} time={this.state.timeframe} col={this.state.chartCol} now={now} />
                        <br />
                    </div>
                    <Changes data={this.state.allHistData} tkn={token}/>
                    <Tokenpairs token={token} tokens={tokens} cn="nopad" />
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
                    <div className="section op charttitle">
                        <h2 className="fs-16 p-l-12">Chart</h2>
                        <div className="btns">
                            <button className={this.state.cns[0]} onClick={this.dayChart}>1D</button>
                            <button className={this.state.cns[1]} onClick={this.weekChart}>1W</button>
                            <button className={this.state.cns[2]} onClick={this.monthChart}> 1M</button>
                            <button className={this.state.cns[3]} onClick={this.sixMonthChart}>6M</button>
                            <button className={this.state.cns[4]} onClick={this.yearChart}>1Y</button>
                            <button className={this.state.cns[5]} onClick={this.allChart}>All</button>
                        </div>
                    </div>
                    <div className="section op">
                        <br/>
                        <Bigchart histData={this.state.chartData} time={this.state.timeframe} col={this.state.chartCol} now={now} />
                        <br/>
                    </div>
                    <Changes cn="op" data={this.state.allHistData} tkn={token}/>
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
                    <Tokenlinks id={token.id} website={token.website} chat={token.chat} />
                    <Calculator symbol={token.symbol} price={token.price} />
                    <Tokenpairs token={token} tokens={tokens} cn="op nopad" />
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

function getCol(arr) {
    var col = ""
    if (parseFloat(arr[0]) > arr[arr.length - 1]) {
        col = "#ea3943"
    }
    else if (parseFloat(arr[0]) < arr[arr.length - 1]) {
        col = "#16c784"
    }
    else {
        col = "#16c784"
    }
    return (col)
}