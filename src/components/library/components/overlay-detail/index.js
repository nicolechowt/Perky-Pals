import React, { useState } from 'react';

function OverlayDetail(props){

  const [overlayDetailView, setOverlayDetailView] = useState("INTRO");

  const { 
    intro , 
    tips, 
    resources 
  }  = props;

  return (
    <div className="overlay-detail">
      <div className="overlay-detail__header">
        <button onClick={()=> setOverlayDetailView("INTRO")}>
          INTRO
        </button>

        <button onClick={()=> setOverlayDetailView("TIPS")}>
          TIPS
        </button>

        <button onClick={()=> setOverlayDetailView("RESOURCES")}>
          RESOURCES
        </button>
      </div>

      {(()=>{
        switch(overlayDetailView) {
          case "INTRO":
           return (
             <div>
              {intro}
            </div>
           );
          
          case "TIPS" :
            return (
              <div>
              {tips}
              </div>
            );

          case "RESOURCES" :
            return (
              <div>
                {resources}
              </div>
            );
        }
      })()}
    </div>
  ) 
}

export default(OverlayDetail)