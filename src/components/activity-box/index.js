import React from 'react';
import { connect } from 'react-redux';
import { ADD_EXERCISE_MINUTES } from '../../reducers/actions'

import Box from '../box';
import Button from '../button';

import './style/activity-box.css';

export default function ActivityBox(props) {
  const { 
    addExerciseMinute,
    display,
    goal,
    header,
    length,
    unit,
    frequency,
  } = props;

  const link = `/add-${header.toLowerCase()}`;

  return (
    <div className="activity-box">
      <Box>
        <h2>{header}</h2>
        <p>{length}</p>{unit}
        <p>of your {goal} {unit} {frequency} goal</p>
        <Button to={link}
          className="activity-box__plus"
        >
          +
        </Button>
      </Box>
    </div>
  );
}
