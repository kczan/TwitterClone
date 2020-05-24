import React, {useState} from 'react';
import {apiCreateTweet} from './lookup'
import {TweetsList} from './list'




export function TweetsComponent(props) {
  const {username} = props
  const textAreaRef = React.createRef()
  const [newTweets, setNewTweets] = useState([])
  const canTweet = props.canTweet === 'false' ? false : true

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
    {canTweet === true && <div className='col-12'>
      <form onSubmit={handleSubmit}>
        <textarea ref={textAreaRef} className='form-control' name='tweet' required={true}>
        </textarea>
        <button type='submit' className='btn btn-primary my-3'>Tweet</button>
      </form>
    </div>}

    <TweetsList newTweets={newTweets} username={username} />
  </div>
}






