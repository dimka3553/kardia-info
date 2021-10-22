import React, { Component } from "react";
import getWeb3 from "./components/getWeb3";
import airdropABI from "./ABI/airdrop.json"
import tokenABI from './ABI/token.json'


class Airdropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts :["0x0000000000000000000000000000000000000000"],
            tokenAmount: "",
            ids:"",
            parsedIds:[],
            token:"",
            tknCont:0,
            symbol:"",
            idsStat:""
        }
        this.handleAirdrop = this.handleAirdrop.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.handleTokenAmount = this.handleTokenAmount.bind(this);
        this.handleIds = this.handleIds.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
    }
    

    async handleAirdrop(){
        console.log(this.state.web3.utils.toWei(this.state.tokenAmount.toString()))
        var spl = []
        if(this.state.parsedIds.length>200){
            spl = chunk(this.state.parsedIds,200)
            for(let i=0;i<spl.length;i++){
                await this.state.airdrop.methods.send(spl[i],this.state.token,this.state.web3.utils.toWei(this.state.tokenAmount.toString())).send({ from: this.state.accounts[0]})
            }
        }
        else{
            await this.state.airdrop.methods.send(this.state.parsedIds,this.state.token,this.state.web3.utils.toWei(this.state.tokenAmount.toString())).send({ from: this.state.accounts[0]})
        }

        
    }
    async handleToken(event){
        this.setState({token:event.target.value}, async () =>{
            if(this.state.token!==""){
                try{
                    console.log(this.state.token)
                    const tkn = new this.state.web3.eth.Contract(tokenABI, this.state.token);
                    this.setState({symbol:await tkn.methods.symbol().call(), tknCont:tkn})
                }
                catch{
                    this.setState({symbol: "token does not exist"})
                }
            }
            else{
                this.setState({symbol: ""})
            }
            
        })
    }
    handleIds(event){
        var arr = event.target.value.split(',');
        var stat=""
        for(let i=0;i<arr.length;i++){
            try{
                arr[i] = this.state.web3.utils.toChecksumAddress(arr[i]);
            }
            catch{
                stat="Invalid address"
            }
            
        }
        console.log(arr);
        this.setState({ids:event.target.value, parsedIds:arr, idsStat:stat})
    }
    handleTokenAmount(event){
        this.setState({tokenAmount:event.target.value})
    }
    async handleApprove(){
        await this.state.tknCont.methods.approve(this.state.airdropAddress, "1000000000000000000000000000000000000000000000000000000000000000").send({ from: this.state.accounts[0], gasPrice: '3000000000', gas: '700000' })
    }
    async refreshData() {
        window.dispatchEvent(new Event('load'));
            try {
                // Get network provider and web3 instance.
                var web3
                if (!this.state.web3) {
                    web3 = await getWeb3();
                }
                else {
                    web3 = this.state.web3;
                }

                // Use web3 to get the user's accounts.
                var accounts
                try {
                    accounts = await web3.eth.getAccounts();
                }
                catch (err) {
                    accounts = ["0x0000000000000000000000000000000000000000"]
                }

                const airdropAddress = "0xBfEbae04532cFB607320c942016511C8F4E26a1e";
                const airdrop = new web3.eth.Contract(airdropABI, airdropAddress);

                this.setState({ airdrop, airdropAddress, accounts, web3 })
            }
            catch(err){
                console.log(err)
            }
                
    }

    componentDidMount = async () => {
        document.title = `dd - Kardia info`;
        this.refreshData()
        this.interval = setInterval(() => this.refreshData(), 1000);
    };
    render() {
        return (
            <div className="Game">
                <div>
                    <input placeholder="Token Address" onChange={this.handleToken} value={this.state.token}></input><span>{this.state.symbol}</span>
                    <br/>
                    <input placeholder="Amount per id" onChange={this.handleTokenAmount} value={this.state.tokenAmount}></input>
                    <br/>
                    <textarea placeholder="id1,id2,id3,id4,id5" onChange={this.handleIds}>{this.state.ids}</textarea><span>{this.state.idsStat}</span>
                    <br/>
                    <button onClick={this.handleApprove}>Approve Token</button>
                    <button onClick={this.handleAirdrop}>send {this.state.tokenAmount} Tokens to {this.state.parsedIds.length} wallets</button>
                    <p>This will cost {this.state.tokenAmount*this.state.parsedIds.length} Tokens</p>
                </div>
                <p>{this.state.accounts[0]}</p>
            </div>
        );
    }
}
function chunk (items, size) {  
  const chunks = []
  items = [].concat(...items)

  while (items.length) {
    chunks.push(
      items.splice(0, size)
    )
  }

  return chunks
}

export default Airdropper;
