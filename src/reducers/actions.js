/*
 * action types
 */

export const ADD_EXERCISE_MINUTES = 'ADD_EXERCISE_MINUTES';
export const ADD_FRUITS_AND_VEGGIES = 'ADD_FRUITS_AND_VEGGIES';
export const ADD_MINDFULNESS_MINUTES = 'ADD_MINDFULNESS_MINUTES';
export const ADD_MODAL = 'ADD_MODAL';
export const ADD_SLEEP_HOURS = 'ADD_SLEEP_HOURS';
export const ADD_WATER_OZ = 'ADD_WATER_OZ';
export const REMOVE_MODAL = 'REMOVE_MODAL';
export const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER';
export const SAVE_TO_DASHBOARD = 'SAVE_TO_DASHBOARD';

/*
 * other constants
 */


/*
 * action creators
 */

export function addExerciseMinutes(data) {
  return {type: ADD_EXERCISE_MINUTES, data}
}

export function addMindfulnessMinutes(data) {
  return {type: ADD_MINDFULNESS_MINUTES, data}
}

export function addSleepHours(data) {
  return {type: ADD_SLEEP_HOURS, data}
}

export function addWaterOz(data) {
  return {type: ADD_WATER_OZ, data}
}

export function addFruitsAndVeggies(data) {
  return {type: ADD_WATER_OZ, data}
}
export function saveCurrentUser(data) {
  return {type: SAVE_CURRENT_USER, data}
}

export function saveToDashboard(data) {
  return {type: SAVE_TO_DASHBOARD, data}
}

export function addModal(data) {
  return {type: ADD_MODAL, data}
}

export function removeModal() {
  return {type: REMOVE_MODAL}
}