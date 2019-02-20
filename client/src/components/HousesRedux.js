import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Houses extends Component {
  state = {
    loading: false,
  };

  render() {
    const { houses } = this.props;
    const { loading } = this.state;
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

const mapStateToProps = state => {
  return {
    houses: state.houses,
  };
};

export default connect(mapStateToProps)(Houses);
