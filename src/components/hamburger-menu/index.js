import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './style/hamburger-menu.css';
import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';
import Overlay from '../overlay';

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {isMenuOpen? 
        (
          <div className="hamburger-menu--open">
            <Overlay onClose={()=>{setIsMenuOpen(false)}}>
              <Link to="/">HOME > </Link>
              <Link to="/goals">EDIT GOALS > </Link>
              <Link to="/redeem">REDEEM POINTS ></Link>
              <Link to="/library">LIBRARY ></Link>
            </Overlay>
          </div>
        ):
        (
          <div>
            <button onClick={()=> setIsMenuOpen(true)}>
              <img src={menu}/>
            </button>
          </div>
        )
      }
    </div>
  );
}
