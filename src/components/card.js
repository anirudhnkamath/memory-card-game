import React from 'react'

export default function Card(props) {
  return (
    <div className={`card-container ${props.className} hover:shadow-lg hover:cursor-pointer`} onClick={props.onClick}>
      <div className='front bg-orange dark:bg-lightgray text-darkorange dark:text-black'>?</div>
      <div className='back text-lightblue bg-white dark:bg-lightblue dark:text-black'>
        <h1>{props.value}</h1>
      </div>
    </div>
  )
}
