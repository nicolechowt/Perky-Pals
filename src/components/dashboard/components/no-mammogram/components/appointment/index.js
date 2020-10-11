import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import './style/appointment.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Appointment(props) {
  const { 
    onGetHelp,
    onDone, 

    dashboard,
    goals,
    pointsClaimed,

    addMammogram,
    addModal, 
    addPoints,
    addPointsDetails,
  } = props;

  const [mammogramDate, setMammogramDate] = useState(new Date());

  const mammogramGoal = goals && goals.mammogram;
  const scheduledMammogram = dashboard && dashboard.scheduledMammogram;

  const handleOnDone = (event) => {
    event.stopPropagation();
    addMammogram({
      mammogram: 1,
      date: mammogramDate,
    })

    if(
      !pointsClaimed.includes('MAMMOGRAM')
    ) {
      addPoints(120);
      addModal(  {
        title: 'YAY!', 
        body1: 'You just earned',
        number: '+120 perks',
        footer:  'Keep up the good work!',
      });
      addPointsDetails('MAMMOGRAM')
    }
    onDone && onDone();
  }

  return (
    <div className="appointment">
      <div className="appointment__header">
        make an appointment
      </div>

      <div className="appointment__text">
        It’s important to get a mammogram every year - early detection leads to better treatmeant options and outcomes. You’re not alone. Many women feel intimidated, but we’ll let you know what to expect.
      </div>

      <div className="appointment__text">
        When’s your appointment? We’ll send you a rememinder when it’s coming up.
      </div>

      <div 
        className="appointment__text"
        onClick={(event)=>{
          event.stopPropagation();
        }}
      >
        <Calendar 
          onChange={(date)=> setMammogramDate(date)}
          value={mammogramDate}
        />
      </div>

      <div className="appointment__help">
        NEED help making an apointment or finding a clinic?

        <button 
          className="appointment__help-button button--pill-yellow"
          onClick={(event)=>{
            event.stopPropagation();
            onGetHelp && onGetHelp();
          }}
        >
          GET HELP
        </button>
      </div>

      <div className="appointment__action-buttons">
        <button 
          className="button--pill-yellow button--pill--long"
          onClick={handleOnDone}
        >
          DONE
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    dashboardReducer,
  } = state;

  return {  
    dashboard: dashboardReducer,    
    goals: dashboardReducer.goals,
    pointsClaimed: dashboardReducer.pointsClaimed,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    addMammogram:(data) => dispatch({ type: "ADD_MAMMOGRAM", data}),
    addPoints: (data) => dispatch({ type: "ADD_POINTS", data}),
    addPointsDetails: (data) => dispatch({ type:"ADD_POINTS_DETAILS", data}),
    addModal: (data) => dispatch({ type: 'ADD_MODAL', data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointment)
