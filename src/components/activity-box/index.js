import React from 'react';
import './style/activity-box.css';
import Box from '../box';

export default function ActivityBox(props) {
  const { header } = props;

  return (
    <div className="activity-box">
      <Box>
        <h2>{header}</h2>
        <button className="activity-box__plus">+</button>
      </Box>
    </div>
  );
}
