import React, { useState, useEffect } from 'react';
import {Tweet} from './detail'
import { apiGetTweets} from './lookup'




export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [tweetsDidSet, setTweetsDidSet] = useState(false)
  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit)
    if (final.length !== tweets.length) {
      setTweets(final)
    }

  }, [props.newTweets, tweetsInit, tweets])

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetRefresh = (response, status) => {
        if (status === 200) {
          setTweetsInit(response)
          setTweetsDidSet(true)
        }
      }
      apiGetTweets(props.username, handleTweetRefresh)
    }
  }, [tweetsInit, setTweetsDidSet, tweetsDidSet, props.username])


  const handleDidRetweet = (newTweet) => {
    const updatedTweetsInit = [...tweetsInit]
    updatedTweetsInit.unshift(newTweet)
    setTweetsInit(updatedTweetsInit)

    const updatedFinalTweets = [...tweets]
    updatedFinalTweets.unshift(tweets)
    setTweets(updatedFinalTweets)
  }

  return tweets.map((tweet) => {
    return <Tweet tweet={tweet} didRetweet={handleDidRetweet} key={tweet.id} className='mx-2' />
  })


}
