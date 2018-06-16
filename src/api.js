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
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(request => {
  app.setLoading(true);
  const token = storage.token;
  if (token) {
    request.headers.common['Authorization'] = `Bearer ${token}`
  }
  return request;
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
  const api = axios.create({
    baseURL: 'https://www.microauth.com/account',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const {data} = await api.post('/applogin', loginData);
  return data;
}

export function logout() {
  delete api.defaults.headers.token;
  delete storage.token;
}

export async function register(registerData) {
  await api.post('/users/register', registerData);
  return login(registerData);
}

const fakeData = [
  {
    name: 'Hotels',
    total: 10,
    active: 8
  },
  {
    name: 'Bookings',
    total: 500
  }];

export async function fetchReports() {
  //const {data} = await api.get('/admin/reports');
  return fakeData;
}
