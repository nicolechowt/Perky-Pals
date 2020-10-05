import React from 'react';
import { connect } from 'react-redux';

import Calendar from 'react-calendar';
import { COLORS } from '../../../src/enums/colors'

import './style/mindfulness.css';

function Mindfulness(props) {
  const { goBack } = props.history;

  const { currentUser } = props;
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];


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

      // need to pad it with zero if it's a single digit
      if (newDay<10){
        newDay = ('0' + newDay).slice(-2)
      }

      if (newMonth<10){
        newMonth = ('0' + newMonth).slice(-2)
      }

      return `2020-${newMonth}-${newDay}`
    }

    // otherwise, process the "normal dates"
    let normalDay = todaysDay - numsToGoBack;
    let normalMonth = month;

    if (normalDay<10){
      normalDay = ('0' + normalDay).slice(-2)
    }

    if (normalMonth<10){
      normalMonth = ('0' + normalMonth).slice(-2)
    }

    return `2020-${normalMonth}-${normalDay}`
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

  const mindfulWeekArr = [];
  if(weeklyData){
    weeklyData.forEach((day) => {
      if(day.mindfulness) {
        const processedDate = new Date(dayToDateMap[day.date]);

        // for some reason the timestamp for this date object is different than 
        // react-calendar's, just grab the substring for now, and ignore time
        const processedDateString = processedDate.toString().substring(0,15);
        mindfulWeekArr.push(processedDateString);
      }
    })
  }

  console.log('mind', mindfulWeekArr)

  return (
    <div className="mindfulness">
      <h1>MINDFULNESS</h1>
      <h2>YOUR WEEK SO FAR</h2>
      <button onClick={() => goBack()}>GO BACK</button>
      <Calendar 
        tileContent={({ activeStartDate, date, view }) => {
          const dateString = date.toString();
          const processedDateString = dateString.substring(0,15)

          if(view === 'month' && mindfulWeekArr.includes(processedDateString)){
            return(
              <i
                class="fa fa-check-circle"
                style={{
                  fontSize:'24px',
                  color: COLORS.MINDFULNESS, 
                  padding: '4px'
                }}
              />
            );
          }
          return(
            <i
              class="fa fa-circle"
              style={{
                fontSize:'18px',
                color: "#DEDEDE", 
                padding: '4px'
              }}
            />
          )
        }}
      />

      <div>
        Tips stuff
      </div>

      <div>
        Perks stuff
      </div>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mindfulness)
