import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './style/dashboard.css';
import { ADD_MODAL } from '../../reducers/actions'
import ActivityBox from '../activity-box';
import Overlay from '../overlay';

import { 
  SAVE_CURRENT_USER,
  SAVE_TO_DASHBOARD, 
} from '../../reducers/actions'
import Friend from '../friend';
import NoMammogram from './components/no-mammogram';
import ScheduledMammogramComp from './components/scheduled-mammogram-comp';
import PointsOverlay from './components/points-overlay';
import ProgressRing from '../progress-ring';
import TipBox from '../tip-box';
import { COLORS } from '../../../src/enums/colors';

let alertedUser=false;

function Dashboard(props) {
  const { 
    addSelfCheckNotes,
    addModal,
    removeModal,
    saveCurrentUser,
    saveExerciseTips,
    saveFruitsAndVeggiesTips,
    saveMammogramTips,
    saveMindfulnessTips,
    saveSelfCheckTips,
    saveSleepTips,
    saveToDashboard, 
    saveWaterTips,

    currentUser = [],
    dashboard, 
    location, 
    users, 
    modal,
    logs,
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


  // saving tips for details page
  const exerciseTipInitial = currentUser[0] && currentUser[0].exerciseTip;
  const mindfulnessTipInitial = currentUser[0] && currentUser[0].mindfulnessTip;
  const waterTipInitial = currentUser[0] && currentUser[0].waterTip;
  const fruitsAndVeggiesTipInitial = currentUser[0] && currentUser[0].fruitsAndVeggiesTip;
  const sleepTipInitial = currentUser[0] && currentUser[0].sleepTip;
  const selfCheckTipInitial = currentUser[0] && currentUser[0].selfCheckTip;
  const mammogramTipInitial = currentUser[0] && currentUser[0].mammogramTip;

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

  const selfCheckGoal = dashboard.goals && dashboard.goals.selfCheck;
  const mammogramGoal = dashboard.goals && dashboard.goals.mammogram;

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
        addSelfCheckNotes(note);
      })

      saveExerciseTips(exerciseTipInitial[0]);
      saveMindfulnessTips(mindfulnessTipInitial[0]);
      saveWaterTips(waterTipInitial[0]);
      saveFruitsAndVeggiesTips(fruitsAndVeggiesTipInitial[0]);
      saveSleepTips(sleepTipInitial[0]);
      saveSelfCheckTips(selfCheckTipInitial[0]);
      saveMammogramTips(mammogramTipInitial[0]);
    }
  }, [ 
    addSelfCheckNotes,
    dashboard, 
    dashboardTipInitial,
    doneSelfCheckThisMonthInitial, 
    exerciseTipInitial,
    fruitsAndVeggiesTipInitial,
    goals,
    id, 
    mammogramTipInitial,
    mindfulnessTipInitial,
    points, 
    previousSelfCheckNotesInitial, 
    saveExerciseTips,
    saveFruitsAndVeggiesTips,
    saveMammogramTips,
    saveMindfulnessTips,
    saveSelfCheckTips,
    saveSleepTips,
    saveToDashboard, 
    saveWaterTips,
    scheduledMammogramInitial, 
    selfCheckTipInitial,
    sleepTipInitial,
    todaysData,
    waterTipInitial,
  ]);

  useEffect(()=>{
    if(props.history.action==='PUSH' || props.history.action==='POP') {
      removeModal();
    }
  }, [removeModal, props.history.action])

  useEffect(()=>{
    if(!logs) return;

    const loggedTwice = (
      logs.exercise===2 ||
      logs.mindfulness===2 ||
      logs.water===2 ||
      logs.fruitsAndVeggies===2
    );

    const calculateTierAndPrize = () => {
      let tier;
      let tierPrize;

      if(points<=350) {
        tier = 350;
        tierPrize = 'Farm Fresh Box';
      } else if (points>350 && points<=750) {
        tier = 750;
        tierPrize = 'Yoga Class';
      } else if (points>750 && points<=1000) {
        tier = 1000;
        tierPrize = 'Social Worker Consultation';
      } else if (points>1000 && points<=2500) {
        tier = 2500;
        tierPrize = 'Community Pop-up Farm Stand with Mobile Mammogram';
      }

      return {tier,tierPrize};
    }

    const { tier, tierPrize } = calculateTierAndPrize();

    if(!tier) return;

    if(loggedTwice && !alertedUser) {
      addModal(  {
        title: 'Off to a great start!', 
        body1: 'You are just',
        number:  tier - points,
        body2: `perks away from getting a ${tierPrize}`,
        footer:  'Check out what else you can work towards.',
        link: '/redeem'
      });

      alertedUser=true;
    } 
  }, [addModal,logs, points])

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
                link={content.link}
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
        mindfulnessProgressPercentage={!mindfulnesseGoal ? 0 : mindfulnessProgressPercentage}
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
            hideAdd={!exerciseGoal}
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
            hideAdd={!mindfulnesseGoal}
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
            hideAdd={!waterGoal}
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
            hideAdd={!fruitsAndVeggiesGoal}
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
          goal={selfCheckGoal}
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

      {(()=> {
        if(currentUserName==='Bella') return;

        return (
          <div className="dashboard__mammogram">
            <ActivityBox 
              color={COLORS.MAMMOGRAM}
              goal={mammogramGoal}
              header="MAMMOGRAM"
            >
              {(()=> {
                let mammogramDateObj;

                if(mammogram) {
                  if(typeof mammogram==='string'){
                    mammogramDateObj = new Date(mammogram);

                    const scheduledMammogramYear = mammogramDateObj.getFullYear();
                    const scheduledMammogramMonth = mammogramDateObj.getMonth()+1;
                    const scheduledMammogramDay = mammogramDateObj.getDate();
                    // this is hardcoded from mockedData
                    return (
                      <ScheduledMammogramComp 
                        year={scheduledMammogramYear}
                        month={scheduledMammogramMonth}
                        day={scheduledMammogramDay}
                        future
                      />
                    );
                  }

                  // through app flow
                  const mammogramScheduledPast = mammogram  < new Date();
                  const mammogramScheduledFuture = mammogram  > new Date();

                  const year = mammogram.getFullYear();
                  const month = mammogram.getMonth()+1;
                  const day = mammogram.getDate();

                  if(mammogramScheduledFuture) {
                    return (
                      <ScheduledMammogramComp 
                        year={year}
                        month={month}
                        day={day}
                        future
                      />
                    );
                  }

                  return (
                    <ScheduledMammogramComp 
                      year={year}
                      month={month}
                      day={day}
                      future={false}
                    />
                  );
                }

                return (
                  <NoMammogram />
                )
              })()}
            </ActivityBox>
          </div>
        );
      })()}
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
    logReducer,
  } = state;

  return { 
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,    
    modal: modalReducer,
    users: userReducer,
    logs: logReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    addSelfCheckNotes:(data) => dispatch({ type: "ADD_SELF_CHECK_NOTES", data}),
    addModal: (data) => dispatch({ type: ADD_MODAL, data}),
    removeModal: () => dispatch({ type: 'REMOVE_MODAL'}),
    saveCurrentUser: (data) => dispatch({ type: SAVE_CURRENT_USER, data}),
    saveToDashboard: (data) => dispatch({ type: SAVE_TO_DASHBOARD, data}),
    saveExerciseTips: (data) => dispatch({ type: "SAVE_EXERCISE_TIPS", data}),
    saveMindfulnessTips: (data) => dispatch({ type: "SAVE_MINDFULNESS_TIPS", data}),
    saveWaterTips: (data) => dispatch({ type: "SAVE_WATER_TIPS", data}),
    saveFruitsAndVeggiesTips: (data) => dispatch({ type: "SAVE_FRUITS_AND_VEGGIES_TIPS", data}),
    saveSleepTips: (data) => dispatch({ type: "SAVE_SLEEP_TIPS", data}),
    saveSelfCheckTips: (data) => dispatch({ type: "SAVE_SELF_CHECK_TIPS", data}),
    saveMammogramTips: (data) => dispatch({ type: "SAVE_MAMMOGRAM_TIPS", data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)