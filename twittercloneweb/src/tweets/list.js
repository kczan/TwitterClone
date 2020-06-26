import React, { useState, useEffect } from 'react';
import {Tweet} from './detail'
import { apiGetTweets} from './lookup'




export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([])
  const [tweets, setTweets] = useState([])
  const [nextUrl, setNextUrl] = useState(null)
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
          setNextUrl(response.next)
          setTweetsInit(response.results)
          setTweetsDidSet(true)
          setTweets(response.results)
        }
      }
      apiGetTweets(props.username, handleTweetRefresh, nextUrl)
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

  const handleLoadNext = (event) => {
    event.preventDefault()
    if (nextUrl !== null) {
      const handleLoadNextResponse = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next)
          const newTweets = [...tweets].concat(response.results)
          setTweetsInit(newTweets)
          setTweets(newTweets)
        }
      }
      apiGetTweets(props.username, handleLoadNextResponse, nextUrl)
    }
  }

  return <React.Fragment>{tweets.map((tweet) => {
    return <Tweet tweet={tweet} didRetweet={handleDidRetweet} key={tweet.id} className='mx-2' />
    })}
    { nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load next</button>}
  </React.Fragment>
}
