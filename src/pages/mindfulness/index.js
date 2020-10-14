import React from 'react';
import { connect } from 'react-redux';

import Calendar from 'react-calendar';
import { COLORS } from '../../../src/enums/colors'
import TipBox from '../../components/tip-box';
import { items } from '../../data/redeemItems';
import RedeemCard from '../../components/redeem/components/redeem-card';
import ScrollToTop from '../../components/scroll-to-top';

import './style/mindfulness.css';

function Mindfulness(props) {
  const { goBack } = props.history;

  const { currentUser,tips, dashboard } = props;
  const weeklyData = currentUser ? currentUser[0] && currentUser[0].weeklyData : [];

  const todaysMindfulness = dashboard.mindfulness || [];


  const date = new Date();
  const month = date.getMonth()+1;
  const today = date.getDate();

  const daysInMonth = (monthNum) => {
    if(
      monthNum===1 ||
      monthNum===3 ||
      monthNum===5 ||
      monthNum===7 ||
      monthNum===8 ||
      monthNum===10 ||
      monthNum===12
    ) {
      return 31;
    }

    if(monthNum===2) return 28;
    return 30;
  }

  const calculatDate = (todaysDay, numsToGoBack) => {
    let newMonth;
    let newDay;

    // if today's at start of the month
    // count backwards from last months date
    if(todaysDay-numsToGoBack<1) {
      const newNumsToGoBack = todaysDay-numsToGoBack;
      newDay = daysInMonth(month-1)+newNumsToGoBack;
      newMonth = month -1;

      // need to pad it with zero if it's a single digit
      if (newDay<10){
        newDay = ('0' + newDay).slice(-2)
      }

      if (newMonth<10){
        newMonth = ('0' + newMonth).slice(-2)
      }

      return `2020-${newMonth}-${newDay}`
    }

    // otherwise, process the "normal dates"
    let normalDay = todaysDay - numsToGoBack;
    let normalMonth = month;

    if (normalDay<10){
      normalDay = ('0' + normalDay).slice(-2)
    }

    if (normalMonth<10){
      normalMonth = ('0' + normalMonth).slice(-2)
    }

    return `2020-${normalMonth}-${normalDay}`
  }

  const dayToDateMap = {
    yesterday: calculatDate(today, 1),
    twoDaysAgo: calculatDate(today, 2),
    threeDaysAgo: calculatDate(today, 3),
    fourDaysAgo: calculatDate(today, 4),
    fiveDaysAgo: calculatDate(today, 5),
    sixDaysAgo: calculatDate(today, 6),
    sevenDaysAgo: calculatDate(today, 7),
  }

  const mindfulWeekArr = [];
  if(weeklyData){
    weeklyData.forEach((day) => {
      if(day.mindfulness) {
        const processedDate = new Date(dayToDateMap[day.date]);

        // for some reason the timestamp for this date object is different than 
        // react-calendar's, just grab the substring for now, and ignore time
        const processedDateString = processedDate.toString().substring(0,15);
        mindfulWeekArr.push(processedDateString);
      }
    })
  }

  if(todaysMindfulness) {
    mindfulWeekArr.push(date.toString().substring(0,15));  
  }

  console.log('mindfulWeekArr', mindfulWeekArr);

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
  
  const formatDate = (date)=>{
    const day = date.getDay();

    if(day===0) {
      return 'S';
    } else if(day===1){
      return 'M';
    } else if(day===2){
      return 'T';
    } else if(day===3){
      return 'W';
    } else if(day===4){
      return 'T';
    } else if(day===5){
      return 'F';
    } else if(day===6) {
      return 'S'
    }
  }

  return (
    <div>
    <div className="page">
      <ScrollToTop />
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

        <div className="page__header">MINDFULNESS</div>
        <div className="page__sub-header">YOUR WEEK SO FAR</div>

        <Calendar 
          className="minfulness-calendar"
          formatShortWeekday={(locale, date) => formatDate(date)}
          showNavigation={false}
          tileContent={({ activeStartDate, date, view }) => {
            const dateString = date.toString();
            const processedDateString = dateString.substring(0,15)

            if(view === 'month' && mindfulWeekArr.includes(processedDateString)){
              return(
                <i
                  className="fa fa-check-circle"
                  style={{
                    fontSize:'24px',
                    color: COLORS.MINDFULNESS, 
                    padding: '4px'
                  }}
                />
              );
            }
            return(
              <i
                className="fa fa-circle"
                style={{
                  fontSize:'18px',
                  color: "#DEDEDE", 
                  padding: '4px'
                }}
              />
            )
          }}
/>
        <div 
          className="page__tips-perks"
          style={{background: COLORS.MINDFULNESS}}
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
            style={{color: COLORS.MINDFULNESS}}
          >
            <div className="page__perks-header">
              WHAT ABOUT SOME PERKS?
            </div>
            
            {items.filter(item => {
              if(
                item.type.includes('MINDFULNESS')
              ) {
                return item;
              }
            }).map(filteredItem => {
              return(
                <RedeemCard 
                  key={`mindfulness-${filteredItem.id}`}
                  description={filteredItem.description}
                  onClick={()=> handleOnClick(filteredItem)}
                  title={filteredItem.title}
                  imageUrl={imageMap[filteredItem.id]}
                  style={{backgroundColor: COLORS.MINDFULNESS}}
                />
              );
            })}

          </div>
        </div>
      </div>
    </div>
</div>

  );
}

function mapStateToProps(state) {
  const { 
    dashboardReducer,
    currentUserReducer,
    tipsReducer,
  } = state;

  return {  
    dashboard: dashboardReducer,    
    currentUser: currentUserReducer.currentUser,
    exerciseMinutes: dashboardReducer.exercise,
    goals: dashboardReducer.goals,
    pointsClaimed: dashboardReducer.pointsClaimed,
    tips: tipsReducer && tipsReducer.mindfulness[0],
  }
}

function mapDispatchToProps(dispatch) {
  return { 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Mindfulness)
