import React from 'react'

const SafeLink = (props) => (
  <a
    style={{textDecoration: 'none', color: '#000'}}
    rel="noopener noreferrer"
    {...props}
  />
)

export default SafeLink
