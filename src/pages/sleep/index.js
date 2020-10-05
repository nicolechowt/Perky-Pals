import React from 'react';
import { connect } from 'react-redux';

import './style/sleep.css';
import BarGraph from '../../components/bar-graph';


function Sleep(props) {
  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const todaysSleep = dashboard.sleep || [];
  console.log('todaysSleep', todaysSleep);
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const sleepArr = [];

  weeklyData.map(day=>{
    if(day.sleep>=0){
      sleepArr.push(day.sleep);
    }
  });

  sleepArr.unshift(todaysSleep);

  return (
    <div className="exercise">
        <button onClick={() => goBack()}>GO BACK</button>
        <h1>SLEEP</h1>
        <h2>YOUR WEEK SO FAR</h2>

        <BarGraph 
          color="#3777FF"
          data={sleepArr}
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
)(Sleep);