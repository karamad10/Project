import React, { Component } from 'react';

class Pages extends Component {
  state = {
    currentPage: 1,
    totalPages: this.props.pages,
    pages: 0
  };

  onClick = pageNum => {
    this.setState({
      currentPage: pageNum
    });
    this.props.handelPageChange(pageNum);
  };

  pagesButtons = () => {
    const { currentPage } = this.state;
    let pagesNumbers = [];
    for (let i = 1; i <= this.props.pages; i++) {
      pagesNumbers.push(i);
    }
    let pages = pagesNumbers.map((pageNum, i) => {
      return (
        <input
          key={i}
          className={`${currentPage === pageNum ? 'active' : ''}`}
          type="button"
          value={pageNum}
          onClick={() => this.onClick(pageNum, pagesNumbers)}
        />
      );
    });
    return pages;
  };

  render() {
    return <div className="pagesButtons">{this.pagesButtons()}</div>;
  }
}

export default Pages;
