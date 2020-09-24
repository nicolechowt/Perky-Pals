import React, { useState } from 'react';
import './style/overlay.css';
import close from '../../assets/close.svg';
import { blockStatement } from '@babel/types';


export default function Overlay(props) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  return (
    <div 
      className="overlay"
      style={isOverlayOpen ? {display: 'block'} : {display: 'none'}}
    >
      <button onClick={()=> {
        setIsOverlayOpen(false);
        props.onClose();
      }}>
        <img src={close}/>
      </button>

      <div className="overlay__links">
        {props.children}
      </div>
    </div>
  );
}
