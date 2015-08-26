'use strict';

import React    from 'react';
import Router   from 'react-router';

import App      from './components/app';
import Welcome  from './components/welcome';
import Home     from './components/home';
import Builds   from './components/builds';
import BuildAdd from './components/build-add';
import Settings from './components/settings';
import NotFound from './components/not-found';

let Route         = Router.Route;
let DefaultRoute  = Router.DefaultRoute;
let NotFoundRoute = Router.NotFoundRoute;


let routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="welcome" handler={Welcome} />
    <Route name="home" handler={Home}>
      <DefaultRoute name="builds" handler={Builds} />
      <Route name="add" handler={BuildAdd} />
      <Route name="settings" handler={Settings} />
    </Route>
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, function(Handler, state) {
  // console.log('State', state);
  // "Alternatively, you can pass the param data down..."
  // https://github.com/rackt/react-router/blob/master/docs/guides/
  // overview.md#dynamic-segments
  // var params = state.params;
  // React.render(<Handler params={params} />, el);
  React.render(<Handler />, document.body);
});