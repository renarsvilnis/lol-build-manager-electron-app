'use strict';

import React from 'react';
import Router from 'react-router';

let RouteHandler = Router.RouteHandler;

let App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

export default App;
