import { combineReducers } from 'redux'
import {
  ADD_EXERCISE_MINUTES,
  ADD_MINDFULNESS_MINUTES,
  ADD_MODAL,
  REMOVE_MODAL,
  SAVE_CURRENT_USER,
  SAVE_TO_DASHBOARD,
  ADD_SLEEP_HOURS, 
  ADD_WATER_OZ,
  ADD_FRUITS_AND_VEGGIES,
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
    case SAVE_TO_DASHBOARD:
      return {
        ...state,
        ...action.data.todaysData,
        goals: action.data.goals,
      }

    case ADD_EXERCISE_MINUTES:
      return {
        ...state,
        exercise: state.exercise + action.data,
      }

    case ADD_MINDFULNESS_MINUTES:
      return {
        ...state,
        mindfulness: state.mindfulness + action.data,
      }

    case ADD_SLEEP_HOURS:
        return {
          ...state,
          sleep: state.sleep + action.data,
        }  

    case ADD_WATER_OZ:
        return {
          ...state,
          water: state.water + action.data,
        }  

    case ADD_FRUITS_AND_VEGGIES:
        return {
          ...state,
          fruitsAndVeggies: state.fruitsAndVeggies + action.data,
        }  
    
    default:
      return state
  }
}

function modalReducer(state={}, action) {
  switch (action.type) {
    case ADD_MODAL:
      return {
        ...state,
        message: action.data,
      }

    case REMOVE_MODAL:
      return {
        ...state,
        message: '',
      }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  userReducer,
  currentUserReducer,
  dashboardReducer,
  modalReducer,
})

export default rootReducer;