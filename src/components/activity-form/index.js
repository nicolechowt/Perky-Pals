import React, { useState } from 'react';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router-dom';

import { 
  ADD_EXERCISE_MINUTES,
  ADD_MINDFULNESS_MINUTES,
} from '../../reducers/actions'

import './style/activity-form.css';

function ActivityForm(props) {

  console.log('****activity props', props)
  const { 
    // dispatch props
    addExerciseMinute, 
    addMindfulnessMinute, 
    addModal, 
    
    // props
    exerciseMinutes, 
    type
  } = props;

  const onClick = () => {
    switch(type) {
      case "EXERCISE" :
        addExerciseMinute(30);
        setRedirect(true);
        addModal('yay points');
        break;

      case "MINDFULNESS":
        addMindfulnessMinute(30);
        setRedirect(true);
        addModal('yay points');
        break;
        
      case "SLEEP":
        addExerciseMinute(30);
        setRedirect(true);
        addModal('yay points'); 
        break;
      
      case "WATER":
        addExerciseMinute(30);
        setRedirect(true);
        addModal('yay points');
        break;
      
      case "FRUITS":
        addExerciseMinute(30);
        setRedirect(true);
        addModal('yay points');
        break;

      case "SELF_CHECK":
        addExerciseMinute(30);
        setRedirect(true);
        addModal('yay points');
        break;
  
      case "MAMMOGRAM":
        addExerciseMinute(30);
        setRedirect(true);
        addModal('yay points');
        break;
      
      default:
    }
  }

  const [redirect, setRedirect] = useState(false);

  if(redirect) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  return (
    <div>
      <h1>ADD {type} </h1>
      
      <form action="">

      <div className="activity-form__input-field">
        <label htmlFor="date">DATE</label>
        <select name="date" id="date">
          "date"
        </select>
      </div>

      <div className="activity-form__input-field">
        <label htmlFor="activity">WHAT DID YOU DO</label>
        <select name="activity" id="activity">
          <option value="hike">Hike</option>
          <option value="run">Run</option>
          <option value="yoga">Yoga</option>
        </select>
      </div>

      <div className="activity-form__input-field">
        <label htmlFor="duration">HOW LONG WAS IT</label>
        <input type="duration" name="duration" />
      </div>
      </form>

      <button
        onClick={onClick}
      >done</button>
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    dashboardReducer,
  } = state;

  return {  
    exerciseMinutes: dashboardReducer.exercise,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    addExerciseMinute: (data) => dispatch({ type: ADD_EXERCISE_MINUTES, data}),
    addMindfulnessMinute: (data) => dispatch({ type: ADD_MINDFULNESS_MINUTES, data}),
    addModal: (data) => dispatch({ type: 'ADD_MODAL', data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivityForm)
