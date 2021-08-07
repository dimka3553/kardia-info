import React from 'react'
import Loader from './components/Loader';

export default class Tokens extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data1: [],
      data2: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('https://backend.kardiachain.io/api/v1/contracts?page=1&limit=100&type=KRC20&status=Verified').then(res => res.json()),
      fetch('https://api.info.kaidex.io/api/tokens').then(res => res.json()),
      fetch('https://backend.kardiachain.io/api/v1/dashboard/token').then(res => res.json())
    ]).then(([urlOneData, urlTwoData, urlThreeData]) => {
      this.setState({
        isLoaded: true,
        data1: urlOneData,
        data2: urlTwoData,
        data3: urlThreeData
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
    const { error, isLoaded, data1, data2, data3 } = this.state;
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
      var contracts1 = []
      var contracts2 = [];
      var table = [];
      var combinedVal = 0;

      var tokens = [];


      for (let i = 0; i < data1.data.data.length; i++) {
        contracts1[i] = data1.data.data[i].address;
      }
      contracts2 = Object.keys(data2.data);

      for (let i = 0; i < contracts2.length; i++) {
        for (let b = 0; b < contracts1.length; b++) {
          if (contracts2[i] === contracts1[b]) {
            var tokenobj = {}
            tokenobj.contract = contracts2[i];
            tokenobj.logo = data1.data.data[b].logo;
            tokenobj.name = data1.data.data[b].name;
            tokenobj.symbol = data1.data.data[b].tokenSymbol;
            tokenobj.price = Object.entries(data2.data)[i][1].price;
            tokenobj.supply = data1.data.data[b].totalSupply / 10 ** data1.data.data[b].decimal;
            if (tokenobj.symbol === "WKAI") { tokenobj.name = "KardiaChain"; tokenobj.supply = data3.data.erc20_circulating_supply + data3.data.mainnet_circulating_supply; tokenobj.symbol = "KAI" };
            if (tokenobj.symbol === "KUSD-T") { tokenobj.price = 1 };
            tokenobj.mcap = tokenobj.supply * tokenobj.price;
            combinedVal = combinedVal + tokenobj.mcap;
            tokens.push(tokenobj)
            break;
          }
        }
      }
      tokens.sort((a, b) => {
        return b.mcap - a.mcap;
      });
      for (let i = 0; i < tokens.length; i++) {
        table.push(
          <tr key={i} className="table-row">
            <td className="txt-l fw-400 t-lg fs-14 numtd">{i + 1}</td>
            <td className="logotd"><img alt={tokens[i].name} className="tokenlogo ab-c-m" src={tokens[i].logo} /></td>
            <td>
              <span className="fs-14">{tokens[i].name}</span>
              <br />
              <span className="fs-12 t-s fw-400">{tokens[i].symbol}</span>
            </td>
            <td className="txt-r pricetd fs-14">${parseFloat(tokens[i].price).toPrecision(4)}</td>
            <td className="txt-r pricetd fs-14">{abbreviateNumber(tokens[i].supply)}</td>
            <td className="txt-r pricetd fs-14">${abbreviateNumber(tokens[i].mcap)}</td>
          </tr>
        )
      }
      return (
        <div>
          <h3 className="m-t-10 m-b-20 mobt-l">KRC-20 Tokens:</h3>
          <table className="w-full" id="table">
            <thead>
              <tr>
                <th className="txt-l fs-12 c-ab">#</th>
                <th className="txt-l fs-12 c-ab" colSpan="2">Name</th>
                <th className="txt-r fs-12 c-ab">Price</th>
                <th className="txt-r fs-12 c-ab">Supply</th>
                <th className="txt-r fs-12 c-ab">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {table}
            </tbody>
          </table>
          <h4 className="m-t-25 m-b-15 txt-r mobt-r">Combined Market Cap: ${numberWithCommas(combinedVal.toFixed(2))}</h4>
          {console.log(table)}
        </div>
      )
    }
  }
}

