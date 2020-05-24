import React, {useState, useEffect} from 'react';
import {apiGetTweets, apiCreateTweet, apiTweetAction} from './lookup'



export function ParentTweet(props) {
  const { tweet } = props
  return tweet.og_tweet ? <div className='row'>
    <div className='col-11 mx-auto p-3 border rounded'>
      <Tweet className={'mx-1'} tweet={tweet.og_tweet} />
      <p className='mb-0 small text-muted'>Retweet</p>
    </div>
  </div> : null
}

export function Tweet(props) {
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6 bg-light';
  const { tweet } = props;
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)

  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet)
    } else if (status === 201) {
    }
  }
  return <div className={className}>
    <div>
      <p>{tweet.id} - {tweet.content}</p>
      <ParentTweet tweet={tweet} />
        
    </div>
    
    <div className='btn btn-group'>
      {actionTweet && <span className='bg-light p-2 border'>
        <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', btnClass: 'btn btn-primary btn-sm ml-1'}}/>
        <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', btnClass: 'btn btn-primary btn-sm ml-1' }}/>
        <ActionButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', btnClass: 'btn btn-outline-success btn-sm ml-1' }}/>
      </span>}
    </div>
  </div>
}

export function TweetsComponent(props) {
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])

  const handleBackendUpdate = (response, status) => {
    let tempNewTweets = [...newTweets]
    if (status === 201) {
      tempNewTweets.unshift(response)
      setNewTweets(tempNewTweets)
    } else {
      console.log(response)
      alert("An error occured please try again")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newVal = textAreaRef.current.value
    apiCreateTweet(newVal, handleBackendUpdate)
    textAreaRef.current.value = ''
  }
  return <div className={props.className}>
    <div className='col-12'>
      <form onSubmit={handleSubmit}>
        <textarea ref={textAreaRef} className='form-control' name='tweet' required={true}>


        </textarea>
        <button type='submit'  className='btn btn-primary my-3'>Tweet</button>
      </form>
    </div>
    <TweetsList newTweets={newTweets} />
  </div>
}


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
      apiGetTweets(handleTweetRefresh)
    }}, [tweetsInit, setTweetsDidSet, tweetsDidSet])
  

  return tweets.map((tweet) => {
    return <Tweet tweet={tweet} key={tweet.id} className='mx-2' />
  })


}



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

