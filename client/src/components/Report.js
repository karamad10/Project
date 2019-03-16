import React, { Component } from 'react';
class Report extends Component {
  state = {
    invalid: this.props.invalid
  };

  render() {
    let { invalid } = this.state;

    let invalidHouses = invalid.map((house, i) => (
      <div key={i}>
        Errors:<h4>{JSON.stringify(house.errors, null, 2)}</h4>
        data:<h5>{JSON.stringify(house.rawData, null, 2)}</h5>
      </div>
    ));

    console.log(this.state);

    return !!invalidHouses ? (
      <div className="container">
        <div>
          <div>
            {`Valid: ${this.props.valid.length}`}
            <br />
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
