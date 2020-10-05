import { combineReducers } from 'redux'
import {
  ADD_EXERCISE_DETAILS,
  ADD_EXERCISE_MINUTES,
  ADD_FRUITS_AND_VEGGIES,
  ADD_MINDFULNESS_TIMES,
  ADD_MODAL,
  ADD_SLEEP_HOURS, 
  ADD_WATER_OZ,
  REDEEM_ITEM,
  REMOVE_MODAL,
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

// basically all the info for "today"
function dashboardReducer(state={}, action) {
  switch (action.type) {
    case SAVE_TO_DASHBOARD:
      return {
        ...state,
        ...action.data.todaysData,
        goals: action.data.goals,
        points: action.data.points,
        exercises: [],
        pointsClaimed: [],
        doneSelfCheckThisMonth: action.data.doneSelfCheckThisMonth,
        scheduledMammogram: action.data.scheduledMammogram,
        previousSelfCheckNotes: action.data.previousSelfCheckNotes,
      }

    case ADD_EXERCISE_MINUTES:
      return {
        ...state,
        exercise: state.exercise + action.data,
      }

    case "ADD_POINTS":
      return {
        ...state,
        points: state.points + action.data,
      }
    
    case "ADD_POINTS_DETAILS":
      return {
        ...state,
        pointsClaimed: [...state.pointsClaimed, action.data],
      }    

    case ADD_EXERCISE_DETAILS:
      return {
        ...state,
        exercises: [...state.exercises, {
          activity: action.data.activity,
          duration: action.data.duration,
        }]
      }  

    case ADD_MINDFULNESS_TIMES:
      return {
        ...state,
        mindfulness: state.mindfulness + action.data,
      }

    case "ADD_SELF_CHECK_TIMES":
      return {
        ...state,
        selfCheck: state.selfCheck + action.data,
        doneSelfCheckThisMonth: true,
      }

    case "ADD_MAMMOGRAM":
      return {
        ...state,
        mammogram: state.mammogram + action.data.mammogram,
        scheduledMammogram: action.data.date,
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

    case REDEEM_ITEM:
      return {
        ...state,
        points: state.points - action.data,
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
        content: {...action.data}
      }

    case REMOVE_MODAL:
      return {
        ...state,
        content: {},
      }

    default:
      return state
  }
}

function selfCheckNotesReducer(state={notes:[]}, action) {
  switch (action.type) {
    case "ADD_NOTES":
      return {
        ...state,
        notes: [action.data,...state.notes],
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
  selfCheckNotesReducer
})

export default rootReducer;