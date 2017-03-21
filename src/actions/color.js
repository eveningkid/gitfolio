import {
  EDIT_COLOR,
} from './actionTypes'

export const editColor = (color) => {
  return {
    type: EDIT_COLOR,
    color,
  }
}
