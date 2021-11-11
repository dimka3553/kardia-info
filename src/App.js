import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tokens from './Tokens';
import Tokenpage from './components/Tokenpage';
import Home from './Home';
import Lps from './Lps';
import Wallet from './Wallet';
import Walletdash from './components/Walletdash'
import Games from './Games';
import Airdrop from './Airdrop';
import Airdropper from './Airdropper';
import ICO from './ICO';
import Clubhouse from './Clubhouse';
import Game from './Game';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <div className="content">
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
            <Route exact path="/games">
              <Games />
            </Route>
            <Route exact path="/airdrop">
              <Airdrop />
            </Route>
            <Route exact path="/airdropper">
              <Airdropper />
            </Route>
            <Route exact path="/ico">
              <ICO />
            </Route>
            <Route exact path="/club">
              <Clubhouse />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
