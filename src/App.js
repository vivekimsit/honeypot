import React, { Component, Fragment } from 'react';
import { Router, view, params } from 'react-easy-stack';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
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
  onRoute = ({ toPage, preventDefault }) => {
    console.log(toPage, preventDefault);
    if (toPage === 'dashboard' && !app.isLoggedIn()) {
      //preventDefault({ to: '/login' });
      notify('Please log in to see the dashboard');
    }
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Fragment>
          <NavBar />
          <Router
            onRoute={this.onRoute}
            defaultPage="dashboard"
            style={appStyle}
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
            animate={true}
          >
            <Dashboard page="dashboard" resolve={app.resolveDashboard} />
            <Login page="login" />
          </Router>
          <Notification />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}

export default view(App);
