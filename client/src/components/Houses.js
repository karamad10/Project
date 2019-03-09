import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

class Houses extends Component {
  state = {
    houses: [],
    errors: [],
    loading: false
  };

  onSearchResults = (houses, errors) => {
    console.log(errors);
    if (errors) {
      this.setState({ houses: [], errors });
    } else {
      this.setState({ errors: [], houses });
    }
  };

  render() {
    const { houses, loading } = this.state;
    let house;
    if (loading) return <div>Loading...</div>;
    if (houses) {
      house = houses.map(house => {
        return (
          <div id="houses-links" className="col 6" key={house.id}>
            <Link to={'/Houses/' + house.id}>
              <div>{`Image: ${house.images}`}</div>
              <div>{`Country: ${house.location_country}`}</div>
              <div>{`City: ${house.location_city}`}</div>
              <div>{`Rooms: ${house.size_rooms}`}</div>
              <div>{`Link: ${house.link}`}</div>
              <div>{`Date: ${house.market_date}`}</div>
              <div>{`Address: ${house.location_address}`}</div>
              <div>{`Price: ${house.price_value} ${house.price_currency}`}</div>
            </Link>
          </div>
        );
      });
    }
    console.log(this.state);
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
        <div className="row">{house}</div>
      </>
    );
  }
}

export default Houses;
