import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './style/hamburger-menu.css';
import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';
import Overlay from '../overlay';
import { COLORS } from '../../../src/enums/colors'

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      {isMenuOpen? 
        (
          <div className="hamburger-menu--open">
            <Overlay 
              name="HAMBURGER_MENU"
              onClose={()=>{setIsMenuOpen(false)}}
            >
              <Link to="/goals">EDIT GOALS > </Link>
              <Link to="/redeem">REDEEM POINTS ></Link>
              <Link to="/library">LIBRARY ></Link>
            </Overlay>
          </div>
        ):
        (
          <div>
            <button onClick={()=> setIsMenuOpen(true)}>
              <i 
                aria-hidden="true"
                class="fa fa-bars" 
                style={{
                  fontSize:'18px',
                  color: COLORS.NAVY_BLUE, 
                  padding: '4px'
                }}
              />
            </button>
          </div>
        )
      }
    </div>
  );
}
