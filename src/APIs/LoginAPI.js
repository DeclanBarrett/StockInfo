import { SetAuth } from "../components/Auth.js";

const APIURL = "http://131.181.190.87:3000";

// Posts and Returns the user/login endpoint
export function SendLogin(email, password, setError, history, from) {
  const url = `${APIURL}/user/login`

  // fetch with body for post
  return fetch(url, {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password })
  })
    .then((res) => res.json())
    .then((res) => {
      // Throw error or get the token
      if (res.error !== undefined && res.error === true) { throw res }
      else { SetAuth(res.token); history.replace(from) };
    })
    .catch(e => {
      // Handle errors
      setError(e.message);
    });
}

// Posts and Returns the user/register endpoint
export function SendRegister({ email, password, setError, history, from }) {
  const url = `${APIURL}/user/register`
  
  // Contacts api with email and password to check
  return fetch(url, {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password })
  })
    .then((res) => res.json())
    .then((res) => {
      // Error throws error or the user is transported to login 
      if (res.error !== undefined) { throw res }
      else { SendLogin(email, password, setError, history, from) };
    })
    .catch(e => {
      // Handle error
      setError(e.message);
    });
}