// @flow
import React, { Component } from 'react'
import { loadPeople, setQuery } from '../actions'
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
  /** Value to request list of people */
  query: string,
  /** Set query parameter */
  setQuery: typeof setQuery
}

type State = {
  /** List of selected people */
  selectedPeople: Array<normalizedPerson>,
  /** Timer to prevent frequent requests */
  typingTimer: any
}

class PeopleListPage extends Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      selectedPeople: [],
      typingTimer: 0
    }
  }

  handleSearch = (e: Object) => {
    if (this.state.typingTimer) {
      clearTimeout(this.state.typingTimer)
    }

    this.props.setQuery(e.target.value)
    this.setState({
      selectedPeople: [],
      typingTimer: setTimeout(() => this.props.loadPeople(this.props.query), 500)
    })
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
    const { peopleList, query } = this.props
    const isPeopleListArray = Array.isArray(peopleList)

    return (
      <Wrapper>
        <Input
          placeholder={constants.INPUT_PLACEHOLDER}
          value={query}
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
  peopleList: state.people.response,
  query: state.people.query
})

const mapDispatchToProps = {
  loadPeople,
  setQuery
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleListPage)

const Wrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: ${styleConstants.lightGreyColor + `50`};
  width: 100%;
  min-height: 100vh;
  height: 100%;
`
