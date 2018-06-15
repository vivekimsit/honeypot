import React, { Component, Fragment } from 'react';
import { Router, view, params, route } from 'react-easy-stack';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Login from './Login';
import * as app from './appStore';
import Notification, { notify } from './Notification';

const theme = createMuiTheme();

const appStyle = {
  maxWidth: 800,
  margin: '50px auto',
  padding: 20
};

const enterAnimation = {
  keyframes: {
    opacity: [0, 1],
    transform: ['translateX(-10px)', 'translateX(5)', 'none']
  },
  duration: 150
};

const leaveAnimation = {
  keyframes: {
    opacity: [1, 0],
    transform: ['none', 'translateX(10px)']
  },
  duration: 50
};

class App extends Component {
  onResolve = async () => {
    console.log('Resolving');
    await 200;
  }

  onRoute = ({ toPage }) => {
    console.log(toPage);
    if (toPage === 'dashboard' && !app.isLoggedIn()) {
      //route({ to: '/login' });
      //notify('Please log in to see the dashboard');
    }
  };

  render() {
    return (
        <Fragment>
          <NavBar />
          <Router
            onRoute={this.onRoute}
            defaultPage="dashboard"
            style={appStyle}
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
            //animate={true}
          >
            <Dashboard
              page="dashboard"
              resolve={this.onResolve}
              timeout={800}
            />
            <Login page="login" />
          </Router>
          <Notification />
        </Fragment>
    );
  }
}

export default view(App);
