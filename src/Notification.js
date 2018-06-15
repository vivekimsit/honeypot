import React from 'react';
import { view, store } from 'react-easy-stack';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const notificationStore = store({
  message: '',
  action: undefined,
  isOpen: false
});

export function notify(message, action) {
  notificationStore.message = message;
  notificationStore.action = action;
  notificationStore.isOpen = true;
}

function closeNotification() {
  notificationStore.message = '';
  notificationStore.action = undefined;
  notificationStore.isOpen = false;
}

export default view(() => (
  <SnackbarContent
    message={notificationStore.message}
    action={notificationStore.action}
    open={notificationStore.isOpen}
    onClose={closeNotification}
  />
));
