import React from 'react'
import Loader from './Loader';
import Smallchart from './Smallchart';
import Td from './subcomponents/Td';

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
            function numberWithCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            console.log(tokens)
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i].symbol === symbol) {
                    token = tokens[i];
                    break;
                }
            }

        }
        return (
            <img src={token.logo}></img>
        )
    }
}

