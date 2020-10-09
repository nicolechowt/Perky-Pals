import React, { useState } from 'react';
import { COLORS } from '../../../../enums/colors';

import './style/redeem-card.css';

export default function RedeemCard(props) {
  const { 
    description,
    imageUrl,
    onClick,
    points,
    title,
  } = props;

  const [isImageDoneLoading, setisImageDoneLoading]=useState(false);

  return (
    <div 
      className="redeem-card"
      id={title+points}
      onClick={onClick}
    >
      <img 
        className={ isImageDoneLoading ? "redeem-card__image" : "redeem-card__image--loading"}
        onLoad={()=>setisImageDoneLoading(true)}
        src={imageUrl} 
      />

      <div 
        className="redeem-card__text"
        style={{backgroundColor: COLORS.REDEEM}}
      >
        {title}
      </div>
    </div>
  );
}

