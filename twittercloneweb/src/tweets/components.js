import React, {useState, useEffect} from 'react';
import {getData} from '../lookup'


export function Tweet(props) {
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
  const { tweet } = props;
  return <div className={className}>
    <p>{tweet.id} - {tweet.content}</p>
    <div className='btn btn-group'>
      <span className='bg-light p-2 border'>
        <LikesCount tweet={tweet} />
        <LikeButton tweet={tweet} />
        <UnLikeButton tweet={tweet} />
        <RetweetButton tweet={tweet} />
      </span>
    </div>
  </div>
}



export function TweetsList(props) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTweets(response)
      }
    }
    getData(myCallback)
  }, [])

  return tweets.map((tweet) => {
    return <Tweet tweet={tweet} key={tweet.id} className='single-tweet-div' />
  })


}



export function LikeButton(props) {
  const { tweet } = props
  return <button className='btn btn-primary btn-sm ml-1' id={`like_${tweet.id}`}>Like</button>
}

export function UnLikeButton(props) {
  const { tweet } = props
  return <button className='btn btn-primary btn-sm ml-1' id={`unlike_${tweet.id}`}>Unlike</button>
}

export function LikesCount(props) {
  const { tweet } = props
  return <label className='badge badge-light'>{tweet.likes}</label>
}

export function RetweetButton(props) {
  const { tweet } = props
  return <button className='btn btn-outline-success btn-sm ml-1' id={`retweet_${tweet.id}`}>Retweet</button>
}