import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  ADD_EXERCISE_DETAILS,
  ADD_EXERCISE_MINUTES,
  ADD_FRUITS_AND_VEGGIES,
  ADD_MINDFULNESS_TIMES,
  ADD_MODAL,
  ADD_SLEEP_HOURS,
  ADD_WATER_OZ,
} from '../../reducers/actions'

import './style/activity-form.css';
import Overlay from '../overlay';

function ActivityForm(props) {
  const minutes = [];
  for (let i = 1; i <= 150; i++) {
    minutes.push(i);
  }

  const hours = [];
  for(let i=1; i<=8;i++) {
    hours.push(i);
  }

  const oz = [];
  for(let i=1; i<=64; i=i*4){
    oz.push(i);
  }

  const servings = [];
  for(let i=1; i<=5;i++) {
    servings.push(i);
  }

  const { 
    // dispatch props
    addExerciseMinute, 
    addExericseDetails,
    addFruitsAndVeggies,
    addMammogram,
    addMindfulnessTimes, 
    addModal, 
    addPoints,
    addPointsDetails,
    addSelfCheckTimes,
    addSleepHours,
    addWaterOz,

    // props
    currentUser,
    dashboard,
    onClose,
    pointsClaimed,
    type,
  } = props;

  // calculate weekly goals
  
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  let exerciseWeek = 0;
  let mindfulnessWeek = 0;

  if(weeklyData){
    weeklyData.forEach(day => {
      if(day.exercise) {
        exerciseWeek+= day.exercise;
      }

      if(day.mindfulness) {
        mindfulnessWeek++;
      }
    })
  }
  
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

  const doneSelfCheckThisMonth = dashboard && dashboard.doneSelfCheckThisMonth;

  const scheduledMammogram = dashboard && dashboard.scheduledMammogram;

  const [redirect, setRedirect] = useState(false);
  const [activityType, setActivityType] = useState('Hike');
  const [activityMin, setActivityMin] = useState(1);
  const [sleepHour, setSleepHour] = useState(1);
  const [waterOz, setWaterOz] = useState(4);
  const [fvServings, setFvServings] = useState(1);
  const [mammogramDate, setMammogramDate] = useState(new Date());
  const [helpOverlay, setHelpOverlay] = useState(false);

  useEffect(() => {
    if (
      type==='EXERCISE' &&
      exerciseWeek+exercise>=exerciseGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'yay points', 
        body: 'you earned 1 point'
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, exercise, exerciseGoal, exerciseWeek, pointsClaimed, type]);

  useEffect(() => {
    if(
      type==='MINDFULNESS' &&
      mindfulnessWeek+mindfulness>=mindfulnesseGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'yay points', 
        body: 'you earned 1 point'
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, mindfulness, mindfulnessWeek, mindfulnesseGoal, pointsClaimed, type]);

  useEffect(() => {
    if(
      type==='SLEEP' &&
      sleep>=sleepGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'yay points', 
        body: 'you earned 1 point'
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, pointsClaimed, sleep, sleepGoal, type]);

  useEffect(() => {
    if(
      type==='WATER' &&
      water>=waterGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'yay points', 
        body: 'you earned 1 point'
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, pointsClaimed, type, water, waterGoal]);

  useEffect(() => {
    if(
      type==='FRUITS_AND_VEGGIES' &&
      fruitsAndVeggies>=fruitsAndVeggiesGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'yay points', 
        body: 'you earned 1 point'
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, fruitsAndVeggies, fruitsAndVeggiesGoal, pointsClaimed, type]);

  useEffect(() => {
    if(
      type==='SELF_CHECK' &&
      doneSelfCheckThisMonth &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(10);
      addModal(  {
        title: 'yay points', 
        body: 'you earned 10 points'
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, doneSelfCheckThisMonth, pointsClaimed, type]);

  useEffect(() => {
    if(
      type==='MAMMOGRAM' &&
      scheduledMammogram &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(120);
      addModal(  {
        title: 'yay points', 
        body: 'you earned 120 point'
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, mammogramDate, pointsClaimed, scheduledMammogram, type]);

  const onClick = () => {
    switch(type) {
      case "EXERCISE" :
        addExerciseMinute(activityMin);
        addExericseDetails({
          activity: activityType,
          duration: activityMin,
        })

        setRedirect(true);
        break;

      case "MINDFULNESS":
        addMindfulnessTimes(1);
        setRedirect(true);
        break;
        
      case "SLEEP":
        addSleepHours(sleepHour);
        setRedirect(true);
        break;
      
      case "WATER":
        addWaterOz(waterOz);
        setRedirect(true);
        break;
      
      case "FRUITS_AND_VEGGIES":
        addFruitsAndVeggies(fvServings);
        setRedirect(true);
        break;

      case "SELF_CHECK":
        addSelfCheckTimes(1)
        setRedirect(true);
        break;
  
      case "MAMMOGRAM":
        addMammogram({
          mammogram: 1,
          date: mammogramDate,
        })
        setRedirect(true);
        break;
      
      default:
    }
  }

  if(redirect) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  return (
    <div>
      {type !=='FRUITS_AND_VEGGIES' && <h1>ADD {type}</h1>} 

      {type==='FRUITS_AND_VEGGIES' && <h1>ADD FRUITS AND VEGGIES</h1>}
      {(()=>{
        switch(type) {
          case "EXERCISE" :
            return(
              <div>
                <div className="activity-form__input-field">
                  <label htmlFor="activity">WHAT DID YOU DO?</label>
                  <select name="activity" id="activity" value={activityType.value} onChange={(event)=>setActivityType(event.target.value)}>
                    <option value="Hike">Hike</option>
                    <option value="Run">Run</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Weights">Weights</option>
                    <option value="HIIT<">HIIT</option>
                  </select>
                </div>

                <div className="activity-form__input-field">
                  <label htmlFor="duration">HOW LONG WAS IT?</label>
                  <select name="minutes" id="minutes" value={activityMin} onChange={(event)=>setActivityMin(parseInt(event.target.value))}>
                    {minutes.map(min => <option key={`act-${min}`} value={min}>{min}</option>)}
                  </select>
                </div>

                <button onClick={onClick}>done</button>
              </div>
            );
    
          case "MINDFULNESS":
            return (
              <div>
                <p>Did you have a mindful moment today?</p>

                <button onClick={onClick}>yes</button>
                <button onClick={onClose}>no :(</button>
              </div>
            );
   
          case "SLEEP":
            return (
              <div className="activity-form__input-field">
                <label htmlFor="duration">HOW LONG WAS IT?</label>
                <select name="hours" id="hours" value={sleepHour} onChange={(event)=>setSleepHour(parseInt(event.target.value))}>
                  {hours.map(hour => <option key={`sleep-${hour}`} value={hour}>{hour} {hour===8 && `+`}</option>)}
                </select>

                <button onClick={onClick}>done</button>
              </div>
            );
          
          case "WATER":
            return(
              <div className="activity-form__input-field">
                <label htmlFor="volume">HOW MUCH DID YOU DRINK</label>
                <select name="oz" id="oz" value={waterOz} onChange={(event)=>setWaterOz(parseInt(event.target.value))}>

                  {oz.map(o => <option key={`water-${o}`} value={o}>{o}</option>)}
                </select>

                <button onClick={onClick}>done</button>
              </div>
            );
          
          case "FRUITS_AND_VEGGIES":
            return(
              <div className="activity-form__input-field">
                <label htmlFor="volume">HOW MUCH DID YOU EAT</label>
                <select name="servings" id="servings" value={fvServings} onChange={(event)=>setFvServings(parseInt(event.target.value))}>
                  {servings.map(serving => <option key={`fv-${serving}`} value={serving}>{serving} {serving===5 && `+`}</option>)}
                </select>

                <button onClick={onClick}>done</button>
              </div>
            );
    
          case "SELF_CHECK":
            return (
              <div>
                <p>Did you have a do a self check today?</p>

                <button onClick={onClick}>yes</button>
                <button onClick={onClose}>no :(</button>
              </div>
            );
      
          case "MAMMOGRAM":
            return (
              <div>
                <h1>MAKE AN APPOINTMENT</h1>

                <p>It’s so important that you get an mammograpm every year! When’s your appointment? We’ll remind you when it’s coming up.</p>

                <Calendar 
                  onChange={(date)=>setMammogramDate(date)}
                  value={mammogramDate}
                />
                
                <button onClick={onClick}>done</button>
                <button onClick={()=>setHelpOverlay(true)}>help</button>

                {helpOverlay && (
                  <Overlay>
                    <div>
                      It’s easiest to reach out to your local healthcare provider.
                    </div>
                    <div>
                      Don’t have health insurance? Don’t worry - let us know your zip code and we’ll help you find some options.
                    </div>

                    <input type="text" name="zipcode" value="zipcode" />
                  </Overlay>
                )}
              </div>
            );
        
          default:
        }
      })()}
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    dashboardReducer,
    currentUserReducer,
  } = state;

  return {  
    dashboard: dashboardReducer,    
    currentUser: currentUserReducer.currentUser,
    exerciseMinutes: dashboardReducer.exercise,
    goals: dashboardReducer.goals,
    pointsClaimed: dashboardReducer.pointsClaimed,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    addExerciseMinute: (data) => dispatch({ type: ADD_EXERCISE_MINUTES, data}),
    addMindfulnessTimes: (data) => dispatch({ type: ADD_MINDFULNESS_TIMES, data}),
    addSleepHours: (data) => dispatch({ type: ADD_SLEEP_HOURS, data}),
    addFruitsAndVeggies: (data) => dispatch({ type: ADD_FRUITS_AND_VEGGIES, data}),
    addWaterOz: (data) => dispatch({ type: ADD_WATER_OZ, data}),
    addModal: (data) => dispatch({ type: ADD_MODAL, data}),
    addExericseDetails: (data) => dispatch({ type: ADD_EXERCISE_DETAILS, data}),
    addPoints: (data) => dispatch({ type: "ADD_POINTS", data}),
    addPointsDetails: (data) => dispatch({ type:"ADD_POINTS_DETAILS", data}),
    addSelfCheckTimes:(data) => dispatch({ type: "ADD_SELF_CHECK_TIMES", data}),
    addMammogram:(data) => dispatch({ type: "ADD_MAMMOGRAM", data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivityForm)
