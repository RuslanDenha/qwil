// @flow
/* global fetch:false */
import { LOAD_PEOPLE, SET_SEARCH_TEXT } from './actionTypes'
import { FETCH_URL } from './constants'
import type { Dispatch } from 'redux'

export const loadPeople = (query: string) => (dispatch: Dispatch) => (
  fetch(FETCH_URL + query)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: LOAD_PEOPLE,
        payload: {
          data,
          query
        }
      })
    })
)

export const setQuery = (query: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_SEARCH_TEXT,
    payload: query
  })
}
