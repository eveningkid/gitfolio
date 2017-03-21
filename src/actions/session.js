import {
  EDIT_SESSION,
} from './actionTypes'

export const editSession = (session) => {
  return {
    type: EDIT_SESSION,
    session,
  }
}
