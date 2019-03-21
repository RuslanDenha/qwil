// @flow
import React from 'react'
import styled from 'styled-components'
import * as constants from './constants'

// Props
type Props = {
  id: string,
  name: string,
  label?: string,
  checked: boolean,
  disabled?: boolean,
  onCheck?: Function,
}

const Checkbox = (props: Props) => {
  const { id, name, label, checked, disabled } = props

  const handleCheck = (e: any) => {
    if (props.onCheck) {
      props.onCheck(e)
    }
  }

  return (
    <CompositeCheckboxContainer>
      <Input type='checkbox' checked={checked} disabled={disabled} name={name} id={id} onChange={e => handleCheck(e)} />
      <Checkmark />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CompositeCheckboxContainer>
  )
}

export default Checkbox

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: ${constants.whiteColor};
  border-radius: 4px;
  border: 2px solid ${constants.lightGreyColor};
  box-sizing: border-box;
   &:after {
    content: "";
    position: absolute;
    display: none;
  }
`

const Input = styled.input`
  display: inline-block;
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`

const CheckboxLabel = styled.span`
  color: ${constants.greyColor};
  font-size: 14px;
  line-height: 19px;
  padding: 10px 0 0 0;
  height: 19px;
`

const CompositeCheckboxContainer = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
  
  ${Input}:checked ~ ${Checkmark} {
    background-color: ${constants.blueColor};
    border: none;
  }
  ${Input}:checked ~ ${Checkmark}:after {
    display: block;
  }
  ${Input}:checked ~ ${Checkmark}:after {
    display: block;
  }
  ${Checkmark}:after {
    left: 5.25px;
    top: 1.25px;
    width: 4px;
    height: 8px;
    border-radius: 2px;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    transform: rotate(45deg);
  }
`
