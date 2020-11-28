import {Injectable} from "@angular/core";

// const apiUrl = "http://localhost:8080/api"
const apiUrl = "https://server-node-js-jiongwu.herokuapp.com/api"


@Injectable({
  providedIn: 'root',
})
export class UserService {
  register = (username, password) => fetch(`${apiUrl}/register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username, password}),
      headers: { 'content-type': 'application/json' }
    })

  login = (username, password) =>
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username, password}),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      if (response.status != 403) {
        localStorage.setItem('isLogin', 'true');
        return response.json();
      } else {
        return null;
      }
    })

  logout = () => fetch(`${apiUrl}/logout`, {
    method: 'POST',
    credentials: 'include'
  }).then(status => {
    localStorage.setItem('isLogin', 'false');
    return status;
  })

  currentUser = () => fetch(`${apiUrl}/currentUser`, {
    method: 'POST',
    credentials: 'include'
  }).then(response => {
    if (response.status == 404)
      return null;
    return response.json();
    // return Object.keys(response).length !== 0 ? response.json() : null;
  })
}
