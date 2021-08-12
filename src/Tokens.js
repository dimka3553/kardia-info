import React from 'react'
import Loader from './components/Loader';
import Smallchart from './components/Smallchart';

export default class Tokens extends React.Component {
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
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      var table = [];
      var combinedVal = 0;

      var tokens = [];
      var dayCol = [];
      var weekCol = [];
      var histData = [];
      var chartCol = [];

      tokens = data.tokens;
      tokens.sort((a, b) => {
        return b.tvl - a.tvl;
      });

      for (let i = 0; i < tokens.length; i++) {
        combinedVal = combinedVal + tokens[i].tvl;
        if (tokens[i].dayChange < 0) {
          dayCol[i] = 't-red'
        }
        else if (tokens[i].dayChange === 0) {
          dayCol[i] = 't-grey'
        }
        else if (tokens[i].dayChange > 0) {
          dayCol[i] = 't-green'
        }
        else {
          dayCol[i] = 't-grey'
        }
        if (tokens[i].weekChange < 0) {
          weekCol[i] = 't-red'
          chartCol[i] = '#ea3943'
        }
        else if (tokens[i].weekChange === 0) {
          weekCol[i] = 't-grey'
          chartCol[i] = '#666666'
        }
        else if (tokens[i].weekChange > 0) {
          weekCol[i] = 't-green'
          chartCol[i] = '#16c784'
        }
        else {
          weekCol[i] = 't-grey'
          if (tokens[i].histData[0] > tokens[i].histData[tokens[i].histData.length - 1]) {
            chartCol[i] = '#16c784'
          }
          else if (tokens[i].histData[0] > tokens[i].histData[tokens[i].histData.length - 1]) {
            chartCol[i] = '#ea3943'
          }
          else {
            chartCol[i] = '#666666'
          }
        }
        histData.push([...tokens[i].histData].reverse())
      }
      const every_nth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);


      for (let i = 0; i < tokens.length; i++) {
        table.push(
          <tr key={i} className="table-row">
            <td className="txt-l fw-400 t-lg fs-14 numtd trans-0-2 psnu">{i + 1}</td>
            <td className="logotd trans-0-2 pslo"><img alt={tokens[i].name} className="tokenlogo ab-c-m" src={tokens[i].logo} /></td>
            <td className="psnam trans-0-2">
              <span className="fs-14">{tokens[i].name}</span>
              <br />
              <span className="fs-12 t-s fw-400">{tokens[i].symbol}<span className="pd fs-12 t-s fw-400"> - Tvl: ${abbreviateNumber(tokens[i].tvl)}</span></span>
            </td>
            <td className="txt-r charttdd fw-400 fs-14 pd "><Smallchart histData={every_nth(histData[i], 4)} weekChange={tokens[i].weekChange} col={chartCol[i]} /></td>
            <td className="txt-r pricetd fs-14">${parseFloat(tokens[i].price).toPrecision(4)}
              <br className="pdd" />
              <span className={"txt-r pctd fw-500 fs-12 pd " + dayCol[i]}>{parseFloat(tokens[i].dayChange).toFixed(2)}%</span>
            </td>
            <td className={"txt-r pctd fw-400 fs-14 pdn " + dayCol[i]}>{parseFloat(tokens[i].dayChange).toFixed(2)}%</td>
            <td className={"txt-r pctd fw-400 fs-14 pdn " + weekCol[i]}>{parseFloat(tokens[i].weekChange).toFixed(2)}%</td>
            <td className="txt-r pricetd fw-400 fs-14 pdn ">${numberWithCommas(tokens[i].tvl.toFixed(2))}</td>
            <td className="txt-r suptd fw-400 fs-14 pdn ">{abbreviateNumber(tokens[i].supply)}</td>
            <td className="txt-r charttd fw-400 fs-14 pdn "><Smallchart histData={every_nth(histData[i], 3)} weekChange={tokens[i].weekChange} col={chartCol[i]} /></td>
          </tr>
        )
      }
      return (
        <table className="w-full" id="table">
          <thead className="">
            <tr className="">
              <th className="txt-l fs-12 c-ab pdn psnu">#</th>
              <th className="txt-l fs-12 c-ab pdn psna" colSpan="2">Name</th>
              <th className="txt-r fs-12 c-ab pdn" colSpan="2">Price</th>
              <th className="txt-r fs-12 c-ab pdn">24h%</th>
              <th className="txt-r fs-12 c-ab pdn">7d%</th>
              <th className="txt-r fs-12 c-ab pdn">TVL</th>
              <th className="txt-r fs-12 c-ab pdn">Supply</th>
              <th className="txt-r fs-12 c-ab pdn">7d Chart</th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </table>
      )
    }
  }
}

