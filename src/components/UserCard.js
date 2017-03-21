import React from 'react'
import truncate from 'lodash.truncate'
import {connect} from 'react-redux'

import SafeLink from './utils/SafeLink'
import './UserCard.scss'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const UserCard = ({user}) => {
  const {
    avatar_url,
    html_url,
    location,
    login,
    name,
  } = user

  return (
    <div className="UserCard">
      <img
        src={avatar_url}
        alt={`@${login}`}
      />

      <h1>
        <SafeLink href={html_url} target="_blank">
          {truncate(name, {length: 15}) || login} 
        </SafeLink>
      </h1>

      <h2>{truncate(location, {length: 17})}</h2>
    </div>
  )
}

export default connect(mapStateToProps)(UserCard)
