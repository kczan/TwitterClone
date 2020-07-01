
import React, { useEffect, useState } from 'react'

import { TweetCreate } from './create'
import { TweetsList } from './list'
import { TweetsListFeed} from './feed'
import { apiGetTweetDetail } from './lookup'
import { Tweet } from './detail'

export function FeedComponent(props) {
  const [newTweets, setNewTweets] = useState([])
  const handleNewTweet = (newTweet) => {
    let tempNewTweets = [...newTweets]
    tempNewTweets.unshift(newTweet)
    setNewTweets(tempNewTweets)
  }
  return (
    <div className={props.className}>
      <TweetCreate didTweet={handleNewTweet} className="col-md-4 mx-auto tweet-create-form" />
      <TweetsListFeed newTweets={newTweets} {...props} />
    </div>
  );
}

export function TweetsComponent(props) {
  const [newTweets, setNewTweets] = useState([])
  const canTweet = props.canTweet === "false" ? false : true
  const handleNewTweet = (newTweet) => {
    let tempNewTweets = [...newTweets]
    tempNewTweets.unshift(newTweet)
    setNewTweets(tempNewTweets)
  }
  return (
    <div className={props.className}>
      {canTweet === true && (
        <TweetCreate didTweet={handleNewTweet} className="col-md-4 mx-auto tweet-create-form" />
      )}
      <TweetsList newTweets={newTweets} {...props} />
    </div>
  );
}

export function TweetDetailComponent(props) {
  const {tweetId} = props
  const [didLookup, setDidLookup] = useState(false)
  const [tweet, setTweet] = useState(null)
  const handleBackendLookup = (response, status) => {
    if (status === 200) {
      setTweet(response)
    } else {
      alert('There was an error finding your tweet')
    }
  } 
  useEffect(() => {
    if(didLookup === false) {
      setDidLookup(true)
      apiGetTweetDetail(tweetId, handleBackendLookup)
    }
  }, [didLookup, setDidLookup, tweetId])

  return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
}