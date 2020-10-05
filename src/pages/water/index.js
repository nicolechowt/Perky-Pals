import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { COLORS } from '../../../src/enums/colors'

import './style/water.css';

import BarGraph from '../../components/bar-graph';

function Water(props) {
  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const todaysWater = dashboard.water || 0;
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const waterArr = [];

  weeklyData.map(day=>{
    if(day.water>=0){
      waterArr.push(day.water);
    }
  });

  waterArr.unshift(todaysWater);

  return (
    <div className="exercise">
        <button onClick={() => goBack()}>GO BACK</button>
        <h1>WATER</h1>
        <h2>YOUR WEEK SO FAR</h2>

        <BarGraph 
          color={COLORS.WATER}
          data={waterArr}
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