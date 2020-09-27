import { combineReducers } from 'redux'
import {
  SAVE_CURRENT_USER,
} from './actions'


const data = require('../data/mockedData.json')

function userReducer(state = data, action) {
  return state;
}

function currentUserReducer(state={currentUser:data[0]}, action) {
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

const rootReducer = combineReducers({
  userReducer,
  currentUserReducer,
})

export default rootReducer;