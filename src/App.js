import React, { Component, Fragment } from 'react';
import { Router, view, params } from 'react-easy-stack';
import Button from 'material-ui/Button';
import NavBar from './NavBar';
import ProductList from './ProductList';
import ProductEditor from './ProductEditor';
import Login from './Login';
import appStore, * as app from './appStore';
import Notification, { notify } from './Notification';

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
  };

  render() {
    return (
      <Fragment>
        <NavBar />
        <Router
          onRoute={this.onRoute}
          defaultPage="products"
          style={appStyle}
          enterAnimation={enterAnimation}
          leaveAnimation={leaveAnimation}
          animate={true}
        >
          <Login page="login" />
        </Router>
        <Notification />
      </Fragment>
    );
  }
}

export default view(App);
