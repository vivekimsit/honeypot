import axios from 'axios';
import * as app from './appStore';
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
  app.setLoading(true);
  return config;
});

api.interceptors.response.use(
  response => {
    app.setLoading(false);
    return response;
  },
  error => {
    app.setLoading(false);
    throw error;
  }
);

export async function login(loginData) {
  const {data} = await api.post('/users/login', loginData);
  api.defaults.headers.token = data.token;
  storage.token = data.token;
  return data.user;
}

export function logout() {
  delete api.defaults.headers.token;
  delete storage.token;
}

export async function register(registerData) {
  await api.post('/users/register', registerData);
  return login(registerData);
}

export async function fetchReports() {
  const {data} = await api.get('/admin/reports');
  return data;
}
