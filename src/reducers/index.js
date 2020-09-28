import { combineReducers } from 'redux'
import {
  ADD_EXERCISE_MINUTES,
  SAVE_CURRENT_USER,
  SAVE_TO_DASHBOARD,
} from './actions'


const data = require('../data/mockedData.json')

function userReducer(state = data, action) {
  return state;
}

function currentUserReducer(state={}, action) {
  switch (action.type) {
    case SAVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.data,
      }

    default:
      return state
  }
}


function dashboardReducer(state={}, action) {
  switch (action.type) {
    case  SAVE_TO_DASHBOARD:
      return {
        ...state,
        ...action.data.todaysData,
        goals: action.data.goals,
      }

    case  ADD_EXERCISE_MINUTES:
      return {
        ...state,
        exercise: state.exercise + action.data,
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  userReducer,
  currentUserReducer,
  dashboardReducer,
})

export default rootReducer;