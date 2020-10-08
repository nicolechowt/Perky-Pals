import React, { useState } from 'react';
import './style/overlay.css';
import close from '../../assets/close.svg';

export default function Overlay(props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  const handleOnClick = () => {
    setIsOverlayOpen(false);
    
    props.onClose && props.onClose();
  }

  return (
    <div 
      className="overlay"
      style={isOverlayOpen ? {display: 'block'} : {display: 'none'}}
    >
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


      {/* only close overlay on click if this is the hamburger menu */}
      {(()=>{
        if(props.name === 'HAMBURGER_MENU') {
          return(
            <div 
              className="overlay__links"
              onClick={handleOnClick}
            >
              {props.children}
            </div>
          );
        } 
        
        return(
          <div className="overlay__content">
            {props.children}
          </div>
        )
      })()}
    </div>
  );
}
