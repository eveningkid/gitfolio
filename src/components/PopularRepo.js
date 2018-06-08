import React from 'react'
import emoji from 'react-easy-emoji'
import truncate from 'lodash.truncate'
import {connect} from 'react-redux'
import {parse} from 'react-gh-emojis'

import PopularRepoInspector from './inspect/PopularRepoInspector'
import Background from './Background'
import SafeLink from './utils/SafeLink'
import CanEdit from './utils/CanEdit'
import './PopularRepo.scss'

const mapStateToProps = (state) => {
  return {
    isGenerating: state.session.isGenerating,
    mostPopularRepo: state.session.mostPopularRepo,
  }
}

const PopularRepo = React.createClass({
  getInitialState() {
    return {
      isEditing: false,
    }
  },

  toggleEditing(e) {
    this.setState({isEditing: !this.state.isEditing})
  },

  render () {
    const {
      description,
      forks_count,
      html_url,
      name,
      stargazers_count,
    } = this.props.mostPopularRepo

    const {isEditing} = this.state
    const {isGenerating} = this.props

    return (
      <div>
        <div className="PopularRepo">
          <CanEdit
            onClick={this.toggleEditing}
            isHidden={isEditing}
            style={{
              right: 10
            }}
          />

          {!isGenerating && (
            <PopularRepoInspector
              isEditing={isEditing}
              onClick={this.toggleEditing}
            />
          )}

          <span className="metadata forks-count">{emoji(`🔨 ${forks_count}`)}</span>
          <span className="metadata star-count">{emoji(`⭐ ${stargazers_count}`)}</span>

          <h1>
            <SafeLink href={html_url} target="_blank">
              {truncate(name, {length: 12})}
            </SafeLink>
          </h1>
          <p>{parse(truncate(description, {length: 75})) || 'No description'}</p>
        </div>

        <Background />
      </div>
    )
  }
})

export default connect(mapStateToProps)(PopularRepo)
