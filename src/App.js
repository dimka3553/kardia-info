import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tokens from "./Tokens";
import Tokenpage from "./components/Tokenpage";
import Home from "./Home";
import Lps from "./Lps";
import Wallet from "./Wallet";
import Walletdash from "./components/Walletdash";
import Airdrop from "./Airdrop";
import Airdropper from "./Airdropper";
import Clubhouse from "./Clubhouse";
import Game from "./Game";
import Infogame from "./Infogame";
import Farm from "./Farm";
import "./styles/utils.css";
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <div className="content">
          <div className="alerttt p-t-20 p-b-20 p-l-20 p-r-20 m-l-20 m-r-20 m-t-20 m-b-20 pos-r">
            Dear INFO holders,
            <br />
            <br />
            Kardia info will soon launch gINFO which will (in theory) have a
            positive impact in INFO's price. You may learn more about it by
            watching the following video:
            <br />
            <br />
            <a href="https://youtu.be/s2WERuqX080" target="_blank">
              https://youtu.be/s2WERuqX080
            </a>
            <br />
            <br />
            After watching the video please vote for gINFO here:
            <br />
            <br />
            <a href="https://bit.ly/3Hc0j58" target="_blank">
              https://bit.ly/3Hc0j58
            </a>
            <br />
            <br />
            Thank you very much for your support,
            <br />
            <br />
            INFO team.
            <br />
            <br />
            P.S. Once you vote for gINFO please DM{" "}
            <a href="https://t.me/dima3553" target="_blank">
              @dima3553
            </a>{" "}
            on Telegram to get a little present.
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tokens">
              <Tokens />
            </Route>
            <Route exact path="/lps">
              <Lps />
            </Route>
            <Route path="/tokens/:id" component={Tokenpage} />
            <Route exact path="/wallet">
              <Wallet />
            </Route>
            <Route path="/wallet/:id" component={Walletdash} />
            <Route exact path="/game">
              <Game />
            </Route>
            <Route exact path="/infogame">
              <Infogame />
            </Route>
            <Route exact path="/airdrop">
              <Airdrop />
            </Route>
            <Route exact path="/airdropper">
              <Airdropper />
            </Route>
            <Route exact path="/club">
              <Clubhouse />
            </Route>
            <Route exact path="/farm">
              <Farm />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
