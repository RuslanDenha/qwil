// @flow
import * as constants from '../constants'
import type { normalizedPerson } from '../model'

/**
 * Add a person to list if the person does not exist in the list
 * Remove a person from the list if the person already exists in the list
 * @param {Array<normalizedPerson>} nativeList
 * @param {normalizedPerson}person
 * @return {Array<normalizedPerson>}
 */
export const getSelectedPeople = (nativeList: Array<normalizedPerson>, person: normalizedPerson): Array<normalizedPerson> => {
  let newSelectedPeople = [...nativeList]
  let isPersonSelected = false
  nativeList.forEach(selectedPerson => { isPersonSelected = selectedPerson.id === person.id || isPersonSelected })
  isPersonSelected
    ? newSelectedPeople = newSelectedPeople.filter(selectedPerson => selectedPerson.id !== person.id)
    : newSelectedPeople.push(person)
  return newSelectedPeople
}

/**
 * Return link to a user photo
 * If the user does not have any photos then return link to the default avatar
 * @param {Object} image
 * @return {string}
 */
export const getPhotoUrl = (image: Object): string => {
  if (!image) return constants.DEFAULT_PHOTO_URL
  return image.medium
    ? image.medium
    : image.original
      ? image.original
      : constants.DEFAULT_PHOTO_URL
}

/**
 * Normalize person data
 * @param {Object} nativePerson
 * @return {normalizedPerson}
 */
export const normalizePerson = (nativePerson: Object): normalizedPerson => {
  const { id, name, country, birthday, gender, image } = nativePerson
  return {
    photoUrl: getPhotoUrl(image),
    name,
    countryName: country && country.name,
    timeZone: country && country.timezone,
    birthday,
    gender,
    id
  }
}
