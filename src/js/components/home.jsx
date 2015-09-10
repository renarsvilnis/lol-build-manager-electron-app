'use strict';

import React from 'react';
import Router from 'react-router';

import cache from '../modules/cache';
import GuideActions from '../actions/guide-actions';
import GuideStore from '../stores/guide-store';

import Nav from './nav';

let RouteHandler = Router.RouteHandler;

let Home = React.createClass({

  mixins: [GuideStore.mixin],

  storeDidChange: function() {
    console.log('guide store change store');
  },

  componentDidMount: function() {
    cache.loadBuilds(function(err, list) {
      GuideActions.loadList({list});
    });
  },

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
