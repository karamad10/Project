// import { error } from 'util';
import { BASE_URL } from './constants';

export default class GetInfo {
  static getMainInfo() {
    return fetch(`${BASE_URL}/houses`).then(response => this.checkStatusCode(response));
  }

  static SearchCitiesAndCountries() {
    return fetch(`${BASE_URL}/houses/citiesAndCountries/all`).then(response =>
      this.checkStatusCode(response)
    );
  }

  static getSearchInfo(searchQuery) {
    return fetch(`${BASE_URL}/houses?${searchQuery}`).then(response =>
      this.checkStatusCode(response)
    );
  }

  static getSingleItem(id) {
    return fetch(`${BASE_URL}/houses/${id}`).then(response => this.checkStatusCode(response));
  }

  static addItem(newItem) {
    return fetch(`${BASE_URL}/houses`, {
      method: 'POST',
      body: newItem,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => this.checkStatusCode(response))
      .catch(response => {
        console.log(response.message);
        return response.message;
      });
  }

  static checkStatusCode(response) {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    } else {
      return response.json();
    }
  }
}
