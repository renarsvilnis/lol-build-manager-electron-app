'use strict';

import React from 'react';
import Router from 'react-router';

import AppStore from '../stores/app-store';

let RouteNavigation = Router.Navigation;

let Loader = React.createClass({

  mixins: [RouteNavigation],

  componentDidMount: function() {
    if(AppStore.shouldShowWelcomeScreen()) {
      this.transitionTo('welcome');
    } else {
      // Check for updates
      // Update if neseccery
      // When done transition to home
    }
  },

  render: function() {
    return (
      <div className="v_loader">
        <div className="v_loader__container">
          <div className="v_loader__circle"/>
          <h3>Preparing application</h3>
        </div>
      </div>
    );
  }
});

export default Loader;
