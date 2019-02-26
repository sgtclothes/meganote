import { combineReducers } from 'redux'

import users from './users'
import note from './note'

const appReducer = combineReducers({
  users,
  note
})

export default appReducer;