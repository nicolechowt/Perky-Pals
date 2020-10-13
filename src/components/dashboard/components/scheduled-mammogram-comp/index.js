import React, { useState } from 'react';
import { connect } from 'react-redux';

import 'react-calendar/dist/Calendar.css';


import {
  withRouter,
} from "react-router-dom";

import './style/scheduled-mammogram-comp.css';

function ScheduledMammogramComp(props) {
  const {
    year,
    month,
    day,
    future,
  } = props;

  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div>
      {(()=>{
        if(future) {
          return (
            <div>
              <div>
                Sweet! You have an appointment scheduled for {month}/{day}. 
              </div>
            
              <div 
                className="scheduled-mammogram-comp"
                onClick={(event)=>{
                  event.stopPropagation();
                  nextPath('/library/breast-health?view=mammogram');
                }}
              >
                Anxious? Don't sweat it! Check out our resources to ease your nerves.
                <i
                  className="fa fa-chevron-circle-right" 
                  style={{
                    fontSize:'14px',
                    padding: '4px'
                  }}
                />
              </div>
            </div>
          );
        } 

        return (
          <div>
            You're way ahead of the curve by getting a mammogram on {`${month}/${day}`}. 
            <div 
              className="scheduled-mammogram-comp"
              onClick={(event)=>{
                event.stopPropagation();
                nextPath('/library/breast-health?view=self-check');
              }}
            >
              Until the next one, don't forget to keep up with your monthly self-checks. Click here to see if you've been doing them correctly!
              <i
                className="fa fa-chevron-circle-right" 
                style={{
                  fontSize:'14px',
                  padding: '4px'
                }}
              />
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    dashboardReducer,
    currentUserReducer,
  } = state;

  return {  
    dashboard: dashboardReducer,    
    currentUser: currentUserReducer.currentUser,
    exerciseMinutes: dashboardReducer.exercise,
    goals: dashboardReducer.goals,
    pointsClaimed: dashboardReducer.pointsClaimed,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(ScheduledMammogramComp)
);

