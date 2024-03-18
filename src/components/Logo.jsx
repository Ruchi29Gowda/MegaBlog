import React from 'react'
import blog from './writting.png'


function Logo({width="70px"}) {
  return (
    <div className="images">
      <img src={blog} alt="Logo" height="100%"/>
    </div>
  )
}

export default Logo