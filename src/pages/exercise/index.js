import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

import './style/exercise.css';
import ActivityRing from '../../components/activity-ring';

import { COLORS } from '../../../src/enums/colors'
import TipBox from '../../components/tip-box';

import { items } from '../../data/redeemItems';
import RedeemCard from '../../components/redeem/components/redeem-card'

function ActivityItem(props) {
  const { 
    activity, 
    day, 
    duration, 
    index,
    key, 
  } = props;

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
      style={index%2===0 ? 
        {color: COLORS.EXERCISE} : 
        {color: COLORS.EXERCISE_ALT}
      }
    >
      {day !=="TODAY" ? 
        <div>{dayToDateMap[day]}</div> : 
        <div>{month}/{today}</div>
      }
      {activity && 
        <div className="activity-item__activity"> {activity} </div>
      }
      {duration && <div>{duration} MIN</div>}
    </div>

  )
}

const obj = {};

function Exercise(props) {
  let totalExerciseMinutes = 0;

  const { goBack } = props.history;
  const { currentUser, dashboard, tips } = props;
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

  const nextPath = (path) => {
    props.history.push(path);
  }

  const handleOnClick = (filteredItem) => {
    nextPath('/redeem');
  }

  const imageMap = {
    1: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216385/fitbit_y0swh4.jpg',
    2: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/farmbox_wx7x83.png',
    3: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602349684/Mobile_Mammogram_cohiay.jpg',
    4: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602349680/Yoga_lihfpp.jpg',
    5: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/gym_wtht2n.jpg',
    6: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/farmbox_wx7x83.png',
    7: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216385/physcial_therapy_cgf8ls.jpg',
    8: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/nutritionist_kyjhk8.jpg',
    9: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/therapy_bbcmit.png',
    10: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216384/blue_apron_kniyzk.jpg',
    11: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/farmstand_zqn6dc.jpg',
    12: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216386/social_work_jtharl.png'
  }

  return (
    <div className="exercise page">
      <div className="page__progess">
          <div          
            className="page__back-button"
            onClick={() => goBack()}
          >
            <i
              className="fa fa-angle-left"
              style={{
                fontSize:'36px',
                color: "#4B5B7E", 
                padding: '4px'
              }}
            />
        </div>

        <div className="page__header">EXERCISE</div>
        <div className="page__sub-header">YOUR WEEK SO FAR</div>

        <div className="page__sub-graph">
          <ActivityRing 
            data={arrToGraph}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>

        <div className="page__caption">
          {obj.left ? (
            <div>
              You're <span style={{color: COLORS.EXERCISE}}>{obj.left} min </span> away from your weekly goal of <span style={{color: COLORS.EXERCISE}}>{exerciseGoal}  min</span>
            </div>
          ): (
            <div>GOAL ACHIEVED! WAY TO KICK BUTT</div>
          )}
        </div>
      </div>
        {/* adding the rest of this week's to render the list of activities */}
        <div>
          {weeklyData.map((day,weeklyIndex)=>{
            return (
              <div>
                {day.exercises.length>0 && day.exercises.map((item,index) => {
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
                      index={weeklyIndex}
                      key={index} 
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
          <div className="page__tip-box">
            <TipBox 
              style={{
                border: '4px solid white',
                color: 'white',
              }}
              title={tips.title}
              text={tips.text}
              link={tips.link}
            />
          </div>

          <div 
            className="page__perks"
            style={{color: COLORS.EXERCISE}}
          >
            <div className="page__perks-header">
              WHAT ABOUT SOME PERKS?
            </div>

            {items.filter(item => item.type.includes('EXERCISE')).map(filteredItem => (
              <RedeemCard 
                key={`exercise-${filteredItem.id}`}
                description={filteredItem.description}
                onClick={()=> handleOnClick(filteredItem)}
                title={filteredItem.title}
                imageUrl={imageMap[filteredItem.id]}
                style={{backgroundColor: COLORS.EXERCISE}}
              />
            ))}
          </div>
        </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    currentUserReducer,
    dashboardReducer,
    tipsReducer,
  } = state;

  return {   
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,
    tips: tipsReducer && tipsReducer.exercise[0],
  }
}

export default connect(
  mapStateToProps,
  null,
)(Exercise);