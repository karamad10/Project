import React, { Component } from 'react';
import { connect } from 'react-redux';

class SingleHouse extends Component {
  render() {
    const clickedHouse = this.props.house ? (
      <div className="house">
        <h4>{` Id: ${this.props.house.id}  Price: ${this.props.house.price} `}</h4>
      </div>
    ) : (
      <h4 className="center">There is no house with this id </h4>
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
