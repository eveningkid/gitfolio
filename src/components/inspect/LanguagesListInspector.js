import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import {editSession} from '../../actions'
import './LanguagesListInspector.scss'

const mapStateToProps = (state) => {
  return {
    session: state.session,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editSession: (session) => dispatch(editSession(session)),
  }
}

const LanguagesListInspector = React.createClass({
  getInitialState() {
    return {
      newLanguage: '',
    }
  },

  handleCheck(e) {
    const target = e.target

    const languagesList = this.props.session.languagesList.map(language => {
      if (language.name === target.name) {
        return {
          ...language,
          checked: target.checked,
        }
      }

      return language
    })

    this.props.editSession({
      ...this.props.session,
      languagesList,
    })
  },

  handleEnter(e) {
    if (e.key === 'Enter') {
      const newLanguage = {
        name: this.state.newLanguage,
        checked: false,
      }

      const languagesList = [newLanguage, ...this.props.session.languagesList]

      this.props.editSession({
        ...this.props.session,
        languagesList,
      })

      this.setState({newLanguage: ''})
    }
  },

  renderLanguage(language, key) {
    return (
      <li key={key}>
        <input
          type="checkbox"
          onChange={this.handleCheck}
          checked={language.checked}
          name={language.name}
        />

        {language.name}
      </li>
    )
  },

  render () {
    const {languagesList} = this.props.session
    const {isEditing} = this.props

    if (isEditing) {
      this.refs.newLanguage.focus()
    }

    return (
      <div
        className={classNames(
          'ElementInspector',
          'LanguagesListInspector',
          {'hidden': !isEditing}
        )}
      >
        <ul onClick={(e) => e.stopPropagation()}>
          <li>
            <input
              ref="newLanguage"
              type="text"
              onChange={(e) => this.setState({newLanguage: e.target.value})}
              onKeyPress={this.handleEnter}
              placeholder="Add language..."
              value={this.state.newLanguage}
              autoFocus={true}
            />
          </li>

          {languagesList.map(this.renderLanguage)}
        </ul>
      </div>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesListInspector)
