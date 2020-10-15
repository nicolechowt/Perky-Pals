import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

import { COLORS } from '../../../src/enums/colors'

import {
  ADD_EXERCISE_DETAILS,
  ADD_EXERCISE_MINUTES,
  ADD_FRUITS_AND_VEGGIES,
  ADD_MINDFULNESS_TIMES,
  ADD_MODAL,
  ADD_SLEEP_HOURS,
  ADD_WATER_OZ,
} from '../../reducers/actions'

import HelpOverlay from '../help-overlay';
import Overlay from '../overlay';

import './style/activity-form.css';


function ActivityForm(props) {
  const minutes = [10, 15, 20, 30, 45, 90];

  const hours = [];
  for(let i=1; i<=8;i++) {
    hours.push(i);
  }

  const oz = [4,8,16,32,40,64];

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
    addSelfCheckNotes,
    addMammogramNotes,
    addPoints,
    addPointsDetails,
    addSelfCheckTimes,
    addSleepHours,
    addWaterOz,
    incrementExerciseCount,
    incrementMindfulnessCount,
    incrementWaterCount,
    incrementFruitsAndVeggiesCount,

    // props
    currentUser,
    dashboard,
    onClose,
    pointsClaimed = [],
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

  const selfCheckGoal = dashboard.goals && dashboard.goals.selfCheck;

  const mammogramGoal = dashboard.goals && dashboard.goals.mammogram;

  const doneSelfCheckThisMonth = dashboard && dashboard.doneSelfCheckThisMonth;
  const scheduledMammogram = dashboard && dashboard.scheduledMammogram;

  const [redirect, setRedirect] = useState(false);
  const [activityType, setActivityType] = useState('Walk');
  const [activityMin, setActivityMin] = useState(1);
  const [sleepHour, setSleepHour] = useState(1);
  const [waterOz, setWaterOz] = useState(4);
  const [fvServings, setFvServings] = useState(1);
  const [mammogramDate, setMammogramDate] = useState(new Date());
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [selfCheckNotes, setSelfCheckNotes] = useState('');
  const [mammogramNotes, setMammogramNotes] = useState('');

  const [isShareFetching, setIsShareFetching] = useState(false);
  const [isShared, setIsShared] = useState(false);

  // for notes
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const day = today.getDate();

  useEffect(() => {
    if(!exerciseGoal) return;

    if (
      type==='EXERCISE' &&
      exerciseWeek+exercise>=exerciseGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (
      type==='EXERCISE' &&
      exerciseWeek+exercise<exerciseGoal
    ) {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${exerciseGoal-(exerciseWeek+exercise)}`,
        body2: 'minutes away from meeting your goal',
        footer:  'Check out our library for tips on getting creative with your workouts!',
        link: '/library/exercise?view=tips',
      });
    }
  }, [addModal, addPoints, addPointsDetails, exercise, exerciseGoal, exerciseWeek, pointsClaimed, type]);

  useEffect(() => {
    if(!mindfulnesseGoal) return;

    if(
      type==='MINDFULNESS' &&
      mindfulnessWeek+mindfulness>=mindfulnesseGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (
      type==='MINDFULNESS' &&
      mindfulnessWeek+mindfulness<mindfulnesseGoal
      ) {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${mindfulnesseGoal-(mindfulnessWeek+mindfulness)}`,
        body2: 'sessions away from meeting your weekly goal',
        footer:  'Check out our library for tips on being more present.',
        link: '/library/mindfulness?view=tips',
      });
    }
  }, [addModal, addPoints, addPointsDetails, mindfulness, mindfulnessWeek, mindfulnesseGoal, pointsClaimed, type]);

  useEffect(() => {
    if(!sleepGoal) return;

    if(
      type==='SLEEP' &&
      sleep>=sleepGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (
      type==='SLEEP' &&
      sleep<sleepGoal
    ) {
      addModal(  {
        title: 'Added!', 
        body1: 'You didn’t quite meet your goal, but we know you have it in you.',
        footer:  'Check out our library for tips on getting more sleep.',
        link: '/library/sleep?view=tips',
      });
    }
  }, [addModal, addPoints, addPointsDetails, pointsClaimed, sleep, sleepGoal, type]);

  useEffect(() => {
    if(!waterGoal) return;
    if(
      type==='WATER' &&
      water>=waterGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'YAY!',         
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (
      type==='WATER' &&
      water<waterGoal
    ) {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${waterGoal-water}`,
        body2: 'oz away from meeting your goal',
        footer:  'Check out our library for tips on adding water to your lifestyle',
        link: '/library/healthy-eating?view=tips',
      });
    }
  }, [addModal, addPoints, addPointsDetails, pointsClaimed, type, water, waterGoal]);

  useEffect(() => {
    if(!fruitsAndVeggiesGoal) return;
    if(
      type==='FRUITS_AND_VEGGIES' &&
      fruitsAndVeggies>=fruitsAndVeggiesGoal &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(1);
      addModal(  {
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (
      type==='FRUITS_AND_VEGGIES' &&
      fruitsAndVeggies<fruitsAndVeggiesGoal
    ) {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${fruitsAndVeggiesGoal-fruitsAndVeggies}`,
        body2: 'servings away from meeting your goal',
        footer:  'Check out our library for tips on adding more fruits and veggies to your diet',
        link: '/library/healthy-eating?view=tips',
      });
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
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+10 perks',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, doneSelfCheckThisMonth, pointsClaimed, type, selfCheckGoal]);

  useEffect(() => {
    if(
      type==='MAMMOGRAM' &&
      scheduledMammogram &&
      !pointsClaimed.includes(type)
    ) {
      addPoints(120);
      addModal(  {
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+120 perks',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    }
  }, [addModal, addPoints, addPointsDetails, mammogramDate, pointsClaimed, scheduledMammogram, type, mammogramGoal]);

  const onClick = () => {
    switch(type) {
      case "EXERCISE" :
        addExerciseMinute(activityMin);
        addExericseDetails({
          activity: activityType,
          duration: activityMin,
        })

        setRedirect(true);
        incrementExerciseCount();
        break;

      case "MINDFULNESS":
        addMindfulnessTimes(1);
        setRedirect(true);
        incrementMindfulnessCount();
        break;
        
      case "SLEEP":
        addSleepHours(sleepHour);
        setRedirect(true);
        break;
      
      case "WATER":
        addWaterOz(waterOz);
        setRedirect(true);
        incrementWaterCount();
        break;
      
      case "FRUITS_AND_VEGGIES":
        addFruitsAndVeggies(fvServings);
        setRedirect(true);
        incrementFruitsAndVeggiesCount();
        break;

      case "SELF_CHECK":
        addSelfCheckTimes(1);
        addSelfCheckNotes({
          date: `${year}-${month}-${day}`,
          content: selfCheckNotes ? selfCheckNotes : 'No notes were added.',
        });
        setRedirect(true);
        break;
  
      case "MAMMOGRAM":
        addMammogram({
          mammogram: 1,
          date: mammogramDate,
        })
        addMammogramNotes({
          date: `${year}-${month}-${day}`,
          content: mammogramNotes ? mammogramNotes : 'No notes were added.',
        });
        setRedirect(true);
        break;
      
      default:
    }
  }

  const setLoad = () => {
    setIsShared(true);
    setIsShareFetching(false);
  };

  const handleShareCallback = () => {
    setIsShareFetching(true);
    setTimeout(setLoad, 1500);
  }

  if(redirect) {
    return (
      <Redirect to="/dashboard" />
    );
  }

  return (
    <div className="activity-form">
      {(()=>{
        if(type==='FRUITS_AND_VEGGIES') {
          return(
            <div 
            className="activity-form__header"
            style={{backgroundColor: COLORS.FRUITS_AND_VEGGIES}}
          >
              <div className="activity-form__header-text">ADD FRUITS AND VEGGIES</div>
              <div 
                className="activity-form__close"
                onClick={onClose}
              >
                <i
                  className="fa fa-times"
                  style={{
                    fontSize:'12px',
                    color: 'white',
                    padding: '4px'
                  }}
                />
              </div>
            </div>
          );
        } else if (type==='SELF_CHECK') {
          return(
            <div 
            className="activity-form__header"
            style={{backgroundColor: COLORS.SELF_CHECK}}
          >
              <div className="activity-form__header-text">ADD SELF CHECK</div>
              <div 
                className="activity-form__close"
                onClick={onClose}
              >
                <i
                  className="fa fa-times"
                  style={{
                    fontSize:'12px',
                    color: 'white',
                    padding: '4px'
                  }}
                />
              </div>
            </div>
          );
        } else {
          return(
            <div 
              className="activity-form__header"
              style={{backgroundColor: COLORS[type]}}
            >
              <div className="activity-form__header-text">ADD {type}</div>
              <div 
                className="activity-form__close"
                onClick={onClose}
              >
                <i
                  className="fa fa-times"
                  style={{
                    fontSize:'12px',
                    color: 'white',
                    padding: '4px'
                  }}
                />
              </div>
            </div>
          )
        }
      })()}

      {(()=>{
        switch(type) {
          case "EXERCISE" :
            return(
              <div className="activity-form__content">
                <div className="activity-form__item">
                    DATE: <b>{`${month}/${day}/${year}`}</b>
                </div>
                <div className="activity-form__item">
                  <div>
                    <label htmlFor="activity">WHAT DID YOU DO?</label>
                  </div>

                  <div>
                    <select name="activity" id="activity" value={activityType.value} onChange={(event)=>setActivityType(event.target.value)}>
                      <option value="Walk">Walk</option>
                      <option value="Run">Run</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Weights">Weights</option>
                      <option value="HIIT<">HIIT</option>
                    </select>
                  </div>
                </div>

                <div className="activity-form__item">
                  <div>
                    <label htmlFor="duration">HOW LONG WAS IT?</label>
                  </div>

                  <div>
                    <select name="minutes" id="minutes" value={activityMin} onChange={(event)=>setActivityMin(parseInt(event.target.value))}>
                      {minutes.map(min => <option key={`act-${min}`} value={min}>{min}</option>)}
                    </select>
                  </div>
                </div>
            
                <div style={{textAlign: 'center'}}>
                  <button 
                    className="button--pill"
                    onClick={onClick}
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
    
          case "MINDFULNESS":
            return (
              <div className="activity-form__content">
                <div className="activity-form__item">
                  DATE: <b>{`${month}/${day}/${year}`}</b>
                </div>
                <div className="activity-form__comment">
                  Let us know you took some time to be mindful today.
                </div>

                <div style={{textAlign: 'center'}}>
                  <button 
                    className="button--pill"
                    onClick={onClick}
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
   
          case "SLEEP":
            return (
              <div className="activity-form__content">
                <div className="activity-form__item">
                    DATE: <b>{`${month}/${day}/${year}`}</b>
                </div>

                <div className="activity-form__item">
                  <label htmlFor="duration">HOW LONG WAS IT?</label>

                  <div className="activity-form__item">
                    <select name="hours" id="hours" value={sleepHour} onChange={(event)=>setSleepHour(parseInt(event.target.value))}>
                      {hours.map(hour => <option key={`sleep-${hour}`} value={hour}>{hour} {hour===8 && `+`}</option>)}
                    </select>
                  </div>

                  <div style={{textAlign: 'center'}}>
                    <button 
                      className="button--pill"
                      onClick={onClick}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            );
          
          case "WATER":
            return(
              <div className="activity-form__content">
                <div className="activity-form__item">
                    DATE: <b>{`${month}/${day}/${year}`}</b>
                </div>
                <div className="activity-form__item">
                  <label htmlFor="volume">HOW MUCH WATER DID YOU HAVE?</label>
                  
                  <div className="activity-form__item">
                    <select name="oz" id="oz" value={waterOz} onChange={(event)=>setWaterOz(parseInt(event.target.value))}>
                      {oz.map(o => <option key={`water-${o}`} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{textAlign: 'center'}}>
                  <button 
                    className="button--pill"
                    onClick={onClick}
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
          
          case "FRUITS_AND_VEGGIES":
            return(
              <div className="activity-form__content">
                <div className="activity-form__item">
                    DATE: <b>{`${month}/${day}/${year}`}</b>
                </div>
                <div className="activity-form__item">
                  <label htmlFor="volume">HOW MANY SERVINGS DID YOU HAVE?</label>

                  <div className="activity-form__item">
                    <select name="servings" id="servings" value={fvServings} onChange={(event)=>setFvServings(parseInt(event.target.value))}>
                      {servings.map(serving => <option key={`fv-${serving}`} value={serving}>{serving} {serving===5 && `+`}</option>)}
                    </select>
                  </div>
                
                  <div style={{textAlign: 'center'}}>
                    <button 
                      className="button--pill"
                      onClick={onClick}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            );
    
          case "SELF_CHECK":
            return (
              <div className="activity-form__content">
                <div className="activity-form__item">
                    DATE: <b>{`${month}/${day}/${year}`}</b>
                </div>

                <div className="activity-form__item">
                  <div className="activity-form__item">
                    Any Notes you'd like to add from your self-check today?
                  </div>

                  <input
                    className="activity-form__box"
                    onChange={(event)=> setSelfCheckNotes(event.target.value)}
                    placeholder="Jot them down here!"
                    value={selfCheckNotes} 
                  />
                </div>

                <div className="activity-form__item">
                  <b>Want extra points? Join the Movement</b>
                  <div>
                    Share your #feelitonthefirst story on instagram now.
                  </div>

                  <div>
                    <button 
                      className="button--pill activity-form__share-button"
                      disabled={isShared}
                      onClick={handleShareCallback}
                    >
                      {(()=>{
                        if(isShareFetching && !isShared) {
                          return(
                            <React.Fragment>
                              <i 
                                aria-hidden="true"
                                className="fa fa-spinner fa-spin" 
                                style={{
                                  fontSize:'12px',
                                  color: 'white', 
                                  padding: '0 6px',
                                }}
                              />
                            SHARING
                          </React.Fragment>                            
                          );
                        } else if (!isShareFetching && isShared) {
                          return (
                            <React.Fragment>
                              SHARED
                            </React.Fragment>
                          )
                        } else {
                          return (
                            <React.Fragment>
                              SHARE
                            </React.Fragment>
                          )
                        }
                      })()}
                    </button>

                    {isShared && (
                      <i
                        className="fa fa-check-circle"
                        style={{
                          fontSize:'24px',
                          color: COLORS.SELF_CHECK, 
                          padding: '4px'
                        }}
                      />
                    )}
                  </div>
                </div>

                <div style={{textAlign: 'center'}}>
                  <button 
                    className="button--pill"
                    onClick={onClick}
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
      
          case "MAMMOGRAM":
            return (
              <div className="activity-form__content">
                <div className="activity-form__item">
                    DATE: <b>{`${month}/${day}/${year}`}</b>
                </div>

                <div className="activity-form__item">
                  Any Notes you'd like to add from your appointment today?
                </div>

                <input
                  className="activity-form__input"
                  onChange={(event)=> setMammogramNotes(event.target.value)}
                  placeholder="Jot them down here!"
                  value={mammogramNotes} 
                />

                <div style={{textAlign: 'center'}}>
                  <button 
                    className="button--pill"
                    onClick={onClick}
                  >
                      ADD
                  </button>
                </div>

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
    addSelfCheckNotes:(data) => dispatch({ type: "ADD_SELF_CHECK_NOTES", data}),
    addMammogramNotes:(data) => dispatch({ type: "ADD_MAMMOGRAM_NOTES", data}),
    incrementExerciseCount: (data) => dispatch({ type: "INCREMENT_EXERCISE_COUNT"}),
    incrementMindfulnessCount: (data) => dispatch({ type: "INCREMENT_MINDFULNESS_COUNT"}),
    incrementWaterCount: (data) => dispatch({ type: "INCREMENT_WATER_COUNT"}),
    incrementFruitsAndVeggiesCount: () => dispatch({ type: "INCREMENT_FRUITS_AND_VEGGIES_COUNT" }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivityForm)
