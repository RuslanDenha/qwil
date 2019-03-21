import { combineReducers } from 'redux'
import people from '../modules/PeopleList'

export default combineReducers({
  people: people.reducer
})
