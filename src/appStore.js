import { store, params, storage } from 'react-easy-stack';
import * as api from './api';

const appStore = store({
  isLoading: false,
  isLoggedIn: isLoggedIn()
});

export async function resolveDashboard() {
  return { hotels: await api.fetchReports() };
}

export async function login(loginData) {
  appStore.user = await api.login(loginData);
  appStore.isLoggedIn = true;
}

export async function logout() {
  await api.logout();
  appStore.isLoggedIn = false;
}

export async function register(registerData) {
  appStore.user = await api.register(registerData);
}

function getUnixUtcTimeSeconds() {
  var tmLoc = new Date();
  return Math.floor((tmLoc.getTime() + (tmLoc.getTimezoneOffset() * 60000)) / 1000);
}

export function isLoading() {
  return appStore.isLoading;
}

export function setLoading(loading) {
  appStore.isLoading = loading;
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
