import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

import './style/sleep.css';
import ActivityRing from '../../components/activity-ring';
import BarGraph from '../../components/bar-graph';

function ActivityItem(props) {
  const { activity, duration, day} = props;

  console.log('day', day);

  return (
    <div>
      {day !=="TODAY" ? <span>{day} </span> : <span>TODAY</span>}
      {activity && <div className="exercise__activity-item"> {activity} </div>}
      {duration && <span>{duration}</span>}
    </div>

  )
}

const obj = {};

function Sleep(props) {
  let totalExerciseMinutes = 0;

  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const exerciseGoal = dashboard.goals && dashboard.goals.exercise;

  const todaysExercises = dashboard.exercises || [];
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const sleepArr = [];

  weeklyData.map(day=>{
    if(day.sleep>=0){
      sleepArr.push(day.sleep);
    }
  });

  return (
    <div className="exercise">
        <button onClick={() => goBack()}>GO BACK</button>
        <h1>SLEEP</h1>
        <h2>YOUR WEEK SO FAR</h2>

        <BarGraph 
          color="#3777FF"
          data={sleepArr}
        />
        
        <div>
          Tips stuff
        </div>

        <div>
          Perks stuff
        </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    currentUserReducer,
    dashboardReducer,
  } = state;

  return {   
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Sleep);