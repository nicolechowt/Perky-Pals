import React from 'react';
import { connect } from 'react-redux';
import { ADD_EXERCISE_MINUTES } from '../../reducers/actions'
import { Link } from "react-router-dom";

import Box from '../box';
import Button from '../button';

import './style/activity-box.css';

export default function ActivityBox(props) {
  const { 
    addExerciseMinute,
    children,
    display,
    frequency,
    goal,
    header,
    hideAdd,
    length,
    unit,
  } = props;

  const addLink = `/add-${header.toLowerCase()}`;
  const pageLink = header.toLowerCase();

  return (
    <div className="activity-box">
      <Box>
        <Link to={pageLink}>
          <h2>{header}</h2>
          {length && <span> {length}</span>}
          {unit && <span> {unit}</span>}
          {goal && <span> of your {goal} {unit} {frequency} goal</span>}

          {children && <div>{children}</div>}
        </Link>
      </Box>

      <div className="activity-box__plus">
        {!hideAdd && (
          <Button to={addLink}>
            +
          </Button>
        )}
      </div>
    </div>
  );
}
