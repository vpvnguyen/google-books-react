import React, { Component } from "react";

// style
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import SearchPage from './views/SearchPage/SearchPage.jsx';
import SavedPage from './views/SavedPage/SavedPage.jsx';

// init toast component
toast.configure();

class App extends Component {

  render() {
    return (

      <>
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
