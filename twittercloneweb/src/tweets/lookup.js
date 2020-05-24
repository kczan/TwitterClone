import {lookup} from '../lookup'


export async function apiCreateTweet(newTweet, callback) {
  lookup('POST', 'tweets/create-tweet/', callback, { content: newTweet })
}

export async function apiTweetAction(tweetId, action, callback) {
  lookup('POST', 'tweets/action/', callback, { id: tweetId, action: action })
}

export async function apiGetTweets(username, callback) {
  let endpoint = 'tweets/'
  if (username) {
    endpoint += `?username=${username}`
  }
  lookup('GET', endpoint, callback, [])
}

export async function apiGetTweetDetail(tweetId, callback) {
  lookup('GET', `tweets/${tweetId}`, callback, [])
}