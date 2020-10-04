import React from 'react';

import './style/friend.css';


export default function Friend(props) {
  const { 
    name,
    ...rest
  } = props;

  const exerciseColor = '#f89b54';
  const mindfulnessColor = '#56c4d3';
  const sleepColor = '#3777FF';
  const waterColor = '#F278C3';
  const fruitsAndVeggiesColor = '#ce4257';
  const selfCheckColor = '#FF9B54';
  const mammogramColor = '#56c4d3';

  const colorMap = {
    exercise: exerciseColor,
    mindfulness: mindfulnessColor,
    sleep: sleepColor,
    water: waterColor,
    fruitsAndVeggies: fruitsAndVeggiesColor,
    selfCheck: selfCheckColor,
    mammogram: mammogramColor,
  }
  const checks = []

  for(let prop in rest){
    if(rest[prop]) {
      checks.push(
        <i
          class="fa fa-check-circle"
          style={{
            fontSize:'28px',
            color: colorMap[prop], 
            padding: '4px'
          }}
        />
      )
    } else {
      checks.push(
        <i
          class="fa fa-circle"
          style={{
            fontSize:'18px',
            color: "#C4C4C4", 
            padding: '4px'
          }}
        />
      )
    }
  }

  return (
    <div className="friend">
      {name}'S DAILY PROGRESS
      <div className="friend__checks">{checks}</div>
      <div>Let her know she’s doing a good job!</div>
    </div>
  );
}
