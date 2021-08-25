import React from 'react'
import Loader from './components/Loader';
import Pairimg from './components/subcomponents/Pairimg';

export default class Lps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentDidMount() {
        Promise.all([
            fetch('https://api.kardiainfo.com/lps').then(res => res.json())
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
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <Loader />;
        }
        else {
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
                if (x > 1000) {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                else {
                    return x
                }
            }

            var lps = data.lps
            var table = [];

            for (let i = 0; i < lps.length; i++) {
                let link = `/lps/${lps[i].name.replace(/\s+/g, '_')}`
                table.push(
                    <tr key={i}>
                        <td className="fs-12 txt-l p-l-8 p-r-8 t-g">
                            {i + 1}
                        </td>
                        <td>
                            <Pairimg img1={lps[i].token1.logo} img2={lps[i].token2.logo}/>
                        </td>
                        <td className="fs-14 p-l-8 p-r-8">
                            {lps[i].name}
                        </td>
                        <td className="fs-14 txt-r p-l-8 p-r-8">
                            ${abbreviateNumber(lps[i].price, 3)}
                        </td>
                        <td className="fs-14 txt-r p-l-8 p-r-8">
                            ${numberWithCommas(parseFloat(lps[i].tvl).toFixed(0))}
                        </td>
                        <td className="fs-14 txt-r p-l-8 p-r-8">
                            {lps[i].supply.toFixed(18)}
                        </td>
                    </tr>
                )
            }
            return (
                <div>
                    <table className="w-full" id="table">
                        <thead className="">
                            <tr className="">
                                <th className="txt-l fs-12 c-ab pdn">#</th>
                                <th className="txt-l fs-12 c-ab pdn " colSpan="2">Name</th>
                                <th className="txt-r fs-12 c-ab pdn ">Price</th>
                                <th className="txt-r fs-12 c-ab pdn ">TVL</th>
                                <th className="txt-r fs-12 c-ab pdn ">Supply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

