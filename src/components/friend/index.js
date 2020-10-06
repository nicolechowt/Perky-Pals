import React from 'react';

import { COLORS } from '../../../src/enums/colors'
import './style/friend.css';

export default function Friend(props) {
  const { 
    name,
    ...rest
  } = props;

  const colorMap = {
    exercise: COLORS.EXERCISE,
    mindfulness: COLORS.MINDFULNESS,
    sleep: COLORS.SLEEP,
    water: COLORS.WATER,
    fruitsAndVeggies: COLORS.FRUITS_AND_VEGGIES,
    selfCheck: COLORS.SELF_CHECK,
    mammogram: COLORS.MAMMOGRAM,
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
      <div className="friend__header">
        {name}'S DAILY PROGRESS
      </div>
      <div className="friend__checks">{checks}</div>
      <div>Let her know she’s doing a good job!</div>
    </div>
  );
}
