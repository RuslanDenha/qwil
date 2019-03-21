// @flow
export const LOAD_PEOPLE = 'LOAD_PEOPLE'

export type LoadPeopleAction = { type: typeof LOAD_PEOPLE, response: Array<any> }

export type Action = LoadPeopleAction
