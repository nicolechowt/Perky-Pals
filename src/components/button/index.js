import React from 'react';
import './style/button.css';
import { Link } from "react-router-dom";

export default function Button(props) {
  const { children, to } = props;
  if(to) {
    return (
      <Link 
        className="button__link"
        to={to}
      >
        {children}
      </Link>
    )
  }
  return (
    <button className="button">
      {children}
    </button>
  )
}
