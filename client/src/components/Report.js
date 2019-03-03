import React, { Component } from 'react';
class Report extends Component {
  state = {
    invalid: this.props.invalid,
    responseMessage: []
  };

  render() {
    let { invalid, responseMessage } = this.state;

    let invalidHouses = invalid.map((house, i) => (
      <div key={i}>
        Errors: <h4>{JSON.stringify(house.errors, null, 2)}</h4>
        data:<h5>{JSON.stringify(house.rawData, null, 2)}</h5>
      </div>
    ));
    this.props.valid.map((house, i) => (
      <div key={i}>
        <h5>
          {responseMessage.splice(
            0,
            responseMessage.length,
            JSON.stringify(house.responseMessage, null, 2)
          )}
        </h5>
      </div>
    ));
    console.log(this.state);

    return !!invalidHouses ? (
      <div className="container">
        <div>
          <div>
            {this.props.valid.length}
            <br />
            {responseMessage}
          </div>
          <br />
          <div>{invalidHouses}</div>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default Report;
