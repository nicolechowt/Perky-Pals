import React from 'react';
import { connect } from 'react-redux';

import './style/sleep.css';
import TipBox from '../../components/tip-box';
import BarGraph from '../../components/bar-graph';
import { COLORS } from '../../../src/enums/colors'
import { items } from '../../data/redeemItems';
import RedeemCard from '../../components/redeem/components/redeem-card'

function Sleep(props) {
  const { goBack } = props.history;
  const { currentUser, dashboard, tips } = props;

  const todaysSleep = dashboard.sleep || [];
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const sleep = dashboard && dashboard.sleep;
  const sleepGoal = dashboard.goals && dashboard.goals.sleep;

  const sleepArr = [];

  weeklyData.map(day=>{
    if(day.sleep>=0){
      sleepArr.push(day.sleep);
    }
  });

  sleepArr.unshift(todaysSleep);

  const nextPath = (path) => {
    props.history.push(path);
  }

  const handleOnClick = (filteredItem) => {
    nextPath('/redeem');
  }

  const imageMap = {
    1: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216385/fitbit_y0swh4.jpg',
    2: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602216387/farmbox_wx7x83.png',
    3: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602349684/Mobile_Mammogram_cohiay.jpg',
    4: 'https://res.cloudinary.com/dbnasq0ef/image/upload/v1602349680/Yoga_lihfpp.jpg',
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
    <div className="page">
      <div className="page__progess">
        <div          
          className="page__back-button"
          onClick={() => goBack()}
        >
          <i
            className="fa fa-angle-left"
            style={{
              fontSize:'36px',
              color: "#4B5B7E", 
              padding: '4px'
            }}
          />
        </div>

        <div className="page__header">SLEEP</div>
        <div className="page__sub-header">YOUR WEEK SO FAR</div>

        <div className="page__sub-graph">
          <BarGraph 
            color={COLORS.SLEEP}
            data={sleepArr}
          />
        </div>


        <div className="page__caption">
          {sleepGoal-sleep>0 ? (
            <div>
              You didn't quite meet your goal of <span style={{color: COLORS.SLEEP}}>{sleepGoal} hours </span> of sleep a night.</div>
          ): (
            <div>GOAL ACHIEVED! WAY TO KICK BUTT</div>
          )}
        </div>
        
          <div 
            className="page__tips-perks"
            style={{background: COLORS.SLEEP}}
          >              
            <div className="page__tip-box">
              <TipBox 
                style={{
                  border: '4px solid white',
                  color: 'white',
                }}
                title={tips.title}
                text={tips.text}
                link={tips.link}
              />
            </div>

            <div 
              className="page__perks"
              style={{color: COLORS.SLEEP}}
            >
            <div className="page__perks-header">
              WHAT ABOUT SOME PERKS?
            </div>
            
            {items.filter(item => {
              if(
                item.type.includes('SLEEP') || 
                item.type.includes('MINDFULNESS')
              ) {
                return item;
              }
            }).map(filteredItem => {
              return(
                <RedeemCard 
                  key={`sleep-${filteredItem.id}`}
                  description={filteredItem.description}
                  onClick={()=> handleOnClick(filteredItem)}
                  title={filteredItem.title}
                  imageUrl={imageMap[filteredItem.id]}
                  style={{backgroundColor: COLORS.SLEEP}}
                />
              );
            })}
          </div>
        </div>
      </div>
  </div>
  );
}

function mapStateToProps(state) {
  const { 
    currentUserReducer,
    dashboardReducer,
    tipsReducer,
  } = state;

  return {   
    currentUser: currentUserReducer.currentUser,
    dashboard: dashboardReducer,
    tips: tipsReducer && tipsReducer.sleep[0],
  }
}

export default connect(
  mapStateToProps,
  null,
)(Sleep);