import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tokens from './Tokens';
import Tokenpage from './components/Tokenpage';
import Home from './Home';
import Lps from './Lps';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Sidebar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/tokens">
              <Tokens />
            </Route>
            <Route exact path="/lps">
              <Lps/>
            </Route>
            <Route path="/tokens/:id" component={Tokenpage}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
