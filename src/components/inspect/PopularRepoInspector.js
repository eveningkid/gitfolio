import React from 'react'
import {connect} from 'react-redux'
import emoji from 'react-easy-emoji'
import classNames from 'classnames'
import truncate from 'lodash.truncate'

import {editSession} from '../../actions'
import {getMostPopularRepos} from '../../utils'
import './PopularRepoInspector.scss'

const mapStateToProps = (state) => {
  return {
    repos: state.user.repos,
    session: state.session,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editSession: (session) => dispatch(editSession(session)),
  }
}

const PopularRepoInspector = React.createClass({
  handleClick(mostPopularRepo, e) {
    e.stopPropagation()

    this.props.editSession({
      ...this.props.session,
      mostPopularRepo,
    })

    this.props.onClick(e)
  },

  renderRepo(repo, key) {
    return (
      <li
        className={classNames(
          {'selected': repo.id === this.props.session.mostPopularRepo.id}
        )}
        key={key}
        onClick={this.handleClick.bind(this, repo)}
      >
        <span className="star-count">
          {emoji(`⭐ ${repo.stargazers_count}`)}
        </span>

        <span className="name">
          {truncate(repo.name, {length: 27})}
        </span>
      </li>
    )
  },

  render () {
    const repos = getMostPopularRepos(this.props.repos)

    return (
      <div
        className={classNames(
          'ElementInspector',
          'PopularRepoInspector',
          {'hidden': !this.props.isEditing}
        )}
      >
        <ul>
          {repos.map(this.renderRepo)}
        </ul>
      </div>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PopularRepoInspector)
