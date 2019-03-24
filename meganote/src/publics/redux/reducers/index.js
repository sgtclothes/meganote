import { combineReducers } from 'redux'

import users from './users'
import note from './note'
import notes from './notes'

const appReducer = combineReducers({
  users,
  note,
  notes
})

export default appReducer;