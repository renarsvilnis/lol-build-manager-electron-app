import React from 'react';
import Router from 'react-router';

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        'App'
        <RouteHandler {...this.props} />
      </div>
    );
  }
};

module.exports = App;