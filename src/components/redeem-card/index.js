import React from 'react';
import { connect } from 'react-redux';
import { ADD_EXERCISE_MINUTES } from '../../reducers/actions'

import Box from '../box';
import Button from '../button';
import thing from '../../assets/thing.jpg';

import './style/redeem-card.css';

export default function RedeemCard(props) {
  const { 
    description,
    points,
    title,
  } = props;

  return (
    <div className="redeem-card">
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
