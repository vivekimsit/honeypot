import axios from 'axios';
import appStore, * as app from './appStore';
import { pick, defaults } from 'lodash';
import { storage } from 'react-easy-stack';

defaults(storage, {
  cache: {}
});

const api = axios.create({
  baseURL: 'https://www.example.com/api/',
  headers: {
    token: storage.token,
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  appStore.isLoading = true;
  return config;
});

api.interceptors.response.use(
  response => {
    appStore.isLoading = false;
    return response;
  },
  error => {
    appStore.isLoading = false;
    throw error;
  }
);

export async function login({email, password}) {
  const {data:{token}} = await api.post('/users/login', loginData);
  api.defaults.headers.token = token;
  storage.token = token;
  return data.user;
}

export async function register(registerData) {
  await api.post('/users/register', registerData);
  return login(registerData);
}

export function logout() {
  delete api.defaults.headers.token;
  delete storage.token;
}

export function isLoggedIn() {
  return 'token' in storage;
}
