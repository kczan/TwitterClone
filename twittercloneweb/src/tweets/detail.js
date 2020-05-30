import React, { useState } from 'react';
import { ActionButton } from './buttons'




export function ParentTweet(props) {
  const { tweet } = props
  return tweet.og_tweet ? <div className='row'>
    <div className='col-11 mx-auto p-3 border rounded'>
      <Tweet hideActions className={'mx-1'} tweet={tweet.og_tweet} />
      <p className='mb-0 small text-muted'>Retweet</p>
    </div>
  </div> : null
}

export function Tweet(props) {
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6 bg-light';
  const { tweet, didRetweet, hideActions } = props;
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)

  const path = window.location.pathname
  const match = path.match(/(?<tweetid>\d+)/)
  const urlTweetId = match ? match.groups.tweetid : -1

  
  const isDetail = `${tweet.id}` === `${urlTweetId}`

  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `/${tweet.id}`
  }


  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet)
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet)
      }
    }
  }
  return <div className={className}>
    <div>
      <p>{tweet.id} - {tweet.content}</p>
      <ParentTweet tweet={tweet} />

    </div>

    <div className='btn btn-group'>
      <span className='bg-light p-2 border'>
        {actionTweet && hideActions !== true && <React.Fragment>
          <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', btnClass: 'btn btn-primary btn-sm ml-1' }} />
          <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', btnClass: 'btn btn-primary btn-sm ml-1' }} />
          <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', btnClass: 'btn btn-outline-success btn-sm ml-1' }} />
        </React.Fragment>}
        
        {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm ml-1' onClick={handleLink}>View</button>}
      </span>
    </div>
  </div>
}