import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import './style/header.css';

import HamburgerMenu from '../hamburger-menu';

function Header(props) {
  const currentUser = props && props.currentUser;

  const name = currentUser && currentUser[0].name;

  return (
    <div>
      <div className="header__name-and-menu">
        <h1 className="header__name">Hi, {name}</h1>
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

function mapStateToProps(state) {
  const { currentUserReducer } = state
  return { 
    currentUser: currentUserReducer.currentUser,
  }
}

export default connect(
  mapStateToProps,
)(Header)