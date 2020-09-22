import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Home from './components/home';
import CreateAccount from './components/create-account';
import Login from './components/login';
import Goal from './components/goal';

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

export default function App() {
  useEffect(()=>{
    main();
  }, []);

  return (
    <div className="app">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/login" component={Login} />
        <Route path="/goals" component={Goal} />
      </Switch>
    </div>
    //   {/* <button
    //     onClick={getPushNotifications}
    //   >
    //     hit me to push
    //   </button> */}
  );
}
