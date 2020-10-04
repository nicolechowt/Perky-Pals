import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './style/dashboard.css';
import ActivityBox from '../activity-box';
import Box from '../box';
import Overlay from '../overlay';

import { 
  SAVE_CURRENT_USER,
  SAVE_TO_DASHBOARD, 
} from '../../reducers/actions'
import ProgressRing from '../progress-ring';

function Dashboard(props) {
  const { 
    saveToDashboard, 
    saveCurrentUser,
    removeModal,

    currentUser = [],
    dashboard, 
    location, 
    users, 
    modal,
  } = props;

  const search = location.search;
  const urlParams = new URLSearchParams(search);

  const param = urlParams.get('user');
  const userId = parseInt(param) || 1;

  const user = users.filter(user=>user.id===userId);

  const goals = currentUser[0] && currentUser[0].goals;
  const data =  currentUser[0] && currentUser[0].data;

  const points = currentUser[0] && currentUser[0].points;
  
  const doneSelfCheckThisMonthInitial = currentUser[0] && currentUser[0].doneSelfCheckThisMonth;

  const scheduledMammogramInitial = currentUser[0] && currentUser[0].scheduledMammogram;

  const todaysData = data && data[0];

  const dashboardData = {
    todaysData,
    goals,
    points,
    doneSelfCheckThisMonth: doneSelfCheckThisMonthInitial,
    scheduledMammogram: scheduledMammogramInitial,
  }

  const weeklyData = currentUser[0] && currentUser[0].weeklyData;

  let mindfullnessWeek = 0;
  let exerciseWeek = 0;

  if(weeklyData){
    weeklyData.forEach(day => {
      if(day.mindfulness) {
        mindfullnessWeek++;
      }

      if(day.exercise) {
        exerciseWeek+= day.exercise;
      }
    })
  }
  
  const id = currentUser[0] && currentUser[0].id;

  const exercise = dashboard && dashboard.exercise;
  const exerciseGoal = dashboard.goals && dashboard.goals.exercise;

  const mindfulness = dashboard && dashboard.mindfulness;
  const mindfulnesseGoal = dashboard.goals && dashboard.goals.mindfulness;

  const sleep = dashboard && dashboard.sleep;
  const sleepGoal = dashboard.goals && dashboard.goals.sleep;

  const water = dashboard && dashboard.water;
  const waterGoal = dashboard.goals && dashboard.goals.water;

  const fruitsAndVeggies = dashboard && dashboard.fruitsAndVeggies;
  const fruitsAndVeggiesGoal = dashboard.goals && dashboard.goals.fruitsAndVeggies;

  const selfCheck = dashboard && dashboard.doneSelfCheckThisMonth;
  const mammogram = dashboard && dashboard.scheduledMammogram;

  const content = modal && modal.content;


  const nextMonth = (new Date().getMonth()+1)%12 + 1;

  useEffect(()=>{ 
    // based on the query param, load that user's hardcoded data from store
    if(Object.entries(currentUser).length === 0) {
      saveCurrentUser(user)
    };
  }, [currentUser, saveCurrentUser, user]);

  useEffect(()=> {
    // when the id changes, that's when we know which user's data to display
    // save dashboard relevant data to dashboard reducer
    if(id && Object.entries(dashboard).length === 0) {
      saveToDashboard(dashboardData);
    }
  }, [dashboard, dashboardData, id, saveToDashboard]);


  const svgWidth = 250;
  const arcWidth = 14;

  const exerciseProgressPercentage =((exerciseWeek+exercise)/exerciseGoal)*100;
  const mindfulnessProgressPercentage =((mindfullnessWeek+mindfulness)/mindfulnesseGoal)*100;
  const sleepProgressPercentage=(sleep/sleepGoal)*100;
  const waterProgressPercentage=(water/waterGoal)*100;
  const fruitsAndVeggiesPercentage=(fruitsAndVeggies/fruitsAndVeggiesGoal)*100;

  return (
    <div className="dashboard">
      {(()=> {
        if(!content) return;

        if(content.title){
          return(
            <Overlay onClose={()=>{
              removeModal();
            }}>
              {content.title}
              {content.body}
            </Overlay>
          )
        }
      })()}

      <div>
        YOUR PROGRESS
      </div>

      <ProgressRing
        svgWidth={svgWidth}
        arcWidth={arcWidth}
        exerciseProgressPercentage={exerciseProgressPercentage}
        mindfulnessProgressPercentage={mindfulnessProgressPercentage}
        sleepProgressPercentage={sleepProgressPercentage}
        waterProgressPercentage={waterProgressPercentage}
        fruitsAndVeggiesPercentage={fruitsAndVeggiesPercentage}
        selfCheck={selfCheck}
        mammogram={mammogram}
      />

      <Box>
        <div>
          tips
        </div>
      </Box>

      <ActivityBox 
        display="number"
        goal={exerciseGoal}
        header="EXERCISE"
        length={exerciseWeek+exercise || 0}
        unit="minutes"
        frequency="weekly"
      />

      <ActivityBox 
        goal={mindfulnesseGoal}
        header="MINDFULNESS"
        length={mindfullnessWeek+mindfulness || 0}
        unit="times"
        frequency="weekly"
      />

      <ActivityBox 
        header="SLEEP"
        goal={sleepGoal}
        length={sleep}
        unit="hours"
        frequency="daily"
      />

      <ActivityBox 
        header="WATER"
        goal={waterGoal}
        length={water}
        unit="oz"
        frequency="daily"
      />

      <ActivityBox 
        header="FRUITS-AND-VEGGIES"
        goal={fruitsAndVeggiesGoal}
        length={fruitsAndVeggies}
        unit="servings"
        frequency="daily"
      />

      <ActivityBox 
        header="SELF-CHECK"
        hideAdd={selfCheck}
      >
        {selfCheck ? 
          (
            <div>Yay, it is so important that you perform this monthly bleh bleh bleh bleh <p>next check: {nextMonth}/1</p></div>
          ): 
          (
            <div>Time to check your boobs! We’ll walk you through the process</div>
          )
        }
      </ActivityBox>

      <ActivityBox 
        header="MAMMOGRAM"
        hideAdd={mammogram}
      >
        {(()=> {
          let mammogramDateObj;

          if(mammogram) {
            if(typeof mammogram==='string'){
              mammogramDateObj = new Date(mammogram);

              return (
                <div>yay scheduled for {
                  mammogramDateObj.getMonth()+1}/{mammogramDateObj.getDate()
                } </div>
              )
            }

            return (
              <div>yay scheduled for {
                mammogram.getMonth()+1}/{mammogram.getDate()
              } </div>
            )
          }

          return (<div>Don’t forget about your annual mammogram</div>)
        })()}
      </ActivityBox>
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    currentUserReducer, 
    dashboardReducer,
    modalReducer,
    userReducer, 
  } = state;

  return { 
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,    
    modal: modalReducer,
    users: userReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    saveCurrentUser: (data) => dispatch({ type: SAVE_CURRENT_USER, data}),
    saveToDashboard: (data) => dispatch({ type: SAVE_TO_DASHBOARD, data}),
    removeModal: () => dispatch({ type: 'REMOVE_MODAL'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)