import React from 'react';
import Router from 'react-router';

let RouteHandler = Router.RouteHandler;

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div class="welcome">
        'Welcome'
        {/*<RouteHandler {...this.props} />*/}
      </div>
    );
  }
};

module.exports = Welcome;