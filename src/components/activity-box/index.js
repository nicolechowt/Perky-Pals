import React from 'react';
import { connect } from 'react-redux';
import { ADD_EXERCISE_MINUTES } from '../../reducers/actions'
import { withRouter } from "react-router-dom";

import Box from '../box';
import Button from '../button';

import './style/activity-box.css';

function ActivityBox(props) {
  const { 
    addExerciseMinute,
    children,
    display,
    frequency,
    goal,
    header,
    hideAdd,
    length,
    color,
    unit,
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
      <div className="activity-box__header">{header}</div>
      {length>=0 && <span className="activity-box__length"> {length}</span>}
      {unit && <span className="activity-box__unit"> {unit}</span>}
      {goal && <span className="activity-box__goal"> of your {goal} {unit} {frequency} goal</span>}

      {children && <div>{children}</div>}

      <div 
        className="activity-box__plus"
        onClick={(event)=>{
          event.stopPropagation();
          nextPath(addLink);
        }}
      >
        {!hideAdd && (
          <i
            class="fa fa-plus-circle"
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
