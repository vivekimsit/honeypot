import React, { Component, Fragment } from 'react';
import { view, params } from 'react-easy-stack';
import appStore, * as app from './appStore';

const listStyle = {
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  margin: '0 -20px'
};

class Dashboard extends Component {

  componentDidMount() {
    this.loadReports();
  }

  async loadReports() {
    await app.resolveDashboard();
  }

  render() {
    return (
      <Fragment>
        <div style={listStyle}>
          {
            appStore.reports.map(report => <span>{report.name}</span>)
          }
        </div>
      </Fragment>
    );
  }
}

export default view(Dashboard);
