'use strict';

import React from 'react';
import Router from 'react-router';

let RouteHandler = Router.RouteHandler;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <RouteHandler {...this.props} />
      </div>
    );
  }
};

export default App;
