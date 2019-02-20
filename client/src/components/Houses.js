import React, { Component } from 'react';
import services from '../services/GetInfo';
import { Link } from 'react-router-dom';

class Houses extends Component {
  state = {
    houses: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    services.getMainInfo().then(Response =>
      this.setState({
        houses: Response,
        loading: false,
      }),
    );
  }

  render() {
    const { houses, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    let house = houses.map(house => {
      return (
        <div className="App" key={house.id}>
          <Link to={'/Houses/' + house.id}>
            <div>{` Id: ${house.id}  Price: ${house.price} `}</div>
          </Link>
        </div>
      );
    });
    return (
      <>
        <h1>Houses</h1>
        {house}
      </>
    );
  }
}

export default Houses;
