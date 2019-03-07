import React, { Component } from 'react';
import services from '../services/GetInfo';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

class Houses extends Component {
  state = {
    houses: [],
    loading: false
  };

  componentDidMount() {
    this.setState({
      loading: true
    });
    services.getMainInfo().then(Response =>
      this.setState({
        houses: Response,
        loading: false
      })
    );
  }

  render() {
    const { houses, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    let house = houses.map(house => {
      return (
        <div id="houses-links" className="col 6" key={house.id}>
          <Link to={'/Houses/' + house.id}>
            {/* <div>{`Country: ${house.location_country}`}</div>
            <div>{`City: ${house.location_city}`}</div>
            <div>{`Link: ${house.link}`}</div>
            <div>{`Date: ${house.market_date}`}</div>
            <div>{`Address: ${house.location_address}`}</div> */}
            <div>{`Image: ${house.images}`}</div>
            <div>{`Price: ${house.price_value} ${house.price_currency}`}</div>
          </Link>
        </div>
      );
    });
    return (
      <>
        <h1>Houses</h1>
        <br />
        <div>
          <SearchForm houses={this.state.houses} />
        </div>
        <br />
        <div className="row">{house}</div>
      </>
    );
  }
}

export default Houses;
