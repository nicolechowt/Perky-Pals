import React from 'react';
import { withRouter } from "react-router-dom";

import './style/tip-box.css';

function TipBox(props) {
  const { 
    link,
    text,
    title,
  } = props;

  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div className="tip-box">
      <div className="tip-box__title">{title}</div>
      <div className="tip-box__text">{text}</div>

      <div 
        className="tip-box__button"
        onClick={(event)=>{
          event.stopPropagation();
          nextPath(link);
        }}
      >
        {link && (
          <i
            class="fa fa-chevron-circle-right" 
            style={{
              fontSize:'22px',
              color: "#F55F15", 
              padding: '4px'
            }}
          />
        )}
      </div>
    </div>
  );
}

export default withRouter(TipBox);
