import React, { Component } from 'react';
import services from '../services/GetInfo';
import { MIN_PRISES, MAX_PRISES, ORDER_VALUES, SIZE_ROOMS } from '../services/constants';

class SearchForm extends Component {
  state = {
    houses: [],
    countries: [],
    cities: [],
    pageSize: null,
    totalHouses: null,
    SearchCriteria: {
      price_min: 0,
      price_max: 1000000000,
      size_rooms: 1,
      location_country: '',
      location_city: '',
      order: 'location_country_asc',
      page: 1
    }
  };

  componentDidMount() {
    this.fetchSearchResults();
    services.SearchCitiesAndCountries(this.state.houses).then(data => {
      this.setState({
        ...this.state,
        cities: data.cities,
        countries: data.countries
      });
    });
  }

  fetchSearchResults = () => {
    const { SearchCriteria } = this.state;
    const queryString = Object.keys(SearchCriteria)
      .reduce((query, field) => {
        const value = encodeURI(SearchCriteria[field]);
        if (value !== null && value !== '') {
          query.push(`${field}=${value}`);
        }
        return query;
      }, [])
      .join('&');
    console.log('Query String:', queryString);
    services.getSearchInfo(queryString).then(data => {
      this.setState({
        pageSize: data.pageSize,
        totalHouses: data.total
      });
      this.props.onSearchResults(data.houses);
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      SearchCriteria: {
        ...this.state.SearchCriteria,
        [name]: value
      }
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.fetchSearchResults();
    console.log('Form Submitted');
  };

  render() {
    let CITIES = [];
    let COUNTRIES = [];
    this.state.cities.forEach(cityObj => {
      Object.values(cityObj).map(city => {
        return CITIES.push(city);
      });
    });
    this.state.countries.forEach(countObj => {
      Object.values(countObj).map(country => {
        return COUNTRIES.push(country);
      });
    });

    const searchFields = (
      <div className="row">
        <div className="input-field col s3">
          <select id={'select-option'} name="price_min" onChange={this.handleChange}>
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
          <select id={'select-option'} name="price_max" onChange={this.handleChange}>
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
          <select id={'select-option'} name="location_country" onChange={this.handleChange}>
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
          <select id={'select-option'} name="location_city" onChange={this.handleChange}>
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
          <select id={'select-option'} name="size_rooms" onChange={this.handleChange}>
            <option value="">Number of rooms</option>
            {SIZE_ROOMS.map((room, i) => (
              <option key={i} value={room}>
                {room}
              </option>
            ))}
            ;
          </select>
        </div>
        <div className="input-field col s3">
          <select id={'select-option'} name="order" onChange={this.handleChange}>
            <option value="">Order By</option>
            {ORDER_VALUES.map((ORDER_VALUES, i) => (
              <option key={i} value={ORDER_VALUES}>
                {ORDER_VALUES}
              </option>
            ))}
            ;
          </select>
        </div>
      </div>
    );
    return this.state.totalHouses === 0 ? (
      <form onSubmit={this.onFormSubmit}>
        {searchFields}
        <br />
        <input type="submit" value="submit" onSubmit={this.onFormSubmit} />
        <br />
        <h2> No Houses found </h2>
      </form>
    ) : (
      <form onSubmit={this.onFormSubmit}>
        {searchFields}
        <br />
        <input type="submit" value="submit" onSubmit={this.onFormSubmit} />
        <br />
        <br />
        <div className="totals">
          <h5>Total Houses: {this.state.totalHouses}</h5>
        </div>
      </form>
    );
  }
}

export default SearchForm;
