import React from 'react';
import { connect } from 'react-redux';

import './style/sleep.css';
import BarGraph from '../../components/bar-graph';
import { COLORS } from '../../../src/enums/colors'


function Sleep(props) {
  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const todaysSleep = dashboard.sleep || [];
  console.log('todaysSleep', todaysSleep);
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const sleep = dashboard && dashboard.sleep;
  const sleepGoal = dashboard.goals && dashboard.goals.sleep;

  const sleepArr = [];

  weeklyData.map(day=>{
    if(day.sleep>=0){
      sleepArr.push(day.sleep);
    }
  });

  sleepArr.unshift(todaysSleep);

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

        <div className="page__header">SLEEP</div>
        <div className="page__sub-header">YOUR WEEK SO FAR</div>

        <BarGraph 
          color={COLORS.SLEEP}
          data={sleepArr}
        />

        <div className="page__caption">
          {sleepGoal-sleep>0 ? (
            <div>You didn't quite meet your goal of {sleepGoal} hours of sleep a night :(</div>
          ): (
            <div>GOAL ACHIEVED! WAY TO KICK BUTT</div>
          )}
        </div>
        
          <div 
            className="page__tips-perks"
            style={{background: COLORS.SLEEP}}
          >
            <div className='page__tips'>
              <div className='page__tips-header'>tips header</div>
              Tips stuff
            </div>

            <div 
              className="page__perks"
              style={{color: COLORS.SLEEP}}
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
)(Sleep);