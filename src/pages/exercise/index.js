import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";

import './style/exercise.css';
import ActivityRing from '../../components/activity-ring';

function ActivityItem(props) {
  const { activity, duration, day} = props;

  console.log('day', day);

  return (
    <div>
      {day !=="TODAY" ? <span>{day} </span> : <span>TODAY</span>}
      {activity && <div className="exercise__activity-item"> {activity} </div>}
      {duration && <span>{duration}</span>}
    </div>

  )
}

const obj = {};

function Exercise(props) {
  let totalExerciseMinutes = 0;

  const { goBack } = props.history;
  const { currentUser, dashboard } = props;

  const exerciseGoal = dashboard.goals && dashboard.goals.exercise;

  const todaysExercises = dashboard.exercises || [];
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];


  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));


  useEffect(() => {
    setData(generateData());
  },
  [!data]
  );

  const arrToGraph = [];

  for(const prop in obj) {
    arrToGraph.push({
      activity: prop,
      totalDuration: obj[prop],
    })
  }

  console.log('obj', obj);
  console.log('arrToGraph', arrToGraph)

  return (
    <div className="exercise">
        <button onClick={() => goBack()}>GO BACK</button>
        <h1>EXERCISE</h1>
        <h2>YOUR WEEK SO FAR</h2>

        <ActivityRing 
          data={arrToGraph}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />

        {obj.left && (
          <div>{obj.left} more minutes to go!</div>
        )}
        
        {/* adding todays to graph */}
        {todaysExercises.map(ex =>{
            if(obj[ex.activity]) {
              obj[ex.activity]= obj[ex.activity] + ex.duration;
            } else {
              obj[ex.activity] = ex.duration;
            }

            totalExerciseMinutes += ex.duration;

            console.log('ex.act', ex.activity);
            console.log('ex.du', ex.duration);

            return (
              <ActivityItem 
                day="TODAY"
                activity={ex.activity} 
                duration={ex.duration} 
              />
            );
        })}

        {/* adding the rest of this week's */}
        <div>
          {weeklyData.map(day=>{
            return (
              <div>
                {day.exercises.length>0 && day.exercises.map((item,key) => {

                  console.log('item', item)
                  // see if key already exists
                  // if so add to val
                  if(obj[item.activity]) {
                    obj[item.activity]= obj[item.activity] + item.duration;
                  } else {
                    obj[item.activity] = item.duration;
                  }

                  totalExerciseMinutes += item.duration;

                  return (
                    <ActivityItem 
                      day={day.date}
                      activity={item.activity} 
                      duration={item.duration} 
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
        
        {(()=>{
          const left = exerciseGoal-totalExerciseMinutes > 0 ? exerciseGoal-totalExerciseMinutes: 0
          if(left) {
            obj["left"]= left;
          }
        })()}

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
)(Exercise);