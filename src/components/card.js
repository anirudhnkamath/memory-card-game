import React from 'react'

export default function Card(props) {
  return (
    <div className={`card-container ${props.className} hover:shadow-lg hover:cursor-pointer`} onClick={props.onClick}>
      <div className='front bg-orange text-darkorange'>?</div>
      <div className='back text-lightblue bg-white'>
        <h1>{props.value}</h1>
      </div>
    </div>
  )
}
