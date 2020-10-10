import React, { useState } from 'react';
import './style/overlay.css';

export default function Overlay(props) {
  const {
    onClose,
    modal,
    name,
    children,
  } = props;

  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  const handleOnClick = () => {
    setIsOverlayOpen(false);
    onClose && onClose();
  }

  return (
    <div 
      className="overlay"
      style={isOverlayOpen ? {display: 'block'} : {display: 'none'}}
    >
      {!modal && (
        <div 
          className="page__back-button"
          onClick={handleOnClick}
          style={{ zIndex: 3 }}
        >
          <i
            class="fa fa-angle-left"
            style={{
              fontSize:'36px',
              color: "#4B5B7E", 
              padding: '4px',
            }}
          />
        </div>
      )}

      {(()=>{
        if(name === 'HAMBURGER_MENU') {
          {/* we want to also close the overlay on click if this is the hamburger menu */}
          return(
            <div 
              className="overlay__links"
              onClick={handleOnClick}
            >
              {children}
            </div>
          );
        } else if (!modal) {
          return(
            <div className="overlay__content">
              {children}
            </div>
          )
        }; 

        return (
          <div className="overlay__content--modal-wrapper">
            <div className="overlay__content--modal">
              <div 
                className="overlay__close-button"
                onClick={handleOnClick}
                style={{ zIndex: 3 }}
              >
                <i  
                  class="fa fa-times"
                  style={{
                    fontSize:'12px',
                    color: "#4B5B7E", 
                    padding: '4px'
                  }}
                />
              </div>

              {children}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
