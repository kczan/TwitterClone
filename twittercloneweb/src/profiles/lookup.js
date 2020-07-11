import { lookup } from "../lookup";

export async function apiGetProfile(username, callback) {
  lookup("GET", `profile/${username}`, callback, []);
}

export async function apiProfileFollowToggle(username, action, callback) {
  const data = { action: `${action && action}`.toLowerCase() };
  lookup("POST", `profile/${username}/follow`, callback, data);
}

export async function apiGetProfileSearchResults(keyword, callback) {
  lookup("GET", `profile/search/${keyword}`, callback, []);
}
