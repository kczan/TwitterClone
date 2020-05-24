import React from 'react';
import { apiTweetAction } from './lookup'



export function ActionButton(props) {
  const { tweet, action, didPerformAction } = props
  const likes = tweet.likes ? tweet.likes : 0
  const className = action.btnClass ? action.btnClass : 'btn btn-primary btn-sm'
  let actionDisplay = action.type ? action.type.toUpperCase() : 'Action'
  if (tweet.likes >= 2 && action.type === 'like') {
    actionDisplay += 'S'
  }


  const handleActionBackend = (response, status) => {
    console.log(status, response)
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status)
    }
  }
  const handleClick = (event) => {
    event.preventDefault()
    apiTweetAction(tweet.id, action.type, handleActionBackend)

  }
  const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
  return <button className={className} id={`${action.type}_${tweet.id}`} onClick={handleClick}>{display} </button>
}
