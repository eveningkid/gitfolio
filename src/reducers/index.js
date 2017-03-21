import {combineReducers} from 'redux'

import color from './color'
import session from './session'
import user from './user'

const app = combineReducers({
	color,
	session,
	user,
})

export default app
