import {
  EDIT_COLOR,
} from '../actions/actionTypes'

export const initialState = {
  primary: '#3F51B5',
  secondary: '#FF4081',
  darkPrimary: '#303F9F',
}

const color = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_COLOR:
      return {
        ...state,
        ...action.color,
      }

    default:
      return state
  }
}

export default color
