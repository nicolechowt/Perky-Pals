import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BetterTogether from './components/better-together';
import CreateAccount from './components/create-account';
import Goal from './components/goal';
import Home from './components/home';
import Login from './components/login';
import Notifications from './components/notifications';

ReactDOM.render(
  (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/login" component={Login} />
        <Route path="/goals" component={Goal} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/better-together" component={BetterTogether} />

        <App />
      </Switch>
    </BrowserRouter>
  ),

  document.getElementById('root')
);