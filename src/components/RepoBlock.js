import React, { PropTypes } from 'react'
import truncate from 'lodash.truncate'
import {parse} from 'react-gh-emojis'

import SafeLink from './utils/SafeLink'
import './RepoBlock.scss'

const RepoBlock = React.createClass({
  propTypes: {
    repo: PropTypes.object,
    highlight: PropTypes.string,
  },

  getDefaultProps() {
    return {
      highlight: '',
    }
  },

  // DEPRECATED
  highlightIt(regex, text) {
    const {highlight} = this.props

    if (!text) {
      return ''
    }

    if (!highlight.length) {
      return text
    }

    return text.replace(regex, '<em>$1</em>')
  },

  render () {
    const {
      name,
      description,
      html_url,
      regex,
    } = this.props.repo

    return (
      <SafeLink href={html_url} target="_blank">
        <div className="RepoBlock">
          <h1
            title={name}
            dangerouslySetInnerHTML={{
              __html: this.highlightIt(regex, truncate(name, {length: 15}))
            }}
          />

          <p>
            {parse(this.highlightIt(regex, (truncate(description, {length: 75}) || 'No description')))}
          </p>
        </div>
      </SafeLink>
    )
  }
})

export default RepoBlock
