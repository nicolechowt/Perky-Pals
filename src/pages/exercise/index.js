import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

import './style/exercise.css';
import ActivityRing from '../../components/activity-ring';

import { COLORS } from '../../../src/enums/colors'

function ActivityItem(props) {
  const { activity, duration, day, key} = props;

  const month = new Date().getMonth()+1;
  const today = new Date().getDate();

  const daysInMonth = (monthNum) => {
    if(
      monthNum===1 ||
      monthNum===3 ||
      monthNum===5 ||
      monthNum===7 ||
      monthNum===8 ||
      monthNum===10 ||
      monthNum===12
    ) {
      return 31;
    }

    if(monthNum===2) return 28;
    return 30;
  }

  const calculatDate = (todaysDay, numsToGoBack) => {
    let newMonth;
    let newDay;

    // if today's at start of the month
    // count backwards from last months date
    if(todaysDay-numsToGoBack<1) {
      const newNumsToGoBack = todaysDay-numsToGoBack;
      newDay = daysInMonth(month-1)+newNumsToGoBack;
      newMonth = month -1;

      return `${newMonth}/${newDay}`
    }

    return `${month}/${todaysDay - numsToGoBack}`
  }

  const dayToDateMap = {
    yesterday: calculatDate(today, 1),
    twoDaysAgo: calculatDate(today, 2),
    threeDaysAgo: calculatDate(today, 3),
    fourDaysAgo: calculatDate(today, 4),
    fiveDaysAgo: calculatDate(today, 5),
    sixDaysAgo: calculatDate(today, 6),
    sevenDaysAgo: calculatDate(today, 7),
  }

  return (
    <div 
      className="page__activity-item"
      style={ key%2===0 ? 
        {color: COLORS.EXERCISE} : 
        {color: COLORS.EXERCISE_ALT}
      }
    >
      {day !=="TODAY" ? 
        <div>{dayToDateMap[day]}</div> : 
        <div>{month}/{today}</div>
      }
      {activity && 
        <div> {activity} </div>
      }
      {duration && <div>{duration}</div>}
    </div>

  )
}

const obj = {};

function Exercise(props) {
  let totalExerciseMinutes = 0;

  const { goBack } = props.history;
  const { currentUser, dashboard } = props;
  const exerciseGoal = dashboard.goals && dashboard.goals.exercise;

  const todaysExercises = dashboard.exercises || [];
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));

  useEffect(() => {
    setData(generateData());
  },
  [!data]
  );

  const arrToGraph = [];

  for(const prop in obj) {
    arrToGraph.push({
      activity: prop,
      totalDuration: obj[prop],
    })
  }

  console.log('obj', obj);
  console.log('arrToGraph', arrToGraph)

  return (
    <div className="exercise page">
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

        <div className="page__header">EXERCISE</div>
        <div className="page__sub-header">YOUR WEEK SO FAR</div>

        <ActivityRing 
          data={arrToGraph}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />

        <div className="page__caption">
          {obj.left ? (
            <div>{obj.left} more minutes to go!</div>
          ): (
            <div>GOAL ACHIEVED! WAY TO KICK BUTT</div>
          )}
        </div>
      </div>
        {/* adding the rest of this week's */}
        <div>
          {weeklyData.map(day=>{
            return (
              <div>
                {day.exercises.length>0 && day.exercises.map((item,index) => {

                  console.log('item', item)
                  // see if key already exists
                  // if so add to val
                  if(obj[item.activity]) {
                    obj[item.activity]= obj[item.activity] + item.duration;
                  } else {
                    obj[item.activity] = item.duration;
                  }

                  totalExerciseMinutes += item.duration;

                  return (
                    <ActivityItem
                      ikey={index} 
                      day={day.date}
                      activity={item.activity} 
                      duration={item.duration} 
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        
        {/* adding todays to graph */}
        {todaysExercises.map(ex =>{
          if(obj[ex.activity]) {
            obj[ex.activity]= obj[ex.activity] + ex.duration;
          } else {
            obj[ex.activity] = ex.duration;
          }

          totalExerciseMinutes += ex.duration;
          console.log('totalExerciseMinutes', totalExerciseMinutes);

          console.log('ex.act', ex.activity);
          console.log('ex.du', ex.duration);

          return (
            <ActivityItem 
              day="TODAY"
              activity={ex.activity} 
              duration={ex.duration} 
            />
          );
          }
        )}

        {(()=>{
          if(exerciseGoal-totalExerciseMinutes > 0) {
            obj["left"]= exerciseGoal-totalExerciseMinutes;
          } else {
            obj["left"]= null;
          }
        })()}

        <div 
          className="page__tips-perks"
          style={{background: COLORS.EXERCISE}}
        >
          <div className='page__tips'>
            <div className='page__tips-header'>tips header</div>
            Tips stuff
          </div>

          <div 
            className="page__perks"
            style={{color: COLORS.EXERCISE}}
          >
            <div className="page__perks-header">
              perks header
            </div>
            Perks stuff
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
)(Exercise);