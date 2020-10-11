import React, { useState } from 'react';
import { COLORS } from '../../../../enums/colors';

import './style/redeem-card.css';

export default function RedeemCard(props) {
  const { 
    imageUrl,
    onClick,
    points,
    title,
    style,
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
        style={style? 
          {backgroundColor: style.backgroundColor} :
          {backgroundColor: COLORS.REDEEM}}
      >
        {title}
      </div>
    </div>
  );
}

