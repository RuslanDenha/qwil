// @flow
export const LOAD_PEOPLE = 'LOAD_PEOPLE'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

export type LoadPeopleAction = { type: typeof LOAD_PEOPLE, response: Array<any> }
export type SetSearchText = { type: typeof SET_SEARCH_TEXT, response: string }

export type Action = LoadPeopleAction | SetSearchText
