'use strict';

import React from 'react';
import Router from 'react-router';

import AppStore from '../stores/app-store';

let RouteNavigation = Router.Navigation;

let Loader = React.createClass({

  mixins: [RouteNavigation],

  appStoreChange: function() {
    console.log('app store change');
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this.appStoreChange);

    if(AppStore.shouldShowWelcomeScreen()) {
      this.transitionTo('welcome');
    } else {
      // Check for updates
      // Update if neseccery
      // When done transition to home
    }
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this.appStoreChange);
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
