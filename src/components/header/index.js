import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import './style/header.css';

import HamburgerMenu from '../hamburger-menu';

function Header(props) {
  const currentUser = props && props.currentUser;

  const name = currentUser && currentUser[0].name;

  const points = props && props.points;

  return (
    <div>
      <div className="header__name-and-menu">
        <div>
          <div className="header__name">
            Hi, {name}
          </div> 
          <div className="header__points">{points} POINTS</div>
        </div>

        <HamburgerMenu />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { currentUserReducer, dashboardReducer, } = state
  return { 
    currentUser: currentUserReducer.currentUser,
    points: dashboardReducer.points,
  }
}

export default connect(
  mapStateToProps,
)(Header)