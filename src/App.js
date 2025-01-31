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
          {/* <div className="alerttt p-t-20 p-b-20 p-l-20 p-r-20 m-l-20 m-r-20 m-t-20 m-b-20 pos-r">
            Dear INFO holders,
            <br />
            <br />
            Kardia info is prepearing to launch the gINFO IDO.
            <br />
            <br />
            Please vote YES here:
            <br />
            <br />
            <a href="https://bit.ly/3KtCF5M" target="_blank">
              https://bit.ly/3KtCF5M
            </a>
          </div> */}
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
