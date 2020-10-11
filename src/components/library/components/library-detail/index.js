import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";

import './style/index.css';

function LibraryDetail(props){
  const [libraryDetailView, setLibraryDetailView] = useState("INTRO");

  const { 
    color,
    history,
    intro , 
    location, 
    mammogram,
    name,
    resources, 
    selfcheck,
    tips, 
  }  = props;

  const { goBack } = history;

  const search = location.search;
  const urlParams = new URLSearchParams(search);
  const param = urlParams.get('view');

  const paramUppercase = param && param.toUpperCase();

  useEffect(()=>{
    if(!paramUppercase) return;

    setLibraryDetailView(paramUppercase);
  }, [paramUppercase]);

  return (
    <div className="library-detail">
      <div 
        className="library-detail__back-button"
        onClick={()=> goBack()}
        style={{ zIndex: 3 }}
      >
        <i
          className="fa fa-angle-left"
          style={{
            fontSize:'36px',
            color: "#4B5B7E", 
            padding: '4px',
          }}
        />
      </div>

      <div className="library-detail__header-section">
        <div className="library-detail__header">
          {name}
        </div>

        <div className="library-detail__section-header">
          <button 
            className="library-detail__button"
            style={libraryDetailView==="INTRO" ? {borderBottom: `.4rem solid ${color}`}: {}}
            onClick={()=> setLibraryDetailView("INTRO")}
          >
            INTRO
          </button>


          {(()=>{
            // show tips for everything else
            if(name!=="BREAST HEALTH") {
              return (
                <button 
                  style={libraryDetailView==="TIPS" ? {borderBottom: `.4rem solid ${color}`}: {}}
                  onClick={()=> setLibraryDetailView("TIPS")}
                >
                  TIPS
                </button>
              );
            } else {
              return (
                <React.Fragment>
                <button 
                  style={libraryDetailView==="SELF-CHECK" ? {borderBottom: `.4rem solid ${color}`}: {}}
                  onClick={()=> setLibraryDetailView("SELF-CHECK")}
                >
                  SELF CHECK
                </button>
                <button 
                  style={libraryDetailView==="MAMMOGRAM" ? {borderBottom: `.4rem solid ${color}`}: {}}
                  onClick={()=> setLibraryDetailView("MAMMOGRAM")}
                >
                  MAMMOGRAM
                </button>
                </React.Fragment>
              )
            }

            // show mammogram and self check for breasst health
          })()}


          <button 
            style={libraryDetailView==="RESOURCES" ? {borderBottom: `.4rem solid ${color}`}: {}}
            onClick={()=> setLibraryDetailView("RESOURCES")}
          >
            RESOURCES
          </button>
        </div>
      </div>

      {(()=>{
        switch(libraryDetailView) {
          case "INTRO":
           return (
             <div className="library-detail__intro">
              {intro}
            </div>
           );
          
          case "TIPS" :
            return (
              <div className="library-detail__tips">
              {tips}
              </div>
            );

          case "SELF-CHECK" :
            return (
              <div className="library-detail__tips">
              {selfcheck}
              </div>
            );

          case "MAMMOGRAM" :
            return (
              <div className="library-detail__tips">
              {mammogram}
              </div>
            );

          case "RESOURCES" :
            return (
              <div className="library-detail__resources">
                {resources}
              </div>
            );
        }
      })()}
    </div>
  ) 
}

export default withRouter(LibraryDetail);