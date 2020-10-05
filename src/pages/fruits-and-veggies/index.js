import React from 'react';
import { connect } from 'react-redux';

import './style/fruits-and-veggies.css';
import BarGraph from '../../components/bar-graph';

function FruitsAndVeggies(props) {

  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const todaysFruitsAndVeggies = dashboard.fruitsAndVeggies || [];
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const fruitsAndVeggiesArr = [];

  weeklyData.map(day=>{
    if(day.fruitsAndVeggies>=0){
      fruitsAndVeggiesArr.push(day.fruitsAndVeggies);
    }
  });

  fruitsAndVeggiesArr.unshift(todaysFruitsAndVeggies);  

  return (
    <div className="exercise">
        <button onClick={() => goBack()}>GO BACK</button>
        <h1>FRUITS AND VEGGIES</h1>
        <h2>YOUR WEEK SO FAR</h2>

        <BarGraph 
          color="#CE4257"
          data={fruitsAndVeggiesArr}
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
)(FruitsAndVeggies);