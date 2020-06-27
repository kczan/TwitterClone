import {lookup} from '../lookup'


export async function apiCreateTweet(newTweet, callback) {
  lookup('POST', 'tweets/create-tweet/', callback, { content: newTweet })
}

export async function apiTweetAction(tweetId, action, callback) {
  lookup('POST', 'tweets/action/', callback, { id: tweetId, action: action })
}

export async function apiGetTweets(username, callback, nextUrl) {
  let endpoint = 'tweets/'
  if (username) {
    endpoint += `?username=${username}`
  }
  if (nextUrl !== null && nextUrl !== undefined) {
    endpoint = nextUrl.replace("http://localhost:8000/api/", "")
  }
  lookup('GET', endpoint, callback, [])
}

export async function apiGetTweetsFeed(callback, nextUrl) {
  let endpoint = 'tweets/feed/'
  if (nextUrl !== null && nextUrl !== undefined) {
    endpoint = nextUrl.replace("http://localhost:8000/api/", "")
  }
  lookup('GET', endpoint, callback, [])
}

export async function apiGetTweetDetail(tweetId, callback) {
  lookup('GET', `tweets/${tweetId}`, callback, [])
}