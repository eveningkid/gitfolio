import React from 'react'
import {connect} from 'react-redux'

import {editSession} from '../actions'
import RepoBlock from './RepoBlock'
import './RepoSlider.scss'

const mapStateToProps = (state) => {
  return {
    session: state.session,
    repos: state.user.repos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editSession: (session) => dispatch(editSession(session)),
  }
}

const RepoSlider = React.createClass({
  getInitialState() {
    return {
      searchKeywords: '',
    }
  },

  handleShowRepoLimitChange(e) {
    this.props.editSession({
      ...this.props.session,
      showRepoLimit: e.target.value,
    })
  },

  filterRepos(repos) {
    const regex = new RegExp(`(${this.state.searchKeywords})`, 'ig')
    const {
      mostPopularRepo,
      showRepoLimit,
    } = this.props.session

    return repos.filter(repo => {
      return (
        ((repo.name && repo.name.match(regex)) ||
        (repo.description && repo.description.match(regex))) &&
        repo.id !== mostPopularRepo.id
      )
    }).slice(0, showRepoLimit).map(repo => {
      return {
        ...repo,
        regex,
      }
    })
  },

  renderRepo(repo, key) {
    return <RepoBlock
      key={key}
      repo={repo}
      highlight={this.state.searchKeywords}
    />
  },

  render () {
    const {
      session,
      repos,
    } = this.props

    const filteredRepos = this.filterRepos(repos)

    return (
      <div className="RepoSlider">
        <div className="repos">
          {(filteredRepos.length && filteredRepos.map(this.renderRepo)) || (
            <div className="no-repo-found">
              no repo found
            </div>
          )}
        </div>

        {!session.isGenerating ? (
          <div className="filter">
            Only show the

            <input
              type="number"
              min={0}
              max={repos.length - 1}
              onChange={this.handleShowRepoLimitChange}
              value={this.props.session.showRepoLimit}
            />

            most popular repos.
          </div>
        ) : null}

        {/*<div>
          <input
            type="text"
            placeholder={`Search among ${filteredRepos.length} repos..`}
            onChange={this.handleSearchChange}
            value={this.state.searchKeywords}
          />
        </div>*/}
      </div>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RepoSlider)
