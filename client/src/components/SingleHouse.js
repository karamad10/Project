import React, { Component } from 'react';
import GetInfo from '../services/GetInfo';

class SingleHouse extends Component {
  state = {
    house: null
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    GetInfo.getSingleItem(id).then(Response =>
      this.setState({
        house: Response
      })
    );
  }

  render() {
    console.log(this.state);
    let house = this.state.house;
    const clickedHouse = this.state.house ? (
      <div className="house">
        <h5> {`Price: ${house.price_value}  ${house.price_currency}`}</h5>
        <div>{`Country: ${house.location_country}`}</div>
        <div>{`City: ${house.location_city}`}</div>
        <div>{`Link: ${house.link}`}</div>
        <div>{`Date: ${house.market_date}`}</div>
        <div>{`Address: ${house.location_address}`}</div>
      </div>
    ) : (
      <div className="center">There is no house with this id </div>
    );
    return <div>{clickedHouse}</div>;
  }
}

export default SingleHouse;
