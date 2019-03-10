import React, { Component } from 'react';
import { MIN_PRISES, MAX_PRISES, ORDER_VALUES, SIZE_ROOMS } from '../services/constants';

class SearchFields extends Component {
  render() {
    const { cities, countries } = this.props.state;
    let CITIES = [];
    let COUNTRIES = [];
    cities.forEach(cityObj => {
      Object.values(cityObj).map(city => {
        return CITIES.push(city);
      });
    });
    countries.forEach(countObj => {
      Object.values(countObj).map(country => {
        return COUNTRIES.push(country);
      });
    });

    const searchFields = (
      <div className="row">
        <div className="input-field col s3">
          <select id={'select-option'} name="price_min" onChange={this.props.handleChange}>
            <option disabled selected>
              Minimum Price
            </option>
            {MIN_PRISES.map((prise, i) => (
              <option key={i} value={prise}>
                {prise}
              </option>
            ))}
            ;
          </select>
        </div>
        <div className="input-field col s3">
          <select id={'select-option'} name="price_max" onChange={this.props.handleChange}>
            <option disabled selected>
              Maximum Price
            </option>
            {MAX_PRISES.map((prise, i) => (
              <option key={i} value={prise}>
                {prise}
              </option>
            ))}
            ;
          </select>
        </div>
        <div className="input-field col s3">
          <select id={'select-option'} name="location_country" onChange={this.props.handleChange}>
            <option value="">Select Country</option>
            {COUNTRIES.map((Country, i) => (
              <option key={i} value={Country}>
                {Country}
              </option>
            ))}
            ;
          </select>
        </div>
        <div className="input-field col s3">
          <select id={'select-option'} name="location_city" onChange={this.props.handleChange}>
            <option value="">Select City</option>
            {CITIES.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
            ;
          </select>
        </div>
        <div className="input-field col s3">
          <select id={'select-option'} name="order" onChange={this.props.handleChange}>
            <option disabled selected>
              Order By
            </option>
            {ORDER_VALUES.map((ORDER_VALUES, i) => (
              <option key={i} value={ORDER_VALUES}>
                {ORDER_VALUES}
              </option>
            ))}
            ;
          </select>
        </div>
        <div className="input-field col s3">
          <select id={'select-option'} name="size_rooms" onChange={this.props.handleChange}>
            <option disabled selected>
              Rooms
            </option>
            {SIZE_ROOMS.map((room, i) => (
              <option key={i} value={room}>
                {room}
              </option>
            ))}
            ;
          </select>
        </div>
      </div>
    );
    return searchFields;
  }
}

export default SearchFields;
