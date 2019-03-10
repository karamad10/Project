import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Houses2 from './components/HousesRedux';
// import SingleHouse2 from './components/SingleHouseRedux';
import Nav from './components/Nav';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Houses from './components/Houses';
import SingleHouse from './components/SingleHouse';

import AddHouse from './components/AddHouse';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Houses" component={Houses} />
            <Route exact path="/Houses/:id" component={SingleHouse} />
            <Route exact path="/Contribute" component={AddHouse} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
