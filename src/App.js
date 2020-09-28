import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";

import { saveCurrentUser } from './reducers/actions'

import Dashboard from './components/dashboard';
import Header from './components/header';
import Library from './components/library';
import Points from './components/points';
import Redeem from './components/redeem';
import './App.css';

const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

var swRegistration;

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("../../serviceworker.js");
  return swRegistration;
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
      body,
      // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
}

const main = async () => {
  check();
  swRegistration = await registerServiceWorker();
  const permission =  await requestNotificationPermission();
  // showLocalNotification('This is title', 'this is the message', swRegistration);
}

const getPushNotifications = async () => {
  console.log('sw', swRegistration);
  
  fetch('https://suspicious-poincare-b31318.netlify.app/.netlify/functions/api/send-notification', {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Connection': 'Keep-Alive',
    }
  })
}

function App(props) {
  // get query param and send user id along, id defaults to 1

  const { dispatch, location, users }  = props;

  const search = location.search;
  const urlParams = new URLSearchParams(search);

  const param = urlParams.get('user');
  const userId = parseInt(param) || 1;

  const currentUser = users.filter(user=>user.id===userId);

  useEffect(()=>{
    main();
  }, []);

  return (
    <div className="app">
      <Header />

      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/points" component={Points} />
        <Route path="/redeem" component={Redeem} />
        <Route path="/library" component={Library} />
      </Switch>
    </div>
    //   {/* <button
    //     onClick={getPushNotifications}
    //   >
    //     hit me to push
    //   </button> */}
  );
}

function mapStateToProps(state) {
  const { userReducer } = state
  return { 
    users: userReducer,
  }
}

export default connect(
  mapStateToProps,
)(App)