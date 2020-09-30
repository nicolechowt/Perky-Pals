import React from 'react';
import './style/redeem.css';
import RedeemCard from '../redeem-card';
import Overlay from '../overlay';
import { connect } from 'react-redux';
import { 
  ADD_MODAL,
  REMOVE_MODAL,
} from '../../reducers/actions'

import { items } from '../../data/redeemItems';

function Redeem(props) {
  const { 
    // dispatch props
    addModal,
    removeModal,

    // props
    modal, 
  } = props;

  const content = modal && modal.content;

  const handleOnClick = (filteredItem) => {
    addModal(filteredItem);
  }

  return (
    <div className="redeem">
      Redeem

      {(()=> {
        if(!content) return;

        if(content.title){
          return(
            <Overlay onClose={()=>{
              removeModal();
            }}>
              {content.title}
              {content.description}
              {content.points}
            </Overlay>
          )
        }
      })()}

      <h4>10 points</h4>
      {items.filter(item => item.points===10).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          onClick={()=> handleOnClick(filteredItem)}
          points={filteredItem.points}
          title={filteredItem.title}
        />
      ))}

      <h4>20 points</h4>
      {items.filter(item => item.points===20).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          onClick={()=> handleOnClick(filteredItem)}
          points={filteredItem.points}
          title={filteredItem.title}
        />
      ))}

      <h4>30+ points</h4>
      {items.filter(item => item.points>=30).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          onClick={()=> handleOnClick(filteredItem)}
          points={filteredItem.points}
          title={filteredItem.title}
        />
      ))}
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
    removeModal: () => dispatch({ type: REMOVE_MODAL})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Redeem)