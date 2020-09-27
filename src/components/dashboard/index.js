import React from 'react';
import { connect } from 'react-redux';
import './style/dashboard.css';
import ActivityBox from '../activity-box';
import Box from '../box';

function Dashboard(props) {
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
        header="EXERCISE"
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
  const { userReducer } = state
  return { 
    users: userReducer[0].users,
  }
}

export default connect(
  mapStateToProps,
)(Dashboard)