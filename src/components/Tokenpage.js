import React from 'react'
import Loader from './Loader';

export default class Tokens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            symbol: props.match.params.id.replace(/_/g, ' '),
            data: []
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
            var dayCol = ""
            console.log(tokens)
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].symbol.toLowerCase() === symbol.toLowerCase()) {
                    token = tokens[i];
                    break;
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
                    <div className="section">
                        Pairs:
                    </div>
                    <div className="section">
                        pairs
                    </div>
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
                    <div className="section">
                        <div>mcap supply</div>
                        <div>volume tvl</div>
                        <div>day c week c</div>
                    </div>
                    <div className="section">
                        <div>Trade on kaidex</div>
                        <div>View Website</div>
                    </div>
                    <div className="section">
                        <div>calculator</div>
                    </div>
                    <div className="op section">
                        Pairs:
                    </div>
                    <div className="op section">
                        pairs
                    </div>
                </div>
            </div>
        )
    }
}

