import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import emoji from 'react-easy-emoji'

import './CanEdit.scss'

const mapStateToProps = (state) => {
  return {
    isGenerating: state.session.isGenerating,
  }
}

const CanEdit = React.createClass({
  render () {
    const {
      isGenerating,
      isHidden,
      onClick,
      style,
    } = this.props

    if (isGenerating) {
      return null
    }

    return (
      <div
        className={classNames(
          'CanEdit',
          {'hidden': isHidden},
        )}
        onClick={onClick}
        style={style}
      >
        {emoji('📝')}
      </div>
    )
  }
})

export default connect(mapStateToProps)(CanEdit)
