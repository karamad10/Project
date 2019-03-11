import React, { Component } from 'react';

class Pages extends Component {
  state = {
    currentPage: 1,
    lastPage: 1,
    totalPages: this.props.pages
  };

  onClick = page => {
    console.log('set page', page);
  };
  render() {
    const { pages } = this.props;
    console.log(this.state);
    return <div>{pages}</div>;
  }
}

export default Pages;
