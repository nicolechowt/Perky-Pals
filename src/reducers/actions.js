/*
 * action types
 */

export const ADD_EXERCISE_DETAILS = 'ADD_EXERCISE_DETAILS';
export const ADD_EXERCISE_MINUTES = 'ADD_EXERCISE_MINUTES';
export const ADD_FRUITS_AND_VEGGIES = 'ADD_FRUITS_AND_VEGGIES';
export const ADD_MINDFULNESS_TIMES = 'ADD_MINDFULNESS_TIMES';
export const ADD_MODAL = 'ADD_MODAL';
export const ADD_SLEEP_HOURS = 'ADD_SLEEP_HOURS';
export const ADD_WATER_OZ = 'ADD_WATER_OZ';
export const REDEEM_ITEM = 'REDEEM_ITEM';
export const REMOVE_MODAL = 'REMOVE_MODAL';
export const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER';
export const SAVE_TO_DASHBOARD = 'SAVE_TO_DASHBOARD';

/*
 * other constants
 */


/*
 * action creators
 */

export function addExericseDetails(data){
  return {type: ADD_EXERCISE_DETAILS, data}
}

export function addExerciseMinutes(data) {
  return {type: ADD_EXERCISE_MINUTES, data}
}

export function addPoints(data){
  return {type: "ADD_POINTS", data}
}

export function addPointsDetails(data){
  return {type: "ADD_POINTS_DETAILS", data}
}

export function addMindfulnessTimes(data) {
  return {type: ADD_MINDFULNESS_TIMES, data}
}

export function addSelfCheckTimes(data) {
  return {type: "ADD_SELF_CHECK_TIMES", data}
}
export function addMammogram(data) {
  return {type: "ADD_MAMMOGRAM", data}
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

export function redeemItem(data) {
  return {type: REDEEM_ITEM, data}
}

export function addSelfCheckNotes(data) {
  return {type: "ADD_SELF_CHECK_NOTES", data}
}

export function addMammogramNotes(data) {
  return {type: "ADD_MAMMOGRAM_NOTES", data}
}

export function saveExerciseTips(data) {
  return {type: "SAVE_EXERCISE_TIPS", data}
}

export function saveMindfulnessTips(data) {
  return {type: "SAVE_MINDFULNESS_TIPS", data}
}

export function saveWaterTips(data) {
  return {type: "SAVE_WATER_TIPS", data}
}

export function saveFruitsAndVeggiesTips(data) {
  return {type: "SAVE_FRUITS_AND_VEGGIES_TIPS", data}
}

export function saveSleepTips(data) {
  return {type: "SAVE_SLEEP_TIPS", data}
}

export function saveSelfCheckTips(data) {
  return {type: "SAVE_SELF_CHECK_TIPS", data}
}

export function saveMammogramTips(data) {
  return {type: "SAVE_MAMMOGRAM_TIPS", data}
}

export function incrementExerciseCount(data) {
  return {type: "INCREMENT_EXERCISE_COUNT", data}
}

export function incrementMindfulnessCount(data) {
  return {type: "INCREMENT_MINDFULNESS_COUNT", data}
}

export function incrementWaterCount(data) {
  return {type: "INCREMENT_WATER_COUNT", data}
}

export function incrementFruitsAndVeggiesCount(data) {
  return {type: "INCREMENT_FRUITS_AND_VEGGIES_COUNT", data}
}