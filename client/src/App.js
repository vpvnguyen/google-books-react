import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

// components
import SideBar from './components/SideBar/SideBar.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Header from './components/Header/Header.jsx';
import Body from './components/Body/Body.jsx';

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        {/* <SideBar /> */}
        <Header />
        <Body />
      </>
    );
  }
}

export default App;
