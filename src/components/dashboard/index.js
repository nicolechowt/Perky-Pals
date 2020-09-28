import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './style/dashboard.css';
import ActivityBox from '../activity-box';
import Box from '../box';

import { 
  SAVE_CURRENT_USER,
  SAVE_TO_DASHBOARD, 
} from '../../reducers/actions'

function Dashboard(props) {
  console.log('DASHBOARD props', props)

  const { 
    saveToDashboard, 
    saveCurrentUser,

    currentUser = [],
    dashboard, 
    location, 
    users, 
  } = props;

  console.log('currentUser', currentUser);

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

  return (
    <div className="dashboard">
      <div>
        Activity overview
      </div>

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
      />

      <ActivityBox 
        header="MEDITATION"
      />

      <ActivityBox 
        header="SLEEP"
      />

      <ActivityBox 
        header="WATER"
      />

      <ActivityBox 
        header="FRUITS AND VEG"
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
    userReducer, 
  } = state;

  return { 
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,    
    users: userReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    saveCurrentUser: (data) => dispatch({ type: SAVE_CURRENT_USER, data}),
    saveToDashboard: (data) => dispatch({ type: SAVE_TO_DASHBOARD, data})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)