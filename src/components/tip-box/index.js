import React from 'react';
import { withRouter } from "react-router-dom";

import './style/tip-box.css';

function TipBox(props) {
  const { 
    link,
    text,
    title,
    style,
  } = props;

  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div 
      className="tip-box"
      style={style && {border: `${style.border}`}}
    >
      <div 
        className="tip-box__title"
        style={style && {color: `${style.color}`}}
      >
        {title}
      </div>

      <div 
        className="tip-box__text"
        style={style && {color: `${style.color}`}}
      >
        {text}
      </div>

      {(()=>{
        if(!link) return;
        
        return (
          <div 
            className="tip-box__button"
            onClick={(event)=>{
              event.stopPropagation();
              nextPath(link);
            }}
          >
            {link && (
              <i
                className="fa fa-chevron-circle-right" 
                style={{
                  fontSize:'22px',
                  color: `${style ? style.color : "#F55F15"}`, 
                  padding: '4px'
                }}
              />
            )}
          </div>
        );
      })()}
    </div>
  );
}

export default withRouter(TipBox);
