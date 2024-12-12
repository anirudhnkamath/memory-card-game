import React from 'react'

export default function Scoreboard(props) {
  return (
    <div className={props.className}>{props.over}/{props.total}</div>
  )
}
