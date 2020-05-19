const url = 'http://localhost:8000/api/tweets/';

export async function getData(callback) {
  try {
    const response = await fetch(url);
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