import React, { useState } from 'react';
import { connect } from 'react-redux';

import 'react-calendar/dist/Calendar.css';
import HelpOverlay from '../../../help-overlay';
import Overlay from '../../../overlay';
import Appointment from './components/appointment';

import './style/no-mammogram.css';

function NoMammogram(props) {
  const [overlayView, setOverlayView] = useState(null);

  return (
    <div className="no-mammogram">
      <div>Don’t forget about your annual mammogram</div>
      <div 
        className="no-mammogram__circle-right"
        onClick={(event)=>{
          event.stopPropagation();
          setOverlayView('APPOINTMENT')
        }}
      >
        MAKE AN APPOINTMENT
        <i
          className="fa fa-chevron-circle-right" 
          style={{
            fontSize:'22px',
            padding: '4px'
          }}
        />
      </div>

      {overlayView === 'APPOINTMENT' && (
        <Overlay onClose={()=>setOverlayView(null)}>
          <Appointment 
            onGetHelp={()=>setOverlayView('HELP')}
            onDone={()=>setOverlayView(null)}
          />
        </Overlay>
      )}        

      {overlayView=== 'HELP' && (
        <Overlay onClose={()=>setOverlayView('APPOINTMENT')}>
          <HelpOverlay />
        </Overlay>
      )}            
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    dashboardReducer,
    currentUserReducer,
  } = state;

  return {  
    dashboard: dashboardReducer,    
    currentUser: currentUserReducer.currentUser,
    exerciseMinutes: dashboardReducer.exercise,
    goals: dashboardReducer.goals,
    pointsClaimed: dashboardReducer.pointsClaimed,
  }
}

export default connect(
  mapStateToProps,
  null,
)(NoMammogram)
