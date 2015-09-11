'use strict';

import React    from 'react'
import Router   from 'react-router';

import App      from './components/app';
import Loader   from './components/loader';
import Welcome  from './components/welcome';
import Home     from './components/home';
import Builds   from './components/builds';
import BuildAdd from './components/build-add';
import Settings from './components/settings';
import NotFound from './components/not-found';

import Cache    from './modules/cache';

let Route         = Router.Route;
let DefaultRoute  = Router.DefaultRoute;
let NotFoundRoute = Router.NotFoundRoute;

let routes = (
  <Route
    handler={App}
    path="/"
  >
    <DefaultRoute
      handler={Loader}
      name="loader"
    />
    <Route
      handler={Welcome}
      name="welcome"
    />
    <Route
      handler={Home}
      name="home"
    >
      <DefaultRoute
        handler={Builds}
        name="builds"
      />
      <Route
        handler={BuildAdd}
        name="add"
      />
      <Route
        handler={Settings}
        name="settings"
      />
    </Route>
    <NotFoundRoute
      handler={NotFound}
    />
  </Route>
);

// for now clear cache each app load
// import db from './modules/db';
// db.reset();

Cache.loadApp();
Router.run(routes, function(Handler, state) {
  // "Alternatively, you can pass the param data down..."
  // https://github.com/rackt/react-router/blob/master/docs/guides/
  // overview.md#dynamic-segments
  // var params = state.params;
  // React.render(<Handler params={params} />, el);
  React.render(<Handler />, document.body);
});