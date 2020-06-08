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


export async function lookup(method, endpoint, callback, data) {
  let jsonData;
  const csrftoken = getCookie('csrftoken');
  if (data) {
    jsonData = JSON.stringify(data)
  }
  try {
    let response = {};
    if (method === 'POST') {
      let obj = {
        method: method,
        body: jsonData,
        headers: {
          'Content-Type': 'application/json',
        }
      }

      if (csrftoken) {
        obj.headers = {
          'Content-Type': 'application/json',
          "X-CSRFToken": csrftoken
        }
      }
      response = await fetch(`http://localhost:8000/api/${endpoint}`, obj);
      if (response.status === 403) {
        window.location.href = "/login?showLoginRequired=true"
      }
    } else {
      response = await fetch(`http://localhost:8000/api/${endpoint}`);
    }
    if (response.ok) {
      let result = await response.json()
      callback(result, response.status)
    } else {
      
      throw new Error('Request Failed!');
    }
  } catch (error) {
    console.log(error);
  }
}
