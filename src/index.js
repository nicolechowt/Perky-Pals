import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'

import configureStore from './configure-store'

import App from './App';
import BetterTogether from './components/better-together';
import CreateAccount from './components/create-account';
import Goal from './components/goal';
import Home from './components/home';
import Notifications from './components/notifications';

import AddExercise from './pages/add-exercise/';
import AddMindfulness from './pages/add-mindfulness';
import AddSleep from './pages/add-sleep';
import AddWater from './pages/add-water';
import AddFruitsAndVeggies from './pages/add-fruits-and-veggies';

const store = configureStore();

const renderApp = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/login">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/goals" component={Goal} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/better-together" component={BetterTogether} />
          <Route path="/add-exercise" component={AddExercise} />
          <Route path="/add-mindfulness" component={AddMindfulness} />
          <Route path="/add-sleep" component={AddSleep} />
          <Route path="/add-water" component={AddWater} />
          <Route path="/add-fruits-and-veggies" component={AddFruitsAndVeggies} />
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