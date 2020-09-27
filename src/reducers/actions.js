/*
 * action types
 */

export const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER';

/*
 * other constants
 */


/*
 * action creators
 */

export function saveCurrentUser(data) {
  return { type: 'SAVE_CURRENT_USER', data}
}