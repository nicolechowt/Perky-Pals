import React from 'react';
import { connect } from 'react-redux';
import thing from '../../assets/thing.jpg';
import './style/redeem-card.css';
import { 
  ADD_MODAL,
} from '../../reducers/actions'

function RedeemCard(props) {
  const { 
    //dispatch props
    addModal,

    description,
    points,
    onClick,
    title,
  } = props;

  // const [set]

  return (
    <div 
      className="redeem-card"
      id={title+points}
      onClick={onClick}
    >
      <img 
        className="redeem-card__image"
        src={thing} 
      />

      <div className="redeem-card__text">
        <div>{title}</div>
        <div>{description}</div>
        <div>{points} points</div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RedeemCard)