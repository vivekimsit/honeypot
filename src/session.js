import { storage } from 'react-easy-stack';
import api from './api.js';

function getUnixUtcTimeSeconds() {
  var tmLoc = new Date();
  return Math.floor((tmLoc.getTime() + (tmLoc.getTimezoneOffset() * 60000)) / 1000);
}

export function logout() {
  delete api.defaults.headers.token;
  delete storage.token;
}

export function isLoggedIn() {
  if ('token' in storage === false) {
    return false;
  }
  const now = getUnixUtcTimeSeconds();
  const tokenExpiration = storage.tokenExpiration;
  const isLoggedIn = !!tokenExpiration && tokenExpiration < now;
  console.log('Is Logged In: ' + isLoggedIn);
  return isLoggedIn;
}
