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
      <button onClick={handleOnClick}>
        <img src={close}/>
      </button>

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
          <div className="overlay__links">
            {props.children}
          </div>
        )
      })()}
    </div>
  );
}
