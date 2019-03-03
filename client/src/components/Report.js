import React, { Component } from 'react';
class Report extends Component {
  render() {
    let { invalid } = this.props;
    let { valid } = this.props;

    console.log('  props:', this.props);
    console.log('valid props:', valid);
    console.log('invalid props:', invalid);

    let invalidHouses = invalid.map((house, i) => (
      <div key={i}>
        Errors: <h4>{JSON.stringify(house.errors, null, 2)}</h4>
        data:<h5>{JSON.stringify(house.rawData, null, 2)}</h5>
      </div>
    ));
    // let validHouses = valid.map((house, i) => (
    //   <div key={i}>
    //     <h6>`Count: {valid.length} `</h6>
    //   </div>
    // ));

    return !!invalidHouses ? (
      <div className="container">
        <div>
          <div>`Valid Count: {valid.length} `</div>
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
