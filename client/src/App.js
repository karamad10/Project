import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Houses from './components/Houses';
import Houses2 from './components/HousesRedux';
import SingleHouse from './components/SingleHouse';
import SingleHouse2 from './components/SingleHouseRedux';
import ErrorPage from './components/ErrorPage';

import './App.css';

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
