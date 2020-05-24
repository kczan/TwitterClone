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
      {actionTweet && hideActions !== true && <span className='bg-light p-2 border'>
        <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', btnClass: 'btn btn-primary btn-sm ml-1' }} />
        <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', btnClass: 'btn btn-primary btn-sm ml-1' }} />
        <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', btnClass: 'btn btn-outline-success btn-sm ml-1' }} />
      </span>}
    </div>
  </div>
}