import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="App">
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Houses">Houses</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
