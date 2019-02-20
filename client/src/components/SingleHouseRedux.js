import React, { Component } from 'react';
import { connect } from 'react-redux';

class SingleHouse extends Component {
  render() {
    console.log(this.props);
    const clickedHouse = this.props.house ? (
      <div className="house">
        <div>{` Id: ${this.props.house.id}  Price: ${this.props.house.price} `}</div>
      </div>
    ) : (
      <div className="center">There is no house with this id </div>
    );
    return <div>{clickedHouse}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    house: state.houses.find(house => house.id === JSON.parse(id)),
  };
};

export default connect(mapStateToProps)(SingleHouse);
