import { error } from 'util';

export default class GetInfo {
  static getMainInfo() {
    return fetch('http://localhost:5500/api/houses').then(response =>
      this.checkStatusCode(response),
    );
  }

  static getSingleItem(id) {
    return fetch(`http://localhost:5500/api/houses/ ${id}`).then(response =>
      this.checkStatusCode(response),
    );
  }

  static checkStatusCode(response) {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    } else {
      return response.json();
    }
  }
}
