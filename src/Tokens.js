import React from 'react'
import Loader from './components/Loader';
import Smallchart from './components/Smallchart';
import Td from './components/subcomponents/Td';

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
    document.title =  `Tokens - Kardia info`;
    Promise.all([
      fetch('https://api.kardiainfo.com/tokens').then(res => res.json())
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
          else if (tokens[i].histData[0] < tokens[i].histData[tokens[i].histData.length - 1]) {
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
        let link = `/tokens/${tokens[i].symbol.replace(/\s+/g, '_')}`
        table.push(
          <tr key={i} className="table-row">
            <Td cn="numtd trans-0-2 psnu" to={link}>
              <span className="txt-l fw-400 t-lg fs-14 ">{i + 1}</span>
            </Td>
            <Td cn="logotd trans-0-2 pslo" to={link}>
              <img alt={tokens[i].name} className="tokenlogo ab-c-m" src={tokens[i].logo} />
            </Td>
            <Td cn="psnam trans-0-2" to={link}>
              <span className="fs-14">{tokens[i].name}</span>
              <br />
              <span className="fs-12 t-s fw-400">{tokens[i].symbol}<span className="pd fs-12 t-s fw-400"> - Tvl: ${abbreviateNumber(tokens[i].tvl)}</span></span>
            </Td>
            <Td to={link} cn="txt-r charttdd fw-400 fs-14 pd ">
              <Smallchart histData={every_nth(histData[i], 4)} weekChange={tokens[i].weekChange} col={chartCol[i]} />
            </Td>
            <Td to={link} cn="txt-r pricetd fs-14">
              <span>${parseFloat(tokens[i].price).toPrecision(4)}</span>
              <br className="pdd" />
              <span className={"txt-r pctd fw-400 fs-12 pd " + dayCol[i]}>{parseFloat(tokens[i].dayChange).toFixed(2)}%</span>
            </Td>
            <Td to={link} cn={"txt-r pctd pdn "}><span className={"fw-400 fs-14 pdn " + dayCol[i]}>{parseFloat(tokens[i].dayChange).toFixed(2)}%</span></Td>
            <Td to={link} cn={"txt-r pctd pdn "}><span className={"fw-400 fs-14 pdn " + weekCol[i]}>{parseFloat(tokens[i].weekChange).toFixed(2)}%</span></Td>
            <Td to={link} cn="txt-r pricetd pdn "><span className="fw-400 fs-14 pdn ">${numberWithCommas(tokens[i].tvl.toFixed(2))}</span></Td>
            <Td to={link} cn="txt-r suptd pdn "><span className="fw-400 fs-14 pdn ">{abbreviateNumber(tokens[i].supply)}</span></Td>
            <Td to={link} cn="txt-r charttd pdn "><Smallchart histData={every_nth(histData[i], 3)} weekChange={tokens[i].weekChange} col={chartCol[i]} /></Td>
          </tr>

        )
      }
      return (
        <div>
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
        </div>
      )
    }
  }
}

