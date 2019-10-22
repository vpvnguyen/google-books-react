import React, { Component } from "react";

// style
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Header from './components/Header/Header.jsx';
import SearchPage from './views/SearchPage/SearchPage.jsx';
import SavedPage from './views/SavedPage/SavedPage.jsx';

class App extends Component {

  render() {
    return (

      <>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/saved" component={SavedPage} />
          </Switch>
        </Router>

      </>
    );
  }
}

export default App;
