import React from 'react';
import { connect } from 'react-redux';

import Calendar from 'react-calendar';

import './style/mindfulness.css';

function Mindfulness(props) {
  const { goBack } = props.history;

  const { currentUser } = props;
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const mindfulWeekArr = [];
  if(weeklyData){
    weeklyData.forEach((day) => {
      if(day.mindfulness) {
        const dayObj = new Date(day.date)
        mindfulWeekArr.push(dayObj.toString());
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
          if(view === 'month' && mindfulWeekArr.includes(dateString)){
            return(
              <i
                class="fa fa-check-circle"
                style={{
                  fontSize:'24px',
                  color: "#56C4D3", 
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
