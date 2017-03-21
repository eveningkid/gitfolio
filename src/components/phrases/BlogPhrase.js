import React from 'react'
import {connect} from 'react-redux'

import Phrase from '../Phrase'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const BlogPhrase = ({user}) => (
  <Phrase text={
      `I hate this *Medium trend*,<br />so I do have [my own blog](${user.blog}).
      <small>(You'll want to check it)</small>`
  } />
)

export default connect(mapStateToProps)(BlogPhrase)
