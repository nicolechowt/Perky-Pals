import React from 'react';
import { connect } from 'react-redux';
import { ADD_MODAL } from '../../../../reducers/actions'
import { COLORS } from '../../../../enums/colors'

import {
  withRouter,
} from "react-router-dom";

import './style/points-overlay.css';

function PointsOverlay(props) {
  const { 
    title,
    body1,
    number,
    body2,
    footer,
    link,
  } = props;

  const nextPath = (path) => {
    props.history.push(path);
  }

  return (
    <div className="points-overlay">

      {title==='YAY!'? (
        // special yay styling
        <div className="points-overlay__title--yay">
          <div className="points-overlay__title-y">
            Y
            <div className="points-overlay__title-a">
              A
            </div>
          </div>


          <div className="points-overlay__title-y-2">
            Y  
            <div className="points-overlay__title-ex">!</div>
          </div>

        </div>
      ):
        <div className="points-overlay__title">{title}</div>
      }

      <div className="points-overlay__body">{body1}</div>

      {/* optional */}
      {number && <div className="points-overlay__number">{number}</div>}
      {body2 &&<div className="points-overlay__body">{body2}</div>}

      {title==='YAY!'? (
        <div className="points-overlay__footer points-overlay__footer--orange">{footer}</div>
      ): 
        <div 
          className="points-overlay__footer points-overlay__footer--link"
          onClick={(event)=>{
            event.stopPropagation();
            link && nextPath(link);
          }}
        >
          {footer}
          <i
            className="fa fa-chevron-circle-right" 
            style={{
              fontSize:'22px',
              padding: '4px'
            }}
          />
        </div>
      }
    </div>
  );
}

function mapStateToProps(state) {
  const { 
    dashboardReducer,
  } = state;

  return {  
    exerciseMinutes: dashboardReducer.exercise,
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    addModal: (data) => dispatch({ type: ADD_MODAL, data}),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PointsOverlay)
);