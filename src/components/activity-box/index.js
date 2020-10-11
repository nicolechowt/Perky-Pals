import React from 'react';
import { withRouter } from "react-router-dom";

import './style/activity-box.css';

function ActivityBox(props) {
  const { 
    children,
    frequency,
    goal,
    header,
    hideAdd,
    length,
    color,
    unit,
    title,
  } = props;

  const addLink = `/add-${header.toLowerCase()}`;
  const pageLink = header.toLowerCase();

  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div 
      className="activity-box"
      style={{background: color}}
      onClick={()=>{nextPath(pageLink)}}
    >
      {(()=>{
        let emptyStateText = '';

        if(goal && header!=="SELF-CHECK" && header!=="MAMMOGRAM") {
          // goals for everything but self-check and mammogram
          return (
            <div>
              <div className="activity-box__header">{header}</div>
              {length>=0 && <span className="activity-box__length"> {length}</span>}
              {title && <span className="activity-box__title"> {title}</span>}
              {unit && <span className="activity-box__unit"> {unit}</span>}
              {goal && <span className="activity-box__goal"> of your {goal} {unit} {frequency} goal</span>}
              {children && <div>{children}</div>}
            </div>
          );
        } else if (
          goal && 
          (header==="SELF-CHECK" || header==="MAMMOGRAM")
        ){
          // goal for self-check or mammogram
          return (
            <div>
              <div className="activity-box__header">{header}</div>
              {title && <span className="activity-box__title"> {title}</span>}
              {children && <div>{children}</div>}
            </div>
          );
        } else {
          // empty state
          if(header==='EXERCISE') {
            emptyStateText='There are so many ways to get a little more active. Yes - you can.'; 
          } else if(header==='MINDFULNESS') {
            emptyStateText='Taking even just a minute to pause in your everyday life can count as a mindful moment.';
          } else if(header==='WATER') {
            emptyStateText='Start small, we can set an achievable goal to begin.';
          } else if(header==='FRUITS-AND-VEGGIES'){
            emptyStateText='How about grabbing an apple on the way out the door today?';
          } else if(header==="SLEEP") {
            emptyStateText='We all sleep anyway, why not set a goal to earn some perks? ;)';
          } else if(header==="SELF-CHECK") {
            emptyStateText='Get to know your boobs, set up a monthly goal to perform a self-check. We will even remind you!';
          } else if(header==="MAMMOGRAM") {
            emptyStateText='We get it, no one loves getting a mammogram. But studies show early detection is key. Setting a goal is half the bettle.' ;
          }

          return (
            <div>
              {emptyStateText}
            </div>
          )
        }
      })()}

      <div 
        className="activity-box__plus"
        onClick={(event)=>{
          event.stopPropagation();
          nextPath(addLink);
        }}
      >
        {!hideAdd && (
          <i
            className="fa fa-plus-circle"
            style={{
              fontSize:'22px',
              color: "#FFFFFF", 
              padding: '4px'
            }}
          />
        )}
      </div>
    </div>
  );
}

export default withRouter(ActivityBox);
