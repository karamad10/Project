// import { error } from 'util';

export default class GetInfo {
  static getMainInfo() {
    return fetch('http://localhost:4444/api/houses').then(response =>
      this.checkStatusCode(response)
    );
  }

  static getSearchInfo(searchQuery) {
    return fetch(`http://localhost:4444/api/houses? ${searchQuery}`).then(response =>
      this.checkStatusCode(response)
    );
  }

  static getSingleItem(id) {
    return fetch(`http://localhost:4444/api/houses/ ${id}`).then(response =>
      this.checkStatusCode(response)
    );
  }

  static addItem(newItem) {
    return fetch('http://localhost:4444/api/houses', {
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
