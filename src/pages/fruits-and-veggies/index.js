import React from 'react';
import { connect } from 'react-redux';

import './style/fruits-and-veggies.css';
import { COLORS } from '../../../src/enums/colors'
import BarGraph from '../../components/bar-graph';

function FruitsAndVeggies(props) {

  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const todaysFruitsAndVeggies = dashboard.fruitsAndVeggies || [];
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const fruitsAndVeggiesArr = [];

  const fruitsAndVeggies = dashboard && dashboard.fruitsAndVeggies;
  const fruitsAndVeggiesGoal = dashboard.goals && dashboard.goals.fruitsAndVeggies;

  weeklyData.map(day=>{
    if(day.fruitsAndVeggies>=0){
      fruitsAndVeggiesArr.push(day.fruitsAndVeggies);
    }
  });

  fruitsAndVeggiesArr.unshift(todaysFruitsAndVeggies);  

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

        <div className="page__header">FRUITS AND VEGGIES</div>
        <div className="page__sub-header">YOUR WEEK SO FAR</div>

        <BarGraph 
          color={COLORS.FRUITS_AND_VEGGIES}
          data={fruitsAndVeggiesArr}
        />
        
        <div className="page__caption">
          {fruitsAndVeggiesGoal-fruitsAndVeggies>0 ? (
            <div>{fruitsAndVeggiesGoal-fruitsAndVeggies} more servings to go!</div>
          ): (
            <div>GOAL ACHIEVED! WAY TO KICK BUTT</div>
          )}
        </div>
        
        <div 
          className="page__tips-perks"
          style={{background: COLORS.FRUITS_AND_VEGGIES}}
        >
          <div className='page__tips'>
            <div className='page__tips-header'>tips header</div>
            Tips stuff
          </div>

          <div 
            className="page__perks"
            style={{color: COLORS.FRUITS_AND_VEGGIES}}
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
)(FruitsAndVeggies);