import React, { useState } from 'react';

import './style/index.css';

function OverlayDetail(props){

  const [overlayDetailView, setOverlayDetailView] = useState("INTRO");

  const { 
    color,
    intro , 
    tips, 
    resources, 
    name,
    selfcheck,
    mammogram,
  }  = props;

  return (
    <div className="overlay-detail">
      <div className="overlay-detail__header-section">
        <div className="overlay-detail__header">
          {name}
        </div>

        <div className="overlay-detail__section-header">
          <button 
            className="overlay-detail__button"
            style={overlayDetailView==="INTRO" ? {borderBottom: `.4rem solid ${color}`}: {}}
            onClick={()=> setOverlayDetailView("INTRO")}
          >
            INTRO
          </button>


          {(()=>{
            // show tips for everything else
            if(name!=="BREAST HEALTH") {
              return (
                <button 
                  style={overlayDetailView==="TIPS" ? {borderBottom: `.4rem solid ${color}`}: {}}
                  onClick={()=> setOverlayDetailView("TIPS")}
                >
                  TIPS
                </button>
              );
            } else {
              return (
                <React.Fragment>
                <button 
                  style={overlayDetailView==="SELF CHECK" ? {borderBottom: `.4rem solid ${color}`}: {}}
                  onClick={()=> setOverlayDetailView("SELF CHECK")}
                >
                  SELF CHECK
                </button>
                <button 
                  style={overlayDetailView==="MAMMOGRAM" ? {borderBottom: `.4rem solid ${color}`}: {}}
                  onClick={()=> setOverlayDetailView("MAMMOGRAM")}
                >
                  MAMMOGRAM
                </button>
                </React.Fragment>
              )
            }

            // show mammogram and self check for breasst health
          })()}


          <button 
            style={overlayDetailView==="RESOURCES" ? {borderBottom: `.4rem solid ${color}`}: {}}
            onClick={()=> setOverlayDetailView("RESOURCES")}
          >
            RESOURCES
          </button>
        </div>
      </div>

      {(()=>{
        switch(overlayDetailView) {
          case "INTRO":
           return (
             <div className="overlay-detail__intro">
              {intro}
            </div>
           );
          
          case "TIPS" :
            return (
              <div className="overlay-detail__tips">
              {tips}
              </div>
            );

          case "SELF CHECK" :
            return (
              <div className="overlay-detail__tips">
              {selfcheck}
              </div>
            );

          case "MAMMOGRAM" :
            return (
              <div className="overlay-detail__tips">
              {mammogram}
              </div>
            );

          case "RESOURCES" :
            return (
              <div className="overlay-detail__resources">
                {resources}
              </div>
            );
        }
      })()}
    </div>
  ) 
}

export default(OverlayDetail)