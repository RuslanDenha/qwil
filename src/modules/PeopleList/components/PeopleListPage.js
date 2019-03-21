// @flow
import React, { Component } from 'react'
import { loadPeople } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PeopleListTable from './PeopleListTable'
import Input from '../../../widgets/Input'
import { getSelectedPeople } from './helper'
import type { normalizedPerson } from '../model'
import * as constants from '../constants'
import * as styleConstants from '../../../widgets/constants'

type Props = {
  /** List of loaded people */
  peopleList: ?Array<Object>,
  /** Action for loading people list */
  loadPeople: typeof loadPeople,
}

type State = {
  /** Value to request list of people */
  searchText: string,
  /** List of selected people */
  selectedPeople: Array<normalizedPerson>,
}

class PeopleListPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      searchText: '',
      selectedPeople: []
    }
  }

  handleSearch = (e: Object) => {
    this.setState({
      searchText: e.target.value,
      selectedPeople: []
    }, () => this.props.loadPeople(this.state.searchText))
  }

  handleCheck = (person: normalizedPerson) => {
    if (!person) return
    const newSelectedPeople = getSelectedPeople(this.state.selectedPeople, person)
    this.setState({
      selectedPeople: newSelectedPeople
    })
  }

  handleDelete = () => {
    console.log(this.state.selectedPeople)
  }

  render () {
    const { peopleList } = this.props
    const { searchText } = this.state
    const isPeopleListArray = Array.isArray(peopleList)

    return (
      <Wrapper>
        <Input
          placeholder={constants.INPUT_PLACEHOLDER}
          value={searchText}
          onChange={e => this.handleSearch(e)} />
        {isPeopleListArray && <PeopleListTable
          handleCheck={this.handleCheck}
          handleDelete={this.handleDelete}
          selectedPeople={this.state.selectedPeople}
          peopleList={peopleList || []}
        />}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  peopleList: state.people.response
})

const mapDispatchToProps = {
  loadPeople
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleListPage)

const Wrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: ${styleConstants.lightGreyColor + `50`};
  width: 100%;
  min-height: 100vh;
  height: 100%;
`
