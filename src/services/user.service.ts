import {Injectable} from "@angular/core";

const registerUrl = "http://localhost:8080/api/register"
const loginUrl = "http://localhost:8080/api/login"
const currentUserUrl = "http://localhost:8080/api/currentUser"

@Injectable({
  providedIn: 'root',
})
export class UserService {
  register = (username, password) => fetch(registerUrl, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username, password}),
      headers: { 'content-type': 'application/json' }
    })

  login = (username, password) =>
    fetch(loginUrl, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({username, password}),
      headers: {
        'content-type': 'application/json'
      }
    })

  currentUser = () => fetch(currentUserUrl, {
      method: 'POST',
      credentials: 'include'
    }).then(response => response.json())

}
