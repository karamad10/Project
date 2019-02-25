import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import {Nav , Home , Houses , Houses2, SingleHouse, SingleHouse2,ErrorPage} from "./components"
import Nav from './components/Nav';
import Home from './components/Home';
// eslint-disable-next-line no-unused-vars
import Houses from './components/Houses';
import Houses2 from './components/HousesRedux';
// eslint-disable-next-line no-unused-vars
import SingleHouse from './components/SingleHouse';
import SingleHouse2 from './components/SingleHouseRedux';
import ErrorPage from './components/ErrorPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Houses" component={Houses2} />
            <Route exact path="/Houses/:id" component={SingleHouse2} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
