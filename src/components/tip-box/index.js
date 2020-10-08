import React from 'react';
import { connect } from 'react-redux';
import { ADD_EXERCISE_MINUTES } from '../../reducers/actions'
import { withRouter } from "react-router-dom";

import Box from '../box';
import Button from '../button';

import './style/tip-box.css';

function TipBox(props) {
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

    console.log('props.name', props.name)
  // const addLink = `/add-${header.toLowerCase()}`;
  // const pageLink = header.toLowerCase();

  // const nextPath = (path) => {
  //   props.history.push(path);
  // }

  return (
    <div 
      className="tip-box"
      style={{background: color}}
      // onClick={()=>{nextPath(pageLink)}}
    >
      {(()=>{
        if(props.name==='Juliana') {
          return (
            <div>
              tip for Juliana
            </div>
          )
        } else if(props.name==='Bella') {
          return(
            <div>
              We’ve got your back. Check out our tips on how to incorporate mini workouts into your day.
            </div>
          );
        } else if(props.name==='Angie') {
          return(
            <div>
              Tip for angie
            </div>
          )
        }
      })()}
    </div>
  );
}

export default withRouter(TipBox);
