import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { view, params, path, route, Link } from 'react-easy-stack';
import { notify } from './Notification';
import * as app from './appStore';

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

class NavBar extends Component {
  onSearch = search => {
    route({
      to: 'products',
      params: { search },
      options: { history: true, animate: search !== params.search }
    });
  };

  onLogout = () => {
    app.logout();
    route({ to: '/login' });
    if (path[0] === 'product') {
      notify('Please log in to see the product page');
    }
  };

  render() {
    return (
      <AppBar>
        <Toolbar style={toolbarStyle}>
          <Typography variant="title" color="inherit">
            Merchant Dashboard
          </Typography>
          <Button color="inherit">
            {app.isLoggedIn() ? (
              <span onClick={this.onLogout}>Logout</span>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Button>
        </Toolbar>
        {app.isLoading() && <LinearProgress color="secondary" />}
      </AppBar>
    );
  }
}

export default view(NavBar);
