import React from 'react'
import {connect} from 'react-redux'

import Phrase from '../Phrase'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const BioPhrase = ({user}) => (
  <Phrase text={`As I'd always say: **${(user.bio && user.bio.trim()) || '..'}**.`} />
)

export default connect(mapStateToProps)(BioPhrase)
