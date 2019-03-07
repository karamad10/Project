import React, { Component } from 'react';
import services from '../services/GetInfo';

class SearchForm extends Component {
  state = {
    houses: [],
    SearchCriteria: {
      price_min: 0,
      price_max: 1000000000,
      city: '',
      order: 'location_country_asc',
      page: 1
    }
  };

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
    services.getSearchInfo(queryString).then(res => {
      console.log(res);
      this.setState({
        houses: res
      });
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
    // console.log(this.props.houses);
    console.log('state', this.state);
    // const { price_min, price_max, city, order, page } = this.state.SearchCriteria;

    const MIN_PRISES = [0, 10000, 20000, 30000, 40000, 50000];
    const MAX_PRISES = [10000, 20000, 30000, 40000, 50000, 60000];
    const CITIES = ['Amsterdam', 'Lattakia', 'Madrid', 'Damascus', 'Paris'];
    const ORDER = ['City ASC', 'City DESC', 'Price ASC', 'Price DESC'];

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
          <select id={'select-option'} name="city" onChange={this.handleChange}>
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
          <select id={'select-option'} name="order" onChange={this.handleChange}>
            <option value="">Order By</option>
            {ORDER.map((order, i) => (
              <option key={i} value={order}>
                {order}
              </option>
            ))}
            ;
          </select>
        </div>
      </div>
    );
    return (
      <form onSubmit={this.onFormSubmit}>
        {searchFields}
        <br />
        <input type="submit" value="submit" onSubmit={this.onFormSubmit} />
      </form>
    );
  }
}

export default SearchForm;
