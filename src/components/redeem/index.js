import React from 'react';
import { connect } from 'react-redux';
import { 
  ADD_MODAL,
  REMOVE_MODAL,
  REDEEM_ITEM,
} from '../../reducers/actions'

import { items } from '../../data/redeemItems';

import Overlay from '../overlay';
import RedeemCard from './components/redeem-card';
import RedeemPreview from './components/redeem-preview';

import './style/redeem.css';

function Redeem(props) {
  const { 
    // dispatch props
    addModal,
    removeModal,
    redeemItem,

    // props
    modal, 
    dashboard,
  } = props;

  const content = modal && modal.content;

  const userCurrentPoints = dashboard && dashboard.points;

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
              <RedeemPreview 
                title={content.title}
                description={content.description}
                points={content.points}
                userCurrentPoints={userCurrentPoints}
                handleCancleClick={()=>{
                  removeModal();
                }}
                redeemItem={redeemItem}
              />
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
    removeModal: () => dispatch({ type: REMOVE_MODAL}),
    redeemItem: (data) => dispatch({ type: REDEEM_ITEM, data})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Redeem)