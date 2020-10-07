import React from 'react';
import ActivityForm from '../../components/activity-form';
import { connect } from 'react-redux';

import './style/add-exercise.css';

function AddExercise(props) {
  const { goBack } = props.history;

  return (
    <div className="add-exercise">
      <ActivityForm 
        onClose={()=> goBack()}
        type="EXERCISE"
      />
    </div>
  );
}


export default connect()(AddExercise);