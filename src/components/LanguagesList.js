import React from 'react'
import {connect} from 'react-redux'

import LanguagesListInspector from './inspect/LanguagesListInspector'
import Phrase from './Phrase'
import CanEdit from './utils/CanEdit'
import './LanguagesList.scss'

const mapStateToProps = (state) => {
  return {
    isGenerating: state.session.isGenerating,
    languagesList: state.session.languagesList,
  }
}

const LanguagesList = React.createClass({
  getInitialState() {
    return {
      isEditing: false,
    }
  },

  toggleEditing(e) {
    this.setState({isEditing: !this.state.isEditing})
  },

  render () {
    const languages = Array
      .from(this.props.languagesList)
      .filter(language => language.checked)
      .map(({name, checked}) => `**${name}**`)

    const {isEditing} = this.state
    const {isGenerating} = this.props

    return (
      <div
        className="LanguagesList"
        onClick={this.toggleEditing}
      >
        <CanEdit
          onClick={this.toggleEditing}
          isHidden={isEditing}
          style={{
            left: '50%',
            marginLeft: -21,
            top: 68,
          }}
        />

        {!isGenerating ? (
          <LanguagesListInspector
            isEditing={isEditing}
          />
        ) : null}

        <Phrase text={`I built all these using ${languages.join(', ')}!`} />
      </div>
    )
  }
})

export default connect(mapStateToProps)(LanguagesList)
