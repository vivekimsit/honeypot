import { store, params } from 'react-easy-stack';
import * as api from './api';

const appStore = store({
  isLoading: false,
  isLoggedIn: api.isLoggedIn()
});

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

export default appStore;
