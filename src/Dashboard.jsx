import React, { Component } from 'react';
import { Router, view, params } from 'react-easy-stack';

class Dashboard extends Component {

  render() {
    return (
      <div>
        <h3>Hello World</h3>
      </div>
    );
  }
}

export default view(Dashboard);
