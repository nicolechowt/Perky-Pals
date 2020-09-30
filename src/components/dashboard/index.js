import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './style/dashboard.css';
import ActivityBox from '../activity-box';
import Box from '../box';
import Overlay from '../overlay';

import { 
  SAVE_CURRENT_USER,
  SAVE_TO_DASHBOARD, 
} from '../../reducers/actions'
import ProgressRing from '../progress-ring';

function Dashboard(props) {
  const { 
    saveToDashboard, 
    saveCurrentUser,
    removeModal,

    currentUser = [],
    dashboard, 
    location, 
    users, 
    modal,
  } = props;

  const search = location.search;
  const urlParams = new URLSearchParams(search);

  const param = urlParams.get('user');
  const userId = parseInt(param) || 1;

  const user = users.filter(user=>user.id===userId);

  const goals = currentUser[0] && currentUser[0].goals;
  const data =  currentUser[0] && currentUser[0].data;

  const todaysData = data && data[0];

  const dashboardData = {
    todaysData,
    goals,
  }

  const id = currentUser[0] && currentUser[0].id;

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

  const content = modal && modal.content;

  useEffect(()=>{ 
    // based on the query param, load that user's hardcoded data from store
    if(Object.entries(currentUser).length === 0) {
      saveCurrentUser(user)
    };
  }, []);

  useEffect(()=> {
    // when the id changes, that's when we know which user's data to display
    // save dashboard relevant data to dashboard reducer
    if(id && Object.entries(dashboard).length === 0) {
      saveToDashboard(dashboardData);
    }
  }, [id]);

  const svgWidth = 150;
  const arcWidth = 12;
  const [progressPercentage, setProgressPercentage] = useState(50);
  const colorIndicator = '#56c4d3';

  return (
    <div className="dashboard">
      {(()=> {
        if(!content) return;

        if(content.title){
          return(
            <Overlay onClose={()=>{
              removeModal();
            }}>
              {content.title}
            </Overlay>
          )
        }
      })()}

      <div>
        Activity overview
      </div>

      <ProgressRing
        svgWidth={svgWidth}
        arcWidth={arcWidth}
        progressPercentage={progressPercentage}
        colorIndicator={colorIndicator}
      />

      <Box>
        <div>
          tips
        </div>
      </Box>

      <ActivityBox 
        display="number"
        goal={exerciseGoal}
        header="EXERCISE"
        length={exercise}
        unit="minutes"
        frequency="weekly"
      />

      <ActivityBox 
        display="number"
        goal={mindfulnesseGoal}
        header="MINDFULNESS"
        length={mindfulness}
        unit="minutes"
        frequency="weekly"
      />

      <ActivityBox 
        display="bar"
        header="SLEEP"
        goal={sleepGoal}
        length={sleep}
        unit="hours"
        frequency="daily"
      />

      <ActivityBox 
        header="WATER"
        goal={waterGoal}
        length={water}
        unit="oz"
        frequency="daily"
      />

      <ActivityBox 
        header="FRUITS-AND-VEGGIES"
        goal={fruitsAndVeggiesGoal}
        length={fruitsAndVeggies}
        unit="servings"
        frequency="daily"
      />

      <div>
        juliannas progress
      </div>

      <ActivityBox 
        header="SELF CHECK"
      />

      <ActivityBox 
        header="MAMMOGRAM"
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    currentUserReducer, 
    dashboardReducer,
    modalReducer,
    userReducer, 
  } = state;

  return { 
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,    
    modal: modalReducer,
    users: userReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    saveCurrentUser: (data) => dispatch({ type: SAVE_CURRENT_USER, data}),
    saveToDashboard: (data) => dispatch({ type: SAVE_TO_DASHBOARD, data}),
    removeModal: () => dispatch({ type: 'REMOVE_MODAL'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)