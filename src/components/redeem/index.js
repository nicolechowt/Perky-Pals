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
import { COLORS } from '../../enums/colors';

import Fitbit from './assets/redeem/fitbit.jpg'
import FarmFreshBox from './assets/redeem/farmbox.png'
import MobileMammogram from './assets/redeem/Mobile_Mammogram.jpg'
import YogaClass from './assets/redeem/Yoga.jpg'
import MonthGymMembership from './assets/redeem/gym.jpg'
import Physical from './assets/redeem/physcial_therapy.jpg'
import Nutritionist from './assets/redeem/nutritionist.jpg'
import Therapy from './assets/redeem/therapy.png'
import BlueApron from './assets/redeem/blue_apron.jpg'
import FarmStand from './assets/redeem/farmstand.jpg'

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

  const imageMap = {
    1: Fitbit,
    2: FarmFreshBox,
    3: MobileMammogram,
    4: YogaClass,
    5: MonthGymMembership,
    6: FarmFreshBox,
    7: Physical,
    8: Nutritionist,
    9: Therapy,
    10: BlueApron,
    11: FarmStand
  }

  return (
    <div className="redeem">
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
                handleCancelClick={()=>removeModal()}
                redeemItem={redeemItem}
              />
            </Overlay>
          )
        }
      })()}

    <div 
      className="redeem__point-way-to-go"
      style={{backgroundColor: COLORS.REDEEM}}
    >
      WAY TO GO!
      <div>Total Earned Perks: 10</div>
    </div>

    <div className="redeem__body">
      <div 
        className="redeem__point-header"
        style={{color: COLORS.REDEEM}}
      >
        350 points
      </div>
      {items.filter(item => item.points===350).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          onClick={()=> handleOnClick(filteredItem)}
          title={filteredItem.title}
          imageUrl={imageMap[filteredItem.id]}
        />
      ))}

      <div 
        className="redeem__point-header"
        style={{color: COLORS.REDEEM}}
      >
        750 points
      </div>
      {items.filter(item => item.points===750).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          onClick={()=> handleOnClick(filteredItem)}
          title={filteredItem.title}
          imageUrl={imageMap[filteredItem.id]}
        />
      ))}

      <div 
        className="redeem__point-header"
        style={{color: COLORS.REDEEM}}
      >
        1000+ points
      </div>
      {items.filter(item => item.points>=1000).map(filteredItem => (
        <RedeemCard 
          description={filteredItem.description}
          onClick={()=> handleOnClick(filteredItem)}
          title={filteredItem.title}
          imageUrl={imageMap[filteredItem.id]}
        />
      ))}
      </div>
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