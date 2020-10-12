import React, { useState } from 'react';
import { withRouter } from "react-router-dom";

import './style/tip-box.css';
import Overlay from '../overlay';
import HelpOverlay from '../help-overlay';

function TipBox(props) {
  const { 
    link,
    text,
    title,
    style,
    hasHelpOverlay,
  } = props;

  const nextPath = (path) => {
    props.history.push(path);
  }

  const [isHelpOverlayActive, setIsHelpOverlayActive] = useState(false);

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
        if(!link && !hasHelpOverlay) return;
        
        if(link) {
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
        }

        return (
          <React.Fragment>
            <div 
              className="tip-box__button"
              onClick={(event)=>{
                event.stopPropagation();
                setIsHelpOverlayActive(true);
              }}
            >
              <i
                className="fa fa-chevron-circle-right" 
                style={{
                  fontSize:'22px',
                  color: `${style ? style.color : "#F55F15"}`, 
                  padding: '4px'
                }}
              />
            </div>

            {isHelpOverlayActive && (
              <Overlay onClose={()=>setIsHelpOverlayActive(false)}>
                <HelpOverlay />
              </Overlay>
            )}
          </React.Fragment>
        );
      })()}
    </div>
  );
}

export default withRouter(TipBox);
