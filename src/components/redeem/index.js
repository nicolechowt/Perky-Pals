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

import MobileMammogram from './assets/redeem/Mobile_Mammogram.jpg'
import YogaClass from './assets/redeem/Yoga.jpg'

function Redeem(props) {
  const { 
    // dispatch props
    addModal,
    removeModal,
    redeemItem,
    currentUser=[],

    // props
    modal, 
    dashboard,
  } = props;

  const content = modal && modal.content;

  const userCurrentPoints = dashboard && dashboard.points;
  const currentUserName = currentUser[0] && currentUser[0].name;

  const handleOnClick = (filteredItem) => {
    addModal(filteredItem);
  }

  const imageMap = {
    1: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216385/fitbit_y0swh4.jpg',
    2: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/farmbox_wx7x83.png',
    3: MobileMammogram,
    4: YogaClass,
    5: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/gym_wtht2n.jpg',
    6: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/farmbox_wx7x83.png',
    7: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216385/physcial_therapy_cgf8ls.jpg',
    8: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/nutritionist_kyjhk8.jpg',
    9: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/therapy_bbcmit.png',
    10: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216384/blue_apron_kniyzk.jpg',
    11: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/farmstand_zqn6dc.jpg',
    12: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216386/social_work_jtharl.png'
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
                imageURL={content.imageURL}
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

    <div className="redeem__point">
      <div className="redeem__point-redeem">REDEEM YOUR POINTS</div>
      <div className="redeem__point-total-earned">
        Total Earned Perks: {currentUserName === 'Juliana' ? 1500 : 0}
      </div>
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