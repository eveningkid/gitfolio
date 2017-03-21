import React, {PropTypes} from 'react'

const markdown = require('markdown-it')({
  html: true,
  breaks: true,
})

import './Phrase.scss'

const Phrase = React.createClass({
  propTypes: {
    text: PropTypes.string,
  },

  createText() {
    const {text} = this.props
    return markdown.render(text)
  },

  render () {
    return (
      <div className="Phrase">
        <h1
          dangerouslySetInnerHTML={{
            __html: this.createText()
          }}
        />
      </div>
    )
  }
})

export default Phrase
