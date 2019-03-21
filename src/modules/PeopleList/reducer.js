import * as actions from './actionTypes'

const initialState = {
  response: {}
}

const reducer = (state = initialState, action: actions.Action) => {
  switch (action.type) {
    case actions.LOAD_PEOPLE:
      return {
        ...state,
        response: action.payload
      }
    default:
      return state
  }
}

export default reducer
