import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <div className="nav-wrapper teal ">
        <ul id="nav-mobile" className="left">
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/Houses">Houses</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
