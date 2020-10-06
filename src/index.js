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
import AddFruitsAndVeggies from './pages/add-fruits-and-veggies';
import AddMammogram from './pages/add-mammogram';
import AddMindfulness from './pages/add-mindfulness';
import AddSelfCheck from './pages/add-self-check';
import AddSleep from './pages/add-sleep';
import AddWater from './pages/add-water';

import Exercise from './pages/exercise';
import FruitsAndVeggies from './pages/fruits-and-veggies';
import Mindfulness from './pages/mindfulness';
import SelfCheck from './pages/self-check'
import Sleep from './pages/sleep';
import Water from './pages/water';
import Mammogram from './pages/mammogram';

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
          <Route path="/add-self-check" component={AddSelfCheck} />
          <Route path="/add-mammogram" component={AddMammogram} />

          <Route path="/exercise" component={Exercise} />
          <Route path="/fruits-and-veggies" component={FruitsAndVeggies} />
          <Route path="/mindfulness" component={Mindfulness} />
          <Route path="/self-check" component={SelfCheck} />
          <Route path="/mammogram" component={Mammogram} />
          <Route path="/sleep" component={Sleep} />
          <Route path="/water" component={Water} />
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