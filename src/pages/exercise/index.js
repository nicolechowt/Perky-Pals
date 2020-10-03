import React from 'react';
import { connect } from 'react-redux';
import { ADD_EXERCISE_MINUTES } from '../../reducers/actions'


import './style/activity-box.css';

function Exercise(props) {
  const { goBack } = props.history;

  return (
    <div className="activity-box">
        <h1>EXERCISE</h1>
        <h2>YOUR WEEK SO FAR</h2>
        <button onClick={() => goBack()}>GO BACK</button>
    </div>
  );
}

export default connect()(Exercise);