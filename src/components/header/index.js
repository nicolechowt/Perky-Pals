import React from 'react';
import { Link } from "react-router-dom";
import './style/header.css';
import HamburgerMenu from '../hamburger-menu';

export default function Header(props) {
  return (
    <div>
      <div className="header__name-and-menu">
        <h1 className="header__name">Hi, BELLA</h1>
        <HamburgerMenu />
      </div>
      <Link 
        className="header__link"
        to="/dashboard">
          DASHBOARD
      </Link>

      <Link 
        className="header__link"
        to="/points"
      >
        POINTS
      </Link>

      <Link 
        className="header__link"
        to="redeem"
      >
        REDEEM
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
