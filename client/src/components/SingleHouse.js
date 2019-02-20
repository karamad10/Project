import React, { Component } from 'react';
import GetInfo from '../services/GetInfo';

class SingleHouse extends Component {
  state = {
    house: null,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    GetInfo.getSingleItem(id).then(Response =>
      this.setState({
        house: Response,
      }),
    );
  }

  render() {
    const clickedHouse = this.state.house ? (
      <div className="house">
        <div>{` Id: ${this.state.house.id}  Price: ${this.state.house.price} `}</div>
      </div>
    ) : (
      <div className="center">There is no house with this id </div>
    );
    return <div>{clickedHouse}</div>;
  }
}

export default SingleHouse;
