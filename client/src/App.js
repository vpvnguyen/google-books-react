import React, { Component } from "react";
import "./App.css";
// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import NavBar from './components/NavBar/NavBar.jsx';
import Header from './components/Header/Header.jsx';
import SearchPage from './views/SearchPage/SearchPage.jsx';
import SavedPage from './views/SavedPage/SavedPage.jsx';

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Header />
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              {/* <Route exact path="/results" component={Results} /> */}
              <Route exact path="/saved" component={SavedPage} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
