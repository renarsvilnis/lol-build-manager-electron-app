import React from 'react';
import Router from 'react-router';

import Body from './body';

let RouteHandler = Router.RouteHandler;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        'Home'
        <Body/>
        <RouteHandler {...this.props} />
      </div>
    );
  }
};

module.exports = Home;