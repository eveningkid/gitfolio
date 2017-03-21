import React from 'react'
import {connect} from 'react-redux'

import './ReachMe.scss'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const ReachMe = ({user}) => {
  const {
    email,
    hireable,
  } = user

  const mailtoAddress = `mailto:${email}?subject=I checked your portfolio and...`

  return (
    <div className="ReachMe">
      <a href={mailtoAddress}>
        <button>
          why not getting in touch?
        </button>
      </a>

      <span>
        {
          hireable ? (
            <span>
              plus, I'm now <a href={mailtoAddress}>hireable</a>
            </span>
          ) : (
            <span>
              I could soon be <a href={mailtoAddress}>hireable</a>
            </span>
          )
        }
      </span>
    </div>
  )
}

export default connect(mapStateToProps)(ReachMe)
