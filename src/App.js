import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Sidebar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              Hello, Home!
            </Route>
            <Route exact path="/tokens">
              Hello, Tokens!
            </Route>
            <Route exact path="/lps">
              Hello, LPs!
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
