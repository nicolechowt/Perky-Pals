import React, { useState } from "react";

import './style/redeem-preview.css';

export default function RedeemPreview(props) {
  const { title, description, points, userCurrentPoints, handleCancleClick, redeemItem } = props;
  const [viewState, setViewState] = useState('PREVIEW');


  // close modal
  return (
    <div>
      {viewState==='PREVIEW' && 
        <div>
          {title}
          {description}
          {points}
      
          <button onClick={()=>{setViewState('CHECKOUT')}}>
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
              
          <button onClick={handleCancleClick}>
            CANCEL
          </button>
        </div>
      }

      {viewState==='CONFIRMATION' && 
        <div>
          YES YES YES
          CONGRATS
      
          <button onClick={handleCancleClick}>
            CONFIRM
          </button>
        </div>
      }
    </div>
  );
}
