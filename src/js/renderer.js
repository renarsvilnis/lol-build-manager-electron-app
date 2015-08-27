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


import scraper from './modules/scraper';
// let url = 'http://www.probuilds.net/guide/NA/1925326964/60783';
// let url = 'http://www.mobafire.com/league-of-legends/build/manzeys-all-around-twisted-fate-guide-includes-all-roles-429408';
// let url = 'http://www.mobafire.com/league-of-legends/build/kayle-angel-more-like-a-god-429690';
// let url = 'http://www.mobafire.com/league-of-legends/build/shyvana-the-ultimate-assassin-jungle-how-2-penta-as-a-jungle-430011';
let buildUrl = 'http://www.mobafire.com/league-of-legends/build/support-katarina-support-fear-not-its-not-a-troll-pick-429930';
scraper(buildUrl);


import url from 'url';
import normalizeUrl from 'normalize-url';

let parseUrl = (str) => url.parse(normalizeUrl(str));

console.log(parseUrl(buildUrl));
console.log(parseUrl('mobafire.com/league-of-legends/build/support-katarina-support-fear-not-its-not-a-troll-pick-429930'));


import db from './modules/db';
import lolApi from './modules/lol-api';

lolApi.getItems('na', function(err, results) {
  if(!err)
    db.setItems(results);
});

lolApi.getChampions('na', function(err, results) {
  if(!err)
    db.setChampions(results);
});