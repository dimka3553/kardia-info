import React from 'react'
import Homebig from './components/Homebig'
import Homesmall from './components/Homesmall'
import Loader from './components/Loader';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }

    componentDidMount() {
        document.title = `Home - Kardia info`;
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
            var tokens = [];
            var dayCol = [];
            var randTks = [];
            var randTks2 = [0];

            tokens = data.tokens;
            tokens.sort((a, b) => {
                return b.tvl - a.tvl;
            });
            while(randTks.length!==4){
                var rand = Math.floor(Math.random() * tokens.length-1);
                var isSame=false;
                for(let i=0;i<randTks.length;i++){
                    if(rand === randTks[i]){
                        isSame=true;
                    }
                }
                if(rand <=1){
                    isSame=true;
                }
                if(isSame===false){
                    randTks.push(rand);
                }
            }
            while(randTks2.length!==3){
                // eslint-disable-next-line
                var rand = Math.floor(Math.random() * tokens.length-1);
                // eslint-disable-next-line
                var isSame=false;
                for(let i=0;i<randTks2.length;i++){
                    if(rand === randTks2[i]){
                        isSame=true;
                    }
                }
                if(rand <=1){
                    isSame=true;
                }
                try{
                    if (isNaN(parseFloat(tokens[rand].dayChange)) === true || tokens[rand].dayChange === undefined){
                        isSame=true;
                    }
                }
                catch(err){
                    isSame=true;
                    console.log("saved")
                }
               
                if(isSame===false){
                    randTks2.push(rand);
                }
            }

            for (let i = 0; i < tokens.length; i++) {
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
            }
            console.log(randTks2)
            return (
                <div>
                    <Homesmall img1={tokens[randTks[0]].logo} img2={tokens[randTks[1]].logo} img3={tokens[randTks[2]].logo} img4={tokens[randTks[3]].logo} tokens={tokens} ran={randTks2} col={dayCol}/>
                    <Homebig img1={tokens[randTks[0]].logo} img2={tokens[randTks[1]].logo} img3={tokens[randTks[2]].logo} img4={tokens[randTks[3]].logo} tokens={tokens} ran={randTks2} col={dayCol}/>
                </div>
            )
        }
    }
}

