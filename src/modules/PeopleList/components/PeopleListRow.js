// @flow
import React from 'react'
import styled from 'styled-components'
import Checkbox from '../../../widgets/Checkbox'
import moment from 'moment'
import * as styleConstants from '../../../widgets/constants'
import * as constants from '../constants'
import type { normalizedPerson } from '../model'

type Props = {
  /** Information about single person */
  person: normalizedPerson,
  /** Define is row checked */
  isChecked: boolean,
  /** Handler for check action */
  onCheck?: Function,
}

const PeopleListRow = (props: Props) => {
  const { person: { photoUrl, name, countryName, timeZone, birthday, gender, id }, isChecked, onCheck } = props

  const handleBirthday = (birthday: string): string => moment(birthday).format(constants.DATE_FORMAT)

  const handleCheck = () => {
    if (!onCheck) return
    onCheck({ ...props.person })
  }

  return (
    <Row isChecked={isChecked} >
      <CellWrapper>
        <Cell
          style={{ width: '25px', margin: '20px 24px 20px 0' }}
          smallScreenWidth={'25px'}>
          <Checkbox
            id={id}
            name={id}
            onCheck={handleCheck}
            checked={isChecked} />
        </Cell>
        <Photo photoUrl={photoUrl} />
        <NameCell
          smallScreenWidth={'166px'}
          smallScreenMargin={'20px 0 20px'}
          smallTextAlign={'left'}>
          {name}
        </NameCell>
      </CellWrapper>
      <CellWrapper smallScreenFlexDirection='column' smallScreenHeight={'200px'}>
        <Cell
          isChecked={isChecked}>
          {gender || '-'}
        </Cell>
        <Cell isChecked={isChecked} style={{ width: '115px' }}>
          {birthday ? handleBirthday(birthday) : '-'}
        </Cell>
        <Cell isChecked={isChecked} style={{ width: '115px' }}>
          {countryName || '-'}
        </Cell>
        <Cell isChecked={isChecked} style={{ width: '150px' }}>
          {timeZone || '-'}
        </Cell>
        <Cell isChecked={isChecked} style={{ width: '50px' }}>
          {id || '-'}
        </Cell>
      </CellWrapper>
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 64px;
  background-color: ${({ isChecked }) => isChecked ? styleConstants.lightBlueColor : styleConstants.whiteColor};
  box-shadow: inset 0 0 2px ${styleConstants.lightGreyColor};
  box-sizing: border-box;
  padding: 0 24px;
  justify-content: space-between;
  
  &:hover {
    box-shadow: 0 2px 10px ${styleConstants.lightGreyColor};
    cursor: pointer;
  }
  
 
`
const Cell = styled.span`
  font-size: 13px;
  line-height: 20px;
  text-align: center;
  margin: 20px 24px 20px 0;
  width: 70px;
  color: ${({ isChecked }) => isChecked ? styleConstants.mainTextColor : styleConstants.secondaryTextColor};
  
  @media all and (max-width: 992px) {
    text-align: left;
  }
  
  @media all and (max-width: 768px) {
    width: ${({ smallScreenWidth }) => smallScreenWidth || '100%'};
    text-align: ${({ smallTextAlign }) => smallTextAlign || 'center'};
    margin: ${({ smallScreenMargin }) => smallScreenMargin || '10px auto'};
  }
`

const NameCell = styled(Cell)`
  width: 166px;
  color: ${styleConstants.mainTextColor};
  text-align: left;
  font-size: 15px;
  margin: 20px 0 20px;
`

const CellWrapper = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 60px;
  
  @media all and (max-width: 992px) {
    justify-content: flex-start;
  }

  @media all and (max-width: 768px) {
    width: ${({ smallScreenWidth }) => smallScreenWidth || '100%'};
    flex-direction: ${({ smallScreenFlexDirection }) => smallScreenFlexDirection || 'row'}
    height: ${({ smallScreenHeight }) => smallScreenHeight || '60px'}
  }
`

const Photo = styled.div`
  width: 26px;
  height: 26px;
  background-image: url(${({ photoUrl }) => photoUrl || ''});
  background-size: 26px 36.6px;
  border-radius: 26px;
  margin: 17px 10px 17px 0;
`

export default PeopleListRow
