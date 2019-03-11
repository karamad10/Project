import React, { Component } from 'react';
import services from '../services/GetInfo';
import SearchFields from './SearchFields';
import Pages from './Pages';

class SearchForm extends Component {
  state = {
    houses: [],
    countries: [],
    cities: [],
    totalHouses: null,
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
    this.setState({ loading: true });
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
        loading: false,
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
    const { totalHouses, pageSize } = this.state;
    const { page } = this.state.SearchCriteria;
    console.log(page, pageSize, totalHouses);
    const pages = Math.ceil(totalHouses / pageSize);

    if (this.state.loading) return <h3>loading.....</h3>;
    return this.state.totalHouses ? (
      <form onSubmit={this.onFormSubmit}>
        <SearchFields state={this.state} handleChange={this.handleChange} />
        <input type="submit" value="submit" onSubmit={this.onFormSubmit} />
        <div className="totals">
          <h5>Total Houses: {this.state.totalHouses}</h5>
        </div>
        <div>
          <Pages pages={pages} />
        </div>
      </form>
    ) : (
      <form onSubmit={this.onFormSubmit}>
        <div>
          <SearchFields state={this.state} handleChange={this.handleChange} />
        </div>
        <div>
          <input type="submit" value="submit" onSubmit={this.onFormSubmit} />
        </div>
        <div>
          <h3>No Houses Found...</h3>
        </div>
      </form>
    );
  }
}

export default SearchForm;
