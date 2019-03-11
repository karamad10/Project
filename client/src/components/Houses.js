import React, { Component } from 'react';
import SearchForm from './SearchForm';
import HousesDetails from './HousesDetails';

class Houses extends Component {
  state = {
    houses: [],
    errors: []
  };

  onSearchResults = (houses, errors) => {
    if (errors) {
      this.setState({ houses: [], errors });
    } else {
      this.setState({ houses });
    }
  };

  render() {
    return this.state.errors.length ? (
      <>
        <h1>Houses</h1>
        <br />
        <div>
          <SearchForm onSearchResults={this.onSearchResults} props={this.props} />
        </div>
        <h2>{this.state.errors}</h2>
        <br />
      </>
    ) : (
      <>
        <h1>Houses</h1>
        <br />
        <div>
          <SearchForm onSearchResults={this.onSearchResults} props={this.props} />
        </div>
        <br />
        <div className="row">
          <HousesDetails houses={this.state.houses} />
        </div>
      </>
    );
  }
}

export default Houses;
