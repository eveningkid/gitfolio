import {
  EDIT_USER,
} from './actionTypes'

export const editUser = (user) => {
  return {
    type: EDIT_USER,
    user,
  }
}
