import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'

import configureStore from './configure-store'

import App from './App';
import BetterTogether from './components/better-together';
import CreateAccount from './components/create-account';
import Goal from './components/goal';
import Home from './components/home';
import Login from './components/login';
import Notifications from './components/notifications';

const store = configureStore();

const renderApp = () =>
  render(
    <Provider store={store}>
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
    </Provider>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', renderApp)
}

renderApp()