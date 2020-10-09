import React, { useState } from "react";
import { connect } from 'react-redux';

import './style/redeem-preview.css';

function RedeemPreview(props) {
  const { 
    title, 
    description, 
    points, 
    userCurrentPoints, 
    handleCancelClick, 
    redeemItem,
    pointsClaimed,
    imageURL,
  } = props;
  const [viewState, setViewState] = useState('PREVIEW');

  const categoriesEnums = ["EXERCISE","MINDFULNESS","SLEEP","WATER","FRUITS_AND_VEGGIES","SELF_CHECK", "MAMMOGRAM"];

  const notYetClaimed = pointsClaimed && !pointsClaimed.length ? categoriesEnums : 
    categoriesEnums.filter(category => !pointsClaimed.includes(category));

  // close modal
  return (
    <div className="redeem-preview">
      {viewState==='PREVIEW' && 
        <div className="redeem-preview__container">
          <div className="redeem-preview__header"> REDEEM </div>
          <img className="redeem-preview__image" src={imageURL} />
          <div className="redeem-preview__title">{title} </div>
          <div className="redeem-preview__description">{description}</div>
          <div className="redeem-preview__points">{points} PERKS</div>
      
          <button 
            className="button--pill-yellow redeem__button"
            onClick={()=>{
              if(userCurrentPoints-points>0) {
                setViewState('CHECKOUT');
              } else {
                setViewState('SORRY');
              }
            }}
          >
            REDEEM
          </button>
        </div>
      }

      {viewState==='CHECKOUT' && 
        <div className="redeem-preview__container">
          <div className="redeem-preview__header"> CHECKOUT </div>
          <div className="redeem-preview__checkout-item">
            <div>Current Perks Balance</div>
            <div>{userCurrentPoints}</div>
          </div>

          <div className="redeem-preview__checkout-item">
            <div>{title}</div>
            <div>-{points}</div>
          </div>
          
          <div className="redeem-preview__checkout-balance" />

          <div className="redeem-preview__checkout-item">
            <div style={{fontWeight: 'normal'}}>New Perks Balance</div>
            <div>{userCurrentPoints-points}</div>
          </div>
      
          <button 
            className="button--pill-yellow redeem__button"
            onClick={()=>{
              redeemItem(points);
              setViewState('CONFIRMATION');
            }}
          >
            CONFIRM
          </button>
              
          <button onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      }

      {viewState==='SORRY' && 
        <div className="redeem-preview__container">
          <div className="redeem-preview__title">
            WE ARE SORRY.
          </div>
      
          <div className="redeem-preview__description">
            You don't have enough perks to redeem this item yet.
          </div>
          {/* 7 is the most categories they could claim in a day*/}
          {(()=>{
            if(notYetClaimed) {
              const randomIndex = Math.floor(Math.random() * Math.floor(notYetClaimed.length));

              const numToActivityMap = {
                EXERCISE: 'get in a little exercise',
                MINDFULNESS: 'get in a mindful moment',
                SLEEP: "try to go to bed a little earlier",
                WATER: 'get an extra sip of water',
                FRUITS_AND_VEGGIES: 'get in an extra serving of fruits later',
                SELF_CHECK: 'perform a self check', 
                MAMMOGRAM: 'schedule a mammogram',
              };

              return(
                <div className="redeem-preview__description">
                  But, we can {numToActivityMap[notYetClaimed[randomIndex]]} today to earn some extra perks ;)
                </div>
              );
            }
          })()}
          <button 
            onClick={handleCancelClick}
            className="button--pill-yellow redeem__button redeem__button--long"
          >
            SOUNDS GOOD
          </button>
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
    pointsClaimed: dashboardReducer.pointsClaimed,
  }
}

export default connect(
  mapStateToProps,
  null,
)(RedeemPreview)
