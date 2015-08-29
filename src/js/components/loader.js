'use strict';

import React from 'react';
import Router from 'react-router';

import AppStore from '../stores/app-store';
import AppActions from '../actions/app-actions';
import lolApi from '../modules/lol-api.js';
import cache from '../modules/cache';

let RouteNavigation = Router.Navigation;

const SUBTITLES = {
  CHECKING_UPDATE: 'Checking for updates',
  DOWNLOADING_ASSETS: 'Loading assets'
};

let Loader = React.createClass({

  mixins: [RouteNavigation, AppStore.mixin],

  getInitialState: function() {
    return {
      title: 'Preparing application',
      subTitle: ''
    }
  },

  storeDidChange: function() {
    if(AppStore.appReady())
      this.transitionTo('home');
  },

  setSubTitle: function(type) {
    this.setState({
      subTitle: SUBTITLES[type]
    });
  },

  componentDidMount: function() {
    // If first time using app show welcome screen
    if(AppStore.shouldShowWelcomeScreen()) {
      this.transitionTo('welcome');
      return;
    }

    // TODO: opening app the first time with no internet?
    // Maybe add Store method that checks if ready for offline?
    
    // check for updates
    this.setSubTitle('CHECKING_UPDATE');
    lolApi.getLatestGameVersion(AppStore.getRegion(), (err, version) => {

      if(err) {
        // TODO: WHAT TO DO?
        console.log(err);
        return;
      }

      if(AppStore.isNewerVersion(version) > 0) {
        AppActions.updateVersion({version});
      }

      this.setSubTitle('DOWNLOADING_ASSETS');
      cache.loadAssets();
    });  

  },

  render: function() {
    return (
      <div className="v_loader">
        <div className="v_loader__container">
          <div className="v_loader__circle"/>
          <h3>{this.state.title}</h3>
          <h4>{this.state.subTitle}</h4>
        </div>
      </div>
    );
  }
});

export default Loader;
