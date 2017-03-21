import {
  EDIT_SESSION,
} from '../actions/actionTypes'

export const initialState = {
  isGenerating: false,
  languagesList: [],
  mostPopularRepo: {},
  personalPhrase: 'followers',
  showRepoLimit: 10,
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_SESSION:
      return {
        ...state,
        ...action.session,
      }

    default:
      return state
  }
}

export default session
