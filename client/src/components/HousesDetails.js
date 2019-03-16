import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HousesDetails extends Component {
  render() {
    const { houses } = this.props;
    let house = houses.map(house => {
      return (
        <div id="houses-links" className="col 6" key={house.id}>
          <div className="houseInfoContainer">
            <Link to={'/Houses/' + house.id}>
              <img className="houseImg" src={house.images} alt="" />
              <div>{`Country: ${house.location_country}`}</div>
              <div>{`City: ${house.location_city}`}</div>
              <div>{`Rooms: ${house.size_rooms}`}</div>
              <div>{`Date: ${house.market_date}`}</div>
              <div>{`Address: ${house.location_address}`}</div>
              <div>{`Price: ${house.price_value} ${house.price_currency}`}</div>
            </Link>
          </div>
        </div>
      );
    });
    return house;
  }
}

export default HousesDetails;
