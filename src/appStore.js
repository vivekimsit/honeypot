import { store, params, storage } from 'react-easy-stack';
import * as api from './api';

const appStore = store({
  reports: [],
  appName: 'YabiDashboard',
  isLoading: false,
  isLoggedIn: isLoggedIn()
});

export async function resolveDashboard() {
  appStore.reports = await api.fetchReports();
}

export async function login(loginData) {
  loginData = Object.assign({}, loginData, {appname: appStore.appName});
  const {expiration, token} = await api.login(loginData);

  appStore.isLoggedIn = true;
  storage.token = token;
  storage.tokenExpiration = expiration;
}

export async function logout() {
  await api.logout();
  appStore.isLoggedIn = false;
}

export async function register(registerData) {
  appStore.user = await api.register(registerData);
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

function getUnixUtcTimeSeconds() {
  var tmLoc = new Date();
  return Math.floor((tmLoc.getTime() + (tmLoc.getTimezoneOffset() * 60000)) / 1000);
}

export default appStore;
