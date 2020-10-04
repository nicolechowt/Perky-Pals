import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

import './style/water.css';
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

function Water(props) {
  let totalExerciseMinutes = 0;

  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const exerciseGoal = dashboard.goals && dashboard.goals.exercise;

  const todaysWater = dashboard.water || 0;
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const waterArr = [];

  weeklyData.map(day=>{
    if(day.water>=0){
      waterArr.push(day.water);
    }
  });

  if(todaysWater>0) {
    waterArr.unshift(todaysWater);
  }

  console.log('water', waterArr)

  return (
    <div className="exercise">
        <button onClick={() => goBack()}>GO BACK</button>
        <h1>WATER</h1>
        <h2>YOUR WEEK SO FAR</h2>

        <BarGraph 
          color="#F278C3"
          data={waterArr}
          divideByTen={true}
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
)(Water);