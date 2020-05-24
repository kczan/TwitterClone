const tweetsElement = document.getElementById('tweets');
const tweetCreateForm = document.getElementById('tweet-create-form');
const alertBar = document.getElementById('alert-bar');
tweetsElement.innerHTML = 'Loading...';

home_url = 'api/tweets/';

function getCookie(name) { // gets csrf cookie
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


// AJAX requests

async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      tweetsElement.innerHTML = '';
      const jsonResponse = await response.json();
      const tweetsContent = jsonResponse;
      console.log(tweetsContent)
      tweetsContent.map(tweet => {
        tweetsElement.innerHTML += formatTweet(tweet);
      })
    } else {
    throw new Error('Request Failed!');
    }
  } catch(error) {
    console.log(error);
  }
}

function postFormData(url, data) {  // try to convert that into async/await fetch
  event.preventDefault()
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'json';
  xhr.open('POST', url)
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.onload = function () {
    if (xhr.status === 201) {
      if (alertBar.classList.contains('alert-danger')) {
        showError('', false)
      }
      const newTweetJson = xhr.response
      const newTweetElement = formatTweet(newTweetJson);
      const originalHtml = tweetsElement.innerHTML;
      tweetsElement.innerHTML = newTweetElement + originalHtml;
    } else if (xhr.status === 400) {
      const errorJson = xhr.response.content
      showError(errorJson, true)
    } else if (xhr.status === 401) {
      alert("Please log in!")
      window.location.href = '/login'
    } else if (xhr.status === 403) {
      alert("Please log in!")
      window.location.href = '/login'
    }
  }
  xhr.onerror = () => {
    alert('An error occured. Please contact the dev team.')
  }
  xhr.send(data)
}

function showError(message, display){
  if (display == true) {
    alertBar.classList.add('alert-danger');
    alertBar.innerHTML = message
  } else {
    alertBar.classList.remove('alert-danger')
    alertBar.innerHTML = ''
  }
}

function formatTweet(tweet) {
  return (
    `
    <section class='col-12 mb-4 border'>
    <article>
    <h2 class='mb-4 tweet' id='tweet-${tweet.id}'>${tweet.content}</h2>
    </article>
    <aside class='btn-group'>
    ${likeButton(tweet)}${unLikeButton(tweet)}${likesCount(tweet)}${retweetButton(tweet)}
    </aside>
    </section>
    `);
}



function handleTweetAction(tweet_id, action) {
  const csrftoken = getCookie('csrftoken');
  const url = 'api/tweets/action/'
  const method = 'POST'
  const data = JSON.stringify({
    id: tweet_id,
    action: action
  })
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  xhr.setRequestHeader("X-CSRFToken", csrftoken)
  xhr.onload = () => {
    console.log(xhr.status, xhr.response)
    getData(home_url)
  }
  toggleLikeButtons(tweet_id, action)
  xhr.send(data)

}

function toggleLikeButtons(tweet_id, action) {  // handle later with React
  if (action === 'like') {
    document.getElementById(`like_${tweet_id}`).style.visibility = 'hidden';
    document.getElementById(`unlike_${tweet_id}`).style.visibility = 'visible';
  } else if (action === 'unlike') {
    document.getElementById(`like_${tweet_id}`).style.visibility = 'visible';
    document.getElementById(`unlike_${tweet_id}`).style.visibility = 'hidden';
  }
}

function handleTweetSubmitForm(e) {
  e.preventDefault();
  const myForm = e.target;
  const myFormData = new FormData(myForm);
  const endpoint = myForm.getAttribute('action');
  postFormData(endpoint, myFormData);
  myForm.reset();
}

tweetCreateForm.addEventListener('submit', handleTweetSubmitForm);


getData(home_url);