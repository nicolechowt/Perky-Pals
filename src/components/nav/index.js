import React from 'react';
import { Link } from "react-router-dom";

import './style/nav.css';

export default function Nav() {
  return (
    <div className="nav">
      <Link 
        className="header__link"
        to="redeem"
      >
        REDEEM
      </Link>

      <Link 
        className="header__link"
        to="/dashboard">
          DASHBOARD
      </Link>

      <Link 
        className="header__link"
        to="library"
      >
        LIBRARY
      </Link>
    </div>
  );
}
