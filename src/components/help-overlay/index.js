import React, { useState } from 'react';
import { connect } from 'react-redux';
import { COLORS } from '../../enums/colors'

import {
  withRouter,
} from "react-router-dom";

import './style/help-overlay.css';
import MammogramHelp from '../mammogram-help/';

function HelpOverlay(props) {
  const [mammogramIsFetched, setMammogramIsFetched] = useState(false);
  const [mammogramIsFetching, setMammogramIsFetching] = useState(false);

  const [zipcode, setZipcode] = useState('');

  const setLoad = () => {
    setMammogramIsFetched(true);
    setMammogramIsFetching(false);
  };

  const mammogramHelp = [
    {
      header: 'Haight ashbury free clinics',
      address: '1553 Mission St., San Francisco, ca 94103',
      phone: '(415) 746-1967',
      website: 'www.google.com',
      miles: '1.2 MILES AWAY'
    },
    {
      header: 'San Francisco Free Clinic',
      address: '4900 California St., San Francisco, ca 94118 ',
      phone: '(415) 750-9894',
      website: 'www.google.com',
      miles: '1.5 MILES AWAY'
    },
    {
      header: 'San Francisco City Clinic',
      address: '356 7th St., San Francisco, CA 94105 ',
      phone: '(415) 887-5500',
      website: 'www.google.com',
      miles: '2 MILES AWAY'
    },
    {
      header: 'Healthright 360',
      address: '1563 Mission St., San Francisco, CA 94105',
      phone: '(415) 762-3700',
      website: 'www.google.com',
      miles: '3 MILES AWAY'
    },
  ];

  return (
    <div
      onClick={(event)=> {
        event.stopPropagation();
      }}
    >
      <div 
        className="activity-form-overlay__top"
        style={{backgroundColor: COLORS.MAMMOGRAM}}
      >
        <div className="activity-form-overlay__header">HELP</div>
        <div>
          It’s easiest to reach out to your local healthcare provider.
        </div>
        <div>
          Don’t have health insurance? Don’t worry! We’ll help you find some options.
        </div>

        <div 
          className="activity-form__item"
          style={{paddingTop: '30px'}}
        >  
          <label htmlFor="activity">WHAT'S YOUR ZIPCODE'?</label>
          <div>
            <input 
              type="text" 
              name="zipcode" 
              onChange={(event)=> {
                setZipcode(event.target.value);
                event.stopPropagation();
              }}
              value={zipcode} 
            />
            <button 
              className="activity-form__button"
              onClick={(event)=> {
                event.stopPropagation();
                setMammogramIsFetching(true)
                setTimeout(setLoad, 2000)
              }}
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>


      <div className="activity-form-overlay__bottom">
      {mammogramIsFetching && (
        <div className="activity-form-overlay__spinner">
          <i 
            aria-hidden="true"
            className="fa fa-spinner fa-spin" 
            style={{
              fontSize:'18px',
              color: COLORS.NAVY_BLUE, 
              padding: '4px'
            }}
          /> 
        </div>
      )}

      {mammogramIsFetched && (
        <div>
          <div 
            className="activity-form-overlay__subheader"
            style={{color: COLORS.MAMMOGRAM}}
          >
            showing results near 94118
          </div>
        
          {mammogramHelp.map(item=>{
            return(
              <MammogramHelp
                header={item.header}
                address={item.address}
                website={item.website}
                miles={item.miles}
                phone={item.phone}
              />
            )
          })}
        </div>
      )}
      </div>
    </div>
  );
}

export default withRouter(
  connect(
    null,
    null,
  )(HelpOverlay)
);