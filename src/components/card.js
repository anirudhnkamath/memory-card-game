import React from 'react'

export default function Card(props) {
  return (
    <div className={`card-container ${props.className}`} onClick={props.onClick}>
      <div className='front'></div>
      <div className='back'>
        <h1>{props.value}</h1>
      </div>
    </div>
  )
}
