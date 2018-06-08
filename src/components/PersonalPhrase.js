import React from 'react'
import {connect} from 'react-redux'

import FollowersPhrase from './phrases/FollowersPhrase'
import BlogPhrase from './phrases/BlogPhrase'
import BioPhrase from './phrases/BioPhrase'
import PersonalPhraseInspector from './inspect/PersonalPhraseInspector'
import CanEdit from './utils/CanEdit'

const mapStateToProps = (state) => {
  return {
    isGenerating: state.session.isGenerating,
    personalPhrase: state.session.personalPhrase,
  }
}

const PersonalPhrase = React.createClass({
  getInitialState() {
    return {
      isEditing: false,
    }
  },

  toggleEditing(e) {
    this.setState({isEditing: !this.state.isEditing})
  },

  getPhraseComponent(componentName) {
    switch (componentName) {
      case 'followers':
        return <FollowersPhrase />

      case 'blog':
        return <BlogPhrase />

      case 'bio':
        return <BioPhrase />

      default:
        // TODO:
        return <FollowersPhrase />
    }
  },

  render () {
    const {isEditing} = this.state
    const {isGenerating} = this.props

    return (
      <div style={{position: 'relative'}}>
        <CanEdit
          onClick={this.toggleEditing}
          isHidden={isEditing}
          style={{
            left: '50%',
            marginLeft: -21,
            top: 68,
          }}
        />

        {!isGenerating && (
          <PersonalPhraseInspector
            isEditing={isEditing}
            onClick={this.toggleEditing}
          />
        )}

        {this.getPhraseComponent(this.props.personalPhrase)}
      </div>
    )
  }
})

export default connect(mapStateToProps)(PersonalPhrase)
