/*
 * action types
 */

export const ADD_EXERCISE_MINUTES = 'ADD_EXERCISE_MINUTES';
export const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER';
export const SAVE_TO_DASHBOARD = 'SAVE_TO_DASHBOARD';

/*
 * other constants
 */


/*
 * action creators
 */

export function addExerciseMinutes(data) {
  return { type: ADD_EXERCISE_MINUTES, data}
}

export function saveCurrentUser(data) {
  return { type: SAVE_CURRENT_USER, data}
}

export function saveToDashboard(data) {
  return { type: SAVE_TO_DASHBOARD, data}
}