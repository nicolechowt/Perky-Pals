import React, { useState, useEffect } from "react";
import './style/library.css';
import Box from '../box';
import Overlay from '../overlay';
import { 
  ADD_MODAL,
  REMOVE_MODAL,
} from '../../reducers/actions'
import { connect } from 'react-redux';
import { exportDefaultSpecifier } from "@babel/types";

function Library(props) {
  const { 
    // dispatch props
    addModal,
    removeModal,

    // props
    modal, 
  } = props;

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
        <Overlay>
          EXERCISE STUFF
        </Overlay>
      }

      {viewState==='MINDFULNESS' &&         
        <Overlay>
          MINDFULNESS STUFF
        </Overlay>
      }
      
      {viewState==='BREAST_HEALTH' &&         
        <Overlay>
          BREAST_HEALTH STUFF
        </Overlay>
      }

      {viewState==='HEALTHY_EATING' &&         
        <Overlay>
          HEALTHY_EATINGSTUFF
        </Overlay>
      }
            
      {viewState==='SLEEP' &&         
        <Overlay>
          SLEEP STUFF
        </Overlay>
      }

      {viewState==='EXERCISE' &&         
        <Overlay>
          EXERCISE STUFF
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