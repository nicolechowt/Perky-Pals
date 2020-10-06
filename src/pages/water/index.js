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

  const water = dashboard && dashboard.water;
  const waterGoal = dashboard.goals && dashboard.goals.water;

  weeklyData.map(day=>{
    if(day.water>=0){
      waterArr.push(day.water);
    }
  });

  waterArr.unshift(todaysWater);


  return (
    <div className="page">
      <div className="page__progess">
        <div          
          className="page__back-button"
          onClick={() => goBack()}
        >
          <i
            class="fa fa-angle-left"
            style={{
              fontSize:'36px',
              color: "#4B5B7E", 
              padding: '4px'
            }}
          />
        </div>

        <div className="page__header">WATER</div>
        <div className="page__sub-header">YOUR WEEK SO FAR</div>

        <BarGraph 
          color={COLORS.WATER}
          data={waterArr}
        />

        <div className="page__caption">
          {waterGoal-water>0 ? (
            <div>{waterGoal-water} more oz to go!</div>
          ): (
            <div>GOAL ACHIEVED! WAY TO KICK BUTT</div>
          )} 
        </div>
        
        <div 
          className="page__tips-perks"
          style={{background: COLORS.WATER}}
        >
          <div className='page__tips'>
            <div className='page__tips-header'>tips header</div>
            Tips stuff
          </div>

          <div 
            className="page__perks"
            style={{color: COLORS.WATER}}
          >
            <div className="page__perks-header">
              perks header
            </div>
            Perks stuff
        </div>
      </div>
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