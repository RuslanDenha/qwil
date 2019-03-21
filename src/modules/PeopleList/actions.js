// @flow
/* global fetch:false */
import { LOAD_PEOPLE } from './actionTypes'
import { FETCH_URL } from './constants'
import type { Dispatch } from 'redux'

export const loadPeople = (query: string) => (dispatch: Dispatch) => (
  fetch(FETCH_URL + query)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: LOAD_PEOPLE,
        payload: response
      })
    })
)
