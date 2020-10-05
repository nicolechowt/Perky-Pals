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
  } = props;
  const [viewState, setViewState] = useState('PREVIEW');

  const categoriesEnums = ["EXERCISE","MINDFULNESS","SLEEP","WATER","FRUITS_AND_VEGGIES","SELF_CHECK", "MAMMOGRAM"];

  const notYetClaimed = pointsClaimed && !pointsClaimed.length ? categoriesEnums : 
    categoriesEnums.filter(category => !pointsClaimed.includes(category));

  // close modal
  return (
    <div>
      {viewState==='PREVIEW' && 
        <div>
          {title}
          {description}
          {points}
      
          <button 
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
        <div>
          CURRENT TOTAL {userCurrentPoints}
          FRESH PRODUCE {points}
          
          BALANCE {userCurrentPoints-points}
      
          <button 
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

      {viewState==='CONFIRMATION' && 
        <div>
          YES YES YES
          CONGRATS
      
          <button onClick={handleCancelClick}>
            CONFIRM
          </button>
        </div>
      }

      {viewState==='SORRY' && 
        <div>
          SORRY BUT KEEP UP WITH THE GOOD HABITS AND YOU WILL GET THERE IN NO TIME
      
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
                <div>
                  Not so sad yet, what about we {numToActivityMap[notYetClaimed[randomIndex]]} today to earn some extra perks? 
                </div>
              );
            }
          })()}
          <button onClick={handleCancelClick}>
            Ok :(
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
