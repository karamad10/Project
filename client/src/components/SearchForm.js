import React, { Component } from 'react';
import services from '../services/GetInfo';
import { MIN_PRISES, MAX_PRISES, ORDER_VALUES, SIZE_ROOMS } from '../services/constants';

class SearchForm extends Component {
  state = {
    houses: [],
    countries: [],
    cities: [],
    totalHouses: [],
    pageSize: null,
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
    const params = this.props.props.location.search
      .replace(/^\?/, '')
      .split('&')
      .filter(el => el.length)
      .map(pair => pair.split('='))
      .reduce((params, [name, value]) => {
        params[name] = value;
        return params;
      }, {});

    services.SearchCitiesAndCountries(this.state.houses).then(data => {
      this.setState({
        ...this.state,
        ...params,
        cities: data.cities,
        countries: data.countries
      });
    }, this.fetchSearchResults());
  }

  fetchSearchResults = (updateURL = false) => {
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

    if (updateURL) {
      this.props.props.history.push(this.props.props.location.pathname + '?' + queryString);
    }

    // console.log('Query String:', queryString);
    services.getSearchInfo(queryString).then(data => {
      this.setState({
        pageSize: data.pageSize,
        totalHouses: data.total
      });
      this.props.onSearchResults(data.houses, data.error);
    });
  };

  onPageChange = page => {
    console.log('set page', page);
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
    this.fetchSearchResults(true);
    console.log('Form Submitted');
  };

  render() {
    const { houses, totalHouses, pageSize } = this.state;
    const { page } = this.state.SearchCriteria;

    console.log(page, pageSize, totalHouses);
    const pages = Math.ceil(totalHouses / pageSize);

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
        <div className="input-field col s3">
          <select id={'select-option'} name="size_rooms" onChange={this.handleChange}>
            <option value="">Rooms</option>
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
    return this.state.totalHouses ? (
      <form onSubmit={this.onFormSubmit}>
        {searchFields}
        <br />
        <input type="submit" value="submit" onSubmit={this.onFormSubmit} />
        <br />
        <br />
        <div className="totals">
          <h5>Total Houses: {this.state.totalHouses}</h5>
        </div>
        {/* {Array.form({ length: pages || 0 }, (val, index) => {
          const _pages = index + 1;
          return (
            <div className={`${pages == _pages ? 'active' : ''}`} onClick={this.onPageChange}>
              {_pages}
            </div>
          );
        })} */}
      </form>
    ) : (
      <form onSubmit={this.onFormSubmit}>
        {searchFields}
        <br />
        <input type="submit" value="submit" onSubmit={this.onFormSubmit} />
        <br />
        <h3>No Houses Found...</h3>
      </form>
    );
  }
}

export default SearchForm;
