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
import LibraryIntro from "./components/library-intro";
import LibraryTips from "./components/library-tips";
import LibraryResources from "./components/library-resources";

import { COLORS } from '../../../src/enums/colors'

function Library() {
  const [viewState, setViewState] = useState('');

  return (
    <div className="library">
      <div 
        className="library__box"
        style={{backgroundColor: `${COLORS.EXERCISE}`}}
      >
        <Box onClick={()=>setViewState('EXERCISE')}>
          EXERCISE
        </Box>
      </div>


      <div 
        className="library__box"
        style={{backgroundColor: `${COLORS.MINDFULNESS}`}}
      >
        <Box onClick={()=>setViewState('MINDFULNESS')}>
          MINDFULNESS
        </Box>
      </div>

      <div 
        className="library__box library__box-breast"
        style={{backgroundColor: `${COLORS.MAMMOGRAM}`}}
      >
        <Box onClick={()=>setViewState('BREAST_HEALTH')}>
          BREAST HEALTH
        </Box>
      </div>

      <div 
        className="library__box"
        style={{backgroundColor: `${COLORS.FRUITS_AND_VEGGIES}`}}
      >
        <Box onClick={()=>setViewState('HEALTHY_EATING')}>
          HEALTHY EATING
        </Box>   
      </div>
   
      <div 
        className="library__box"
        style={{backgroundColor: `${COLORS.SLEEP}`}}
      >
        <Box onClick={()=>setViewState('SLEEP')}>
          SLEEP
        </Box>
      </div>

      {viewState==='EXERCISE' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            name='EXERCISE'
            color={COLORS.EXERCISE}
            intro={<LibraryIntro name='EXERCISE' />}
            tips={<LibraryTips name='EXERCISE' />}
            resources={<LibraryResources name='EXERCISE' />}
          />
        </Overlay>
      }

      {viewState==='MINDFULNESS' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            name='MINDFULNESS'
            color={COLORS.MINDFULNESS}
            intro={<LibraryIntro name='MINDFULNESS' />}
            tips={<LibraryTips name='MINDFULNESS' />}
            resources={<LibraryResources name='MINDFULNESS' />}
          />
        </Overlay>
      }
      
      {viewState==='BREAST_HEALTH' &&       
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            name="BREAST HEALTH"
            color={COLORS.MAMMOGRAM}
            intro={<LibraryIntro name='BREAST HEALTH' />}
            tips={<LibraryTips name='BREAST HEALTH' />}
            selfcheck={<LibraryTips name='BREAST HEALTH SELF CHECK' />}
            mammogram={<LibraryTips name='BREAST HEALTH MAMMOGRAM' />}
            resources={<LibraryResources name='BREAST HEALTH' />}
          />
        </Overlay>  
      }

      {viewState==='HEALTHY_EATING' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            name="HEALTHY EATING"
            color={COLORS.FRUITS_AND_VEGGIES}
            intro={<LibraryIntro name='HEALTHY EATING' />}
            tips={<LibraryTips name='HEALTHY EATING' />}
            resources={<LibraryResources name='HEALTHY EATING' />}
          />
        </Overlay>
      }
            
      {viewState==='SLEEP' &&         
        <Overlay onClose={()=>setViewState('')}>
          <OverlayDetail
            name="SLEEP"
            color={COLORS.SLEEP}
            intro={<LibraryIntro name='SLEEP' />}
            tips={<LibraryTips name='SLEEP' />}
            resources={<LibraryResources name="SLEEP" />}
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