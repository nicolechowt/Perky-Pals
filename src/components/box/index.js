import React from 'react';
import { connect } from 'react-redux';
import { ADD_EXERCISE_MINUTES } from '../../reducers/actions'
import { withRouter } from "react-router-dom";

import Button from '../button';

import './style/box.css';

function Box(props) {
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

    onClick,
  } = props;

  // const addLink = `/add-${header.toLowerCase()}`;
  // const pageLink = header.toLowerCase();

  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div 
      className="box"
      style={{background: color}}
    >
      <div className="box__header">{header}</div>
      {length>=0 && <span className="box__length"> {length}</span>}
      {unit && <span className="box__unit"> {unit}</span>}
      {goal && <span className="box__goal"> of your {goal} {unit} {frequency} goal</span>}

      {children && <div>{children}</div>}

      <div 
        className="box__add"
        onClick={(event)=>{
          event.stopPropagation();
          onClick();
        }}
      >
        {!hideAdd && (
          <i
            className="fa fa-chevron-circle-right" 
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

export default withRouter(Box);
