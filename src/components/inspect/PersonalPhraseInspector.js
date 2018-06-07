import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import {editSession} from '../../actions'
import './PersonalPhraseInspector.scss'

const mapStateToProps = (state) => {
  const { user, session } = state
  return {
    user, session,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editSession: (session) => dispatch(editSession(session)),
  }
}

const PersonalPhraseInspector = React.createClass({
  selectPersonalPhrase(personalPhrase, e) {
    e.stopPropagation()

    this.props.editSession({
      ...this.props.session,
      personalPhrase,
    })

    this.props.onClick(e)
  },

  render () {
    const {
      isEditing,
      user,
      session,
    } = this.props

    const tabs = [
      {
        title: 'Followers',
        value: 'followers',
        available: true,
      },
      {
        title: 'Blog',
        value: 'blog',
        available: user.blog,
      },
      {
        title: 'Biography',
        value: 'bio',
        available: user.bio,
      },
    ]

    return (
      <div
        className={classNames(
          'ElementInspector',
          'PersonalPhraseInspector',
          {'hidden': !isEditing}
        )}
      >
        <ul className="tabs">
          {tabs.map(({title, value, available}, key) =>
            <li
              key={key}
              className={classNames(
                'tab',
                {'selected': value === session.personalPhrase},
                {'unavailable': !available},
              )}
              onClick={available && this.selectPersonalPhrase.bind(this, value)}
            >
              {title}
            </li>
          )}
        </ul>
      </div>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPhraseInspector)
