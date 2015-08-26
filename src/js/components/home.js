'use strict';

import React from 'react';
import Router from 'react-router';

import Nav from './nav';

let RouteHandler = Router.RouteHandler;

// <Route handler={HomeBody} path="/">
//   <DefaultRoute name="builds" handler={Builds} />
// </Route>

let Home = React.createClass({

  render: function() {
    return (
      <div className="v_home">
        <Nav/>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

export default Home;
