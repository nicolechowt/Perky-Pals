import React from 'react';

import './style/mammogram-help.css';

import { COLORS } from '../../../src/enums/colors'

export default function MammogramHelp(props) {
  const { header, address, website, miles, phone, } = props;

  return (
    <div className="mammogram-help">
      <div className="mammogram-help__header">
        {header}
      </div>
      <div className="mammogram-help__address">
        {address}
      </div>
      <div className="mammogram-help__phone">
        {phone}
      </div>
      <div className="mammogram-help__website-miles">
        <div 
          className="mammogram-help__website"
          style={{color: COLORS.MAMMOGRAM}}
        >
          {website}
        </div>
        <div className="mammogram-help__miles">
          {miles}
        </div>
      </div>
    </div>
  );
}
