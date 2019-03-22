import * as actions from './actionTypes'

const initialState = {
  response: [],
  query: ''
}

const reducer = (state = initialState, action: actions.Action) => {
  switch (action.type) {
    case actions.LOAD_PEOPLE:
      if (action.payload.query !== state.query) return state
      return {
        ...state,
        response: action.payload.data
      }
    case actions.SET_SEARCH_TEXT:
      return {
        ...state,
        query: action.payload
      }
    default:
      return state
  }
}

export default reducer
