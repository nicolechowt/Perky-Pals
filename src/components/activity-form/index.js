import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Calendar from 'react-calendar';
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

import './style/activity-form.css';
import Overlay from '../overlay';
import MammogramHelp from '../mammogram-help';

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
    addNotes,
    addPoints,
    addPointsDetails,
    addSelfCheckTimes,
    addSleepHours,
    addWaterOz,

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

  const doneSelfCheckThisMonth = dashboard && dashboard.doneSelfCheckThisMonth;

  const scheduledMammogram = dashboard && dashboard.scheduledMammogram;

  const mammogramHelp = [
    {
      header: 'Haight ashbury free clinics',
      address: '1553 Mission St., San Francisco, ca 94103',
      phone: '(415) 746-1967',
      website: 'www.google.com',
      miles: '1.2 MILES AWAY'
    },
    {
      header: 'San Francisco Free Clinic',
      address: '4900 California St., San Francisco, ca 94118 ',
      phone: '(415) 750-9894',
      website: 'www.google.com',
      miles: '1.5 MILES AWAY'
    },
    {
      header: 'San Francisco City Clinic',
      address: '356 7th St., San Francisco, CA 94105 ',
      phone: '(415) 887-5500',
      website: 'www.google.com',
      miles: '2 MILES AWAY'
    },
    {
      header: 'Healthright 360',
      address: '1563 Mission St., San Francisco, CA 94105',
      phone: '(415) 762-3700',
      website: 'www.google.com',
      miles: '3 MILES AWAY'
    },
  ]

  const [redirect, setRedirect] = useState(false);
  const [activityType, setActivityType] = useState('Walk');
  const [activityMin, setActivityMin] = useState(1);
  const [sleepHour, setSleepHour] = useState(1);
  const [waterOz, setWaterOz] = useState(4);
  const [fvServings, setFvServings] = useState(1);
  const [mammogramDate, setMammogramDate] = useState(new Date());
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [selfCheckNotes, setSelfCheckNotes] = useState('');

  const [mammogramIsFetched, setMammogramIsFetched] = useState(false);
  const [mammogramIsFetching, setMammogramIsFetching] = useState(false);

  const setLoad = () => {
    setMammogramIsFetched(true);
    setMammogramIsFetching(false);
  };

  // for notes
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth()+1;
  const day = today.getDate();

  useEffect(() => {
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
    } else if (type==='EXERCISE') {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${exerciseGoal-(exerciseWeek+exercise)}`,
        body2: 'minutes away from meeting your goal',
        footer:  'Check out our library for tips on getting creative with your workouts!',
      });
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
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (type==='MINDFULNESS') {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${mindfulnesseGoal-(mindfulnessWeek+mindfulness)}`,
        body2: 'minutes away from meeting your goal',
        footer:  'Check out our library for tips on getting creative with your workouts!',
      });
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
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (type==='SLEEP') {
      addModal(  {
        title: 'Added!', 
        body1: 'You didn’t quite meet your goal, but we know you have it in you.',
        footer:  'Check out our library for tips on getting more sleep.',
      });
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
        title: 'YAY!',         
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (type==='WATER') {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${waterGoal-water}`,
        body2: 'oz away from meeting your goal',
        footer:  'Check out our library for tips on adding water to your lifestyle',
      });
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
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+1 perk',
        footer:  'Keep up the good work!',
      });
      addPointsDetails(type)
    } else if (type==='FRUITS_AND_VEGGIES') {
      addModal(  {
        title: 'Way to go!', 
        body1: 'You are just',
        number: `${fruitsAndVeggiesGoal-fruitsAndVeggies}`,
        body2: 'servings away from meeting your goal',
        footer:  'Check out our library for tips on adding more fruits and veggies to your lifestyle',
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
  }, [addModal, addPoints, addPointsDetails, doneSelfCheckThisMonth, pointsClaimed, type]);

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
        addSelfCheckTimes(1);
        addNotes({
          date: `${year}-${month}-${day}`,
          content: selfCheckNotes,
        });
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
                  class="fa fa-times"
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
                  class="fa fa-times"
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
                  class="fa fa-times"
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
                  <label htmlFor="volume">HOW MUCH WATER DID YOU DRINK</label>
                  
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
                  <label htmlFor="volume">HOW MUCH DID YOU EAT</label>

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
                  Did you have a do a self check today?
                </div>

                <div className="activity-form__item">
                  Any notes you’d like to add?
                </div>

                <div className="activity-form__item">
                  <b>Want extra points? Join the Movement</b>
                  <div>
                    Share your #feelitonthefirst story on instagram now.
                  </div>

                  <div>
                    <button 
                      className="button--pill"
                      // onClick={onClick}
                    >
                      SHARE
                    </button>
                  </div>
                </div>
                <div className="activity-form__item">
                  <input
                      className="activity-form__box"
                      onChange={(event)=> setSelfCheckNotes(event.target.value)}
                      value={selfCheckNotes} 
                    />
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
                  <div className="activity-form__item">MAKE AN APPOINTMENT</div>
                  
                  <div>
                    It’s so important that you get an mammograpm every year! When’s your appointment? We’ll remind you when it’s coming up.
                  </div>
                </div>

                <Calendar 
                  onChange={(date)=>setMammogramDate(date)}
                  value={mammogramDate}
                />
                
                <div 
                  className="activity-form__item activity-form__link"
                  style={{color: COLORS.MAMMOGRAM}}
                  onClick={()=>setHelpOverlay(true)}
                >
                  Not sure where to make an appointment? We’re here to help.
                </div>
                <div style={{textAlign: 'center'}}>
                  <button 
                    className="button--pill"
                    onClick={onClick}
                  >
                      ADD
                  </button>
                </div>

                {helpOverlay && (
                  <Overlay onClose={()=>setHelpOverlay(false)}>
                    <div 
                      className="activity-form-overlay__top"
                      style={{backgroundColor: COLORS.MAMMOGRAM}}
                    >
                      <div className="activity-form-overlay__header">HELP</div>
                      <div>
                        It’s easiest to reach out to your local healthcare provider.
                      </div>
                      <div>
                        Don’t have health insurance? Don’t worry! We’ll help you find some options.
                      </div>

                      <div 
                        className="activity-form__item"
                        style={{paddingTop: '30px'}}
                      >  
                        <label htmlFor="activity">WHAT'S YOUR ZIPCODE'?</label>
                        <div>
                          <input type="text" name="zipcode" value="94103" />
                          <button 
                            className="activity-form__button"
                            onClick={()=> {
                              setMammogramIsFetching(true)
                              setTimeout(setLoad, 2000)
                            }}
                          >
                            SEARCH
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="activity-form-overlay__bottom">
                      {mammogramIsFetching && (
                        <div className="activity-form-overlay__spinner">
                          <i 
                            aria-hidden="true"
                            class="fa fa-spinner fa-spin" 
                            style={{
                              fontSize:'18px',
                              color: COLORS.NAVY_BLUE, 
                              padding: '4px'
                            }}
                          /> 
                        </div>
                      )}

                      {mammogramIsFetched && (
                        <div>
                          <div 
                            className="activity-form-overlay__subheader"
                            style={{color: COLORS.MAMMOGRAM}}
                          >
                            showing results near 94118
                          </div>
                        
                          {mammogramHelp.map(item=>{
                            return(
                              <MammogramHelp
                                header={item.header}
                                address={item.address}
                                website={item.website}
                                miles={item.miles}
                                phone={item.phone}
                              />
                            )
                          })}
                        </div>
                      )}
                    </div>
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
    addNotes:(data) => dispatch({ type: "ADD_NOTES", data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivityForm)
