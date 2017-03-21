import {
  EDIT_USER,
} from '../actions/actionTypes'

export const initialState = {
  repos: [],
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER:
      return {
        ...state,
        ...action.user,
      }

    default:
      return state
  }
}

export default user
