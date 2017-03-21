import React from 'react'
import {connect} from 'react-redux'

import Phrase from '../Phrase'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const FollowersPhrase = ({user}) => (
  <Phrase text={
      `**${user.followers} developers** are following me,<br />there must be a *good* reason..<br />${user.following > 5 ? ` <small>(I also follow my ${user.following} fans, just to be fair)</small> ` : ''}`
  } />
)

export default connect(mapStateToProps)(FollowersPhrase)
