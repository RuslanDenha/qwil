// @flow
import React from 'react'
import styled from 'styled-components'
import * as constants from './constants'
import search from '../assets/icons/search.svg'

type Props = {
  value?: string,
  placeholder?: string,
  type?: string,
  onChange?: Function,
}

const Input = (props: Props) => {
  const { onChange, value, placeholder, type } = props

  const handleChange = (e: Object) => {
    if (!onChange) return
    onChange(e)
  }

  return (
    <InputWrapper>
      <SearchIcon />
      <TextField
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        onChange={e => handleChange(e)} />
    </InputWrapper>
  )
}

export default Input

const InputWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 65px;
  background-color: ${constants.whiteColor};
  box-shadow: inset 0 0 2px ${constants.lightGreyColor};
`

const SearchIcon = styled.span`
  position: absolute;
  top: 24px;
  left: 38px;
  height: 16px;
  width: 16px;
  background-image: url(${search});
`

const TextField = styled.input`
  outline: none;
  border: none;
  width: 80%;
  height: 62px;
  font-size: 12px;
  margin: 0 70px 0 70px;
  
  &::placeholder{
    color: ${constants.strongGreyColor}
  }
`
