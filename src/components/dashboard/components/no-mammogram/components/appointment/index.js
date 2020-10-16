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
    addMammogramNotes,
    addModal, 
    addPoints,
    addPointsDetails,
  } = props;

  const [mammogramDate, setMammogramDate] = useState(new Date());

  const mammogramGoal = goals && goals.mammogram;
  const scheduledMammogram = dashboard && dashboard.scheduledMammogram;


  const year = mammogramDate.getFullYear();
  const month = mammogramDate.getMonth()+1;
  const day = mammogramDate.getDate();

  const mammogramScheduledPast = mammogramDate  < new Date();

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
      addPointsDetails('MAMMOGRAM');
      if(mammogramScheduledPast) {
        addMammogramNotes({
          date: `${year}-${month}-${day}`,
          content: 'No notes were added.',
        });
      }
    }
    onDone && onDone();
  }

  return (
    <div 
      className="appointment"
      onClick={(event)=> {
        event.stopPropagation();
      }}
    >
      <div className="appointment__header">
        When's your mammogram?
      </div>

      <div className="appointment__text">
        It’s important to get a mammogram every year - early detection leads to better treatmeant options and outcomes.
      </div>

      <div className="appointment__text">
        Already had your mammogram for the year? High five! Let us know below by selecting the date you had your appointment so we can remind you when you're due for your next one.
      </div>

      <div className="appointment__text">
        Have one scheduled for later? No worries, put it down on the calendar and we will send you a reminder prior to the appointment.
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

      {/* <div className="appointment__help">
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
      </div> */}

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
    addMammogramNotes:(data) => dispatch({ type: "ADD_MAMMOGRAM_NOTES", data}),
    addPoints: (data) => dispatch({ type: "ADD_POINTS", data}),
    addPointsDetails: (data) => dispatch({ type:"ADD_POINTS_DETAILS", data}),
    addModal: (data) => dispatch({ type: 'ADD_MODAL', data}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Appointment)
