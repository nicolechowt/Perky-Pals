import React, { useState } from 'react';
import './style/overlay.css';
import close from '../../assets/close.svg';

export default function Overlay(props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  const handleOnClick = () => {
    setIsOverlayOpen(false);
    props.onClose();
  }

  return (
    <div 
      className="overlay"
      style={isOverlayOpen ? {display: 'block'} : {display: 'none'}}
    >
      <button onClick={handleOnClick}>
        <img src={close}/>
      </button>

      <div 
        className="overlay__links"
        onClick={handleOnClick}
      >
        {props.children}
      </div>
    </div>
  );
}
