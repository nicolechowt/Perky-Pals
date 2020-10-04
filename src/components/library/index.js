import React, { useState, useEffect } from "react";
import './style/library.css';
import Box from '../box';
import Overlay from '../overlay';
import { 
  ADD_MODAL,
  REMOVE_MODAL,
} from '../../reducers/actions'
import { connect } from 'react-redux';
import OverlayDetail from "./components/overlay-detail";


function Library() {
  const [viewState, setViewState] = useState('');

  return (
    <div className="library">
      <div 
        className="library__exercise"
        onClick={()=>setViewState('EXERCISE')}
      >
        <Box >
          EXERCISE STUFF
        </Box>
      </div>


      <div 
        className="library__exercise"
        onClick={()=>setViewState('MINDFULNESS')}
      >
        <Box >
          MINDFULNESS STUFF
        </Box>
      </div>

      <div 
        className="library__exercise"
        onClick={()=>setViewState('BREAST_HEALTH')}
      >
        <Box>
          BREAST HEALTH
        </Box>
      </div>

      <div 
        className="library__exercise"
        onClick={()=>setViewState('HEALTHY_EATING')}
      >
        <Box>
          HEALTHY EATING
        </Box>   
      </div>
   
      <div 
        className="library__exercise"
        onClick={()=>setViewState('SLEEP')}
      >
        <Box>
          SLEEP
        </Box>
      </div>

      {viewState==='EXERCISE' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            intro={<div>EXERCISE intro</div>}
            tips={<div>EXERCISE tips</div>}
            resources={<div>EXERCISE resources</div>}
          />
        </Overlay>
      }

      {viewState==='MINDFULNESS' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            intro={<div>MINDFULNESS intro</div>}
            tips={<div>MINDFULNESS tips</div>}
            resources={<div>MINDFULNESS resources</div>}
          />
        </Overlay>
      }
      
      {viewState==='BREAST_HEALTH' &&       
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            intro={<div>BREAST_HEALTH intro</div>}
            tips={<div>BREAST_HEALTH tips</div>}
            resources={<div>BREAST_HEALTH resources</div>}
          />
        </Overlay>  
      }

      {viewState==='HEALTHY_EATING' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            intro={<div>HEALTHY_EATINGintro</div>}
            tips={<div>HEALTHY_EATING tips</div>}
            resources={<div>HEALTHY_EATING resources</div>}
          />
        </Overlay>
      }
            
      {viewState==='SLEEP' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            intro={<div>SLEEP intro</div>}
            tips={<div>SLEEP tips</div>}
            resources={<div>SLEEP resources</div>}
          />
        </Overlay>
      }
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    currentUserReducer, 
    dashboardReducer,
    modalReducer,
  } = state;

  return { 
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,    
    modal: modalReducer,
  }
}
function mapDispatchToProps(dispatch) {
  return { 
    addModal: (data) => dispatch({ type: ADD_MODAL, data}),
    removeModal: () => dispatch({ type: REMOVE_MODAL}),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Library)