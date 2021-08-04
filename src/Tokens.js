import React from 'react'

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
        ]).then(([urlOneData, urlTwoData,urlThreeData]) => {
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
        return <div>Loading...</div>;
      }
      else {  
        const abbreviateNumber = function(num, fixed) {
          if (num === null) { return null; } // terminate early
          if (num === 0) { return '0'; } // terminate early
          fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
          var b = (num).toPrecision(4).split("e"), // get power
              k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
              c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
              d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
              e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
          return e;
        }

        var contracts1 = []
        var contracts2 = [];
        var logos = [];
        var names = [];
        var symbols = [];
        var prices = [];
        var supplies = [];
        var mcaps = [];
        var table = [];

        for(let i=0; i<data1.data.data.length; i++){
          contracts1[i]=data1.data.data[i].address;
        } 
        contracts2 = Object.keys(data2.data);

        for(let i=0;i<contracts2.length;i++){
          for(let b = 0; b<contracts1.length; b++){
            if(contracts2[i]===contracts1[b]){
              logos[i]=data1.data.data[b].logo;
              names[i]=data1.data.data[b].name;
              symbols[i]=data1.data.data[b].tokenSymbol;
              prices[i]=Object.entries(data2.data)[i][1].price;
              prices[i]=parseFloat(prices[i]).toPrecision(4);
              supplies[i]=data1.data.data[b].totalSupply/10**data1.data.data[b].decimal;
              if (symbols[i]==="WKAI"){names[i]="KardiaChain";supplies[i]=data3.data.erc20_circulating_supply+data3.data.mainnet_circulating_supply;symbols[i]="KAI"};
              if (symbols[i]==="KUSD-T"){prices[i]=1};
              mcaps[i]=supplies[i]*prices[i];
              supplies[i]=abbreviateNumber(parseFloat(supplies[i], 4))
              mcaps[i]=abbreviateNumber(parseFloat(mcaps[i], 4))
              
            }
          }
        }
        for(let i=0;i<names.length;i++){
          table.push(
            <div key={i} className="tablediv">
              <img alt={names[i]} className="tokenlogo" src={logos[i]}/>
              <span>{names[i]}   </span>
              <span>{symbols[i]}   </span>
              <span>${prices[i]}   </span>
              <span>{supplies[i]}   </span>
              <span>${mcaps[i]}   </span>
            </div>
          )
        }
        return (
            <div>
                {table}
            </div>
        )
      }
    }
  }

