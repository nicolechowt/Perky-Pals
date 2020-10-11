import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './style/hamburger-menu.css';
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
              <div className="hamburger-menu__container">

                  <Link 
                    className="hamburger-menu__link"
                    to="/goals"
                  >
                    <div>EDIT GOALS</div>             
                    <i 
                      aria-hidden="true"
                      className="fa fa-angle-right" 
                      style={{
                        fontSize:'18px',
                        color: COLORS.NAVY_BLUE, 
                        padding: '4px'
                      }}
                    /> 
                  </Link>



                  <Link 
                    className="hamburger-menu__link"
                    to="/redeem"
                  >
                    <div>REDEEM POINTS</div>
                    <i 
                      aria-hidden="true"
                      className="fa fa-angle-right" 
                      style={{
                        fontSize:'18px',
                        color: COLORS.NAVY_BLUE, 
                        padding: '4px'
                      }}
                    /> 
                  </Link>

                  <Link 
                    className="hamburger-menu__link"
                    to="/library"
                  >
                    <div>LIBRARY</div>
                    <i 
                      aria-hidden="true"
                      className="fa fa-angle-right" 
                      style={{
                        fontSize:'18px',
                        color: COLORS.NAVY_BLUE, 
                        padding: '4px'
                      }}
                    /> 
                  </Link>
              </div>
            </Overlay>
          </div>
        ):
        (
          <div>
            <button onClick={()=> setIsMenuOpen(true)}>
              <i 
                aria-hidden="true"
                className="fa fa-bars" 
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
