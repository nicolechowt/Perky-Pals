import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './style/dashboard.css';
import ActivityBox from '../activity-box';
import Overlay from '../overlay';

import { 
  SAVE_CURRENT_USER,
  SAVE_TO_DASHBOARD, 
} from '../../reducers/actions'
import ProgressRing from '../progress-ring';
import Friend from '../friend';
import TipBox from '../tip-box';
import PointsOverlay from './components/points-overlay';
import { COLORS } from '../../../src/enums/colors';

function Dashboard(props) {
  const { 
    addNotes,
    removeModal,
    saveCurrentUser,
    saveToDashboard, 

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

  const currentUserName = currentUser[0] && currentUser[0].name;
  
  const dashboardTipInitial = currentUser[0] && currentUser[0].dashboardTip;

  const doneSelfCheckThisMonthInitial = currentUser[0] && currentUser[0].doneSelfCheckThisMonth;

  const scheduledMammogramInitial = currentUser[0] && currentUser[0].scheduledMammogram;

  const previousSelfCheckNotesInitial = currentUser[0] && currentUser[0].previousSelfCheckNotes;

  const todaysData = data && data[0];
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

  // just getting the first tip for now
  const dashboardTip = dashboard && dashboard.dashboardTip;
  const dashboardFirstTip = dashboardTip && dashboardTip[0]

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
      const dashboardData = {
        todaysData,
        goals,
        points,
        doneSelfCheckThisMonth: doneSelfCheckThisMonthInitial,
        dashboardTip: dashboardTipInitial,
        scheduledMammogram: scheduledMammogramInitial,
        previousSelfCheckNotes: previousSelfCheckNotesInitial,
      }

      saveToDashboard(dashboardData);
      previousSelfCheckNotesInitial && previousSelfCheckNotesInitial.map(note=>{
        addNotes(note);
      })
    }
  }, [ 
    addNotes,
    dashboard, 
    doneSelfCheckThisMonthInitial, 
    dashboardTipInitial,
    goals,
    id, 
    points, 
    previousSelfCheckNotesInitial, 
    saveToDashboard, 
    scheduledMammogramInitial, 
    todaysData
  ]);

  useEffect(()=>{
    if(props.history.action==='PUSH' || props.history.action==='POP') {
      removeModal();
    }
  }, [removeModal, props.history.action])

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
            <Overlay 
              onClose={()=>removeModal()}
              modal
            >
              <PointsOverlay 
                title={content.title}
                body1={content.body1}
                number={content.number}
                body2={content.body2}
                footer={content.footer}
              />
            </Overlay>
          )
        }
      })()}

      <div className="dashboard__header">
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

    <div className="dashboard__stats">
        <div className="dashboard__exercise">
          <ActivityBox 
            color={COLORS.EXERCISE}
            display="number"
            goal={exerciseGoal}
            header="EXERCISE"
            length={exerciseWeek+exercise || 0}
            unit="minutes"
            frequency="weekly"
          />
        </div>

        <div className="dashboard__mindfulness">
          <ActivityBox 
            color={COLORS.MINDFULNESS}
            goal={mindfulnesseGoal}
            header="MINDFULNESS"
            length={mindfullnessWeek+mindfulness || 0}
            unit="times"
            frequency="weekly"
          />
        </div>

        <div className="dashboard__tips">
          <div>
            <TipBox 
              title={dashboardFirstTip && dashboardFirstTip.title}
              text={dashboardFirstTip && dashboardFirstTip.text}
              link={dashboardFirstTip && dashboardFirstTip.link}
            />
          </div>
        </div>

        <div className="dashboard__water">
          <ActivityBox 
            color={COLORS.WATER}
            header="WATER"
            goal={waterGoal}
            length={water}
            unit="oz"
            frequency="daily"
          />
        </div>

        <div className="dashboard__veggies">
          <ActivityBox 
            color={COLORS.FRUITS_AND_VEGGIES}
            header="FRUITS-AND-VEGGIES"
            goal={fruitsAndVeggiesGoal}
            length={fruitsAndVeggies}
            unit="servings"
            frequency="daily"
          />
        </div>


      <div className="dashboard__friend">

      {(()=> {
        if(currentUserName==='Bella'){
          return(
            <Friend 
              name='Juliana'
              exercise
              mindfulness
              sleep={false}
              water
              fruitsAndVeggies
              selfCheck
              mammogram
            />
          );
        } else if(currentUserName==='Juliana') {
          return(
            <Friend 
              name='Bella'
              exercise={false}
              mindfulness={false}
              sleep={false}
              water={false}
              fruitsAndVeggies={false}
              selfCheck
              mammogram={false}
            />
          );
        } else {
          return (
            <Friend 
              name='Carol'
              exercise
              mindfulness={false}
              sleep={false}
              water
              fruitsAndVeggies={false}
              selfCheck
              mammogram={false}
            />
          )
        }
      })()}


      </div>

      <div className="dashboard__sleep">
        <ActivityBox 
          color={COLORS.SLEEP}
          header="SLEEP"
          hideAdd={sleep>0}
          goal={sleepGoal}
          length={sleep}
          unit="hours"
          frequency="daily"
        />
      </div>

      <div className="dashboard__self-check">
        <ActivityBox 
          color={COLORS.SELF_CHECK}
          header="SELF-CHECK"
          hideAdd={selfCheck}
          title="#FEELITONTHEFIRST"
        >
          {selfCheck ? 
            (
              <div>Good job on performing a self exam and sharing an awareness selfie on instagram. You go!<p>next check: {nextMonth}/1</p></div>
            ): 
            (
              <div>Time to check your boobs! We’ll walk you through the process</div>
            )
          }
        </ActivityBox>
      </div>

      <div className="dashboard__mammogram">
        <ActivityBox 
          color={COLORS.MAMMOGRAM}
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
      </div>
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
    addNotes:(data) => dispatch({ type: "ADD_NOTES", data}),
    removeModal: () => dispatch({ type: 'REMOVE_MODAL'}),
    saveCurrentUser: (data) => dispatch({ type: SAVE_CURRENT_USER, data}),
    saveToDashboard: (data) => dispatch({ type: SAVE_TO_DASHBOARD, data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)