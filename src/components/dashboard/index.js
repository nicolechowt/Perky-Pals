import React from 'react';
import { Link } from "react-router-dom";
import './style/dashboard.css';
import Button from '../button';
import Header from '../header';
import ActivityBox from '../activity-box';
import Box from '../box';

export default function Dashboard(props) {
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
        julians progress
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
