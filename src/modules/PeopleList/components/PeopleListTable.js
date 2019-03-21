// @flow
import React from 'react'
import PeopleListRow from './PeopleListRow'
import styled from 'styled-components'
import type { normalizedPerson } from '../model'
import { normalizePerson } from './helper'
import * as styleConstants from '../../../widgets/constants'
import * as constants from '../constants'
import deleteButton from '../../../assets/icons/deleteButton.svg'

type Props = {
  /** List of loaded people */
  peopleList: Array<normalizedPerson>,
  /** List of selected people */
  selectedPeople: Array<normalizedPerson>,
  /** Handler for check action */
  handleCheck: Function,
  /** Handler for delete action */
  handleDelete: Function,
}

const PeopleListTable = (props: Props) => {
  const { peopleList, selectedPeople, handleCheck, handleDelete } = props

  const renderRow = (person: Object) => {
    const normalizedPerson = normalizePerson(person.person)
    const id = normalizedPerson.id

    return <PeopleListRow
      key={id}
      person={{ ...normalizedPerson }}
      isChecked={!!selectedPeople.find(item => item.id === id)}
      onCheck={handleCheck}
    />
  }

  return (
    <Table>
      <TableHeader>
        <Counter>{selectedPeople.length}</Counter>
        <BigCounter>{selectedPeople.length + constants.TABLE_SELECTED}</BigCounter>
        <DeleteButton onClick={handleDelete} />
      </TableHeader>
      {peopleList.map(person => renderRow(person))}
    </Table>
  )
}

export default PeopleListTable

const Table = styled.div`
  margin: 33px 36px 38px 36px;
  box-shadow: 0 0 10px ${styleConstants.lightGreyColor};
`

const TableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  line-height: 48px;
  background-color: ${styleConstants.whiteColor};
  border-radius: 4px;
  box-shadow: inset 0 0 2px ${styleConstants.lightGreyColor};
  box-sizing: border-box;
  padding: 0 24px;
  justify-content: start;

`

const Counter = styled.div`
  display: inline-block;
  font-size: 9px;
  line-height: 16px;
  font-weight: bold;
  text-align: center;
  color: ${styleConstants.whiteColor};
  height: 16px;
  width: 16px;
  margin: 17px 24px 0 0;
  border-radius: 4px;
  background-color: ${styleConstants.blueColor};
`

const BigCounter = styled.span`
  font-weight: 500;
  font-size: 13px;
  line-height: 48px;
`

const DeleteButton = styled.span`
  margin: 18px 0 0 90px;
  height: 12px;
  width: 10px;
  cursor: pointer;
  background-image: url(${deleteButton});
`
