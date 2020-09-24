import React from 'react';
import './style/box.css';


export default function Box(props) {
  return (
    <div className="box">
      {props.children}
    </div>
  );
}
