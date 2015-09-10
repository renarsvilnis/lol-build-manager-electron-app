'use strict';

import remote from 'remote';
import React from 'react';
import Router from 'react-router';

import AppActions from '../actions/app-actions';
import AppStore from '../stores/app-store';
import {REGIONS,LOL_INSTALL_PATH} from '../constants/lol-constants';
import {isValidLolDirectroy} from '../modules/util';

import InputSelect from './input-select';

let dialog = remote.require('dialog');
let RouteHandler = Router.RouteHandler;
let RouteNavigation = Router.Navigation;

let getState = function() {
  return {
    region: AppStore.getRegion() || 'euw',
    path: AppStore.getPath() || LOL_INSTALL_PATH
  };
};

let Welcome = React.createClass({

  mixins: [AppStore.mixin, RouteNavigation],

  storeDidChange: function() {
    if(!AppStore.shouldShowWelcomeScreen()) {
      // TODO: get app version
      this.transitionTo('loader');
      return;
    }

    this.setState(getState());
  },

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    AppActions.updateLolRegion({
      region: this.state.region
    });
  },

  // ########################################
  // Input events
  // ########################################

  onSelectPathPress: function() {
    dialog.showOpenDialog({
      properties: ['openDirectory'],
      defaultPath: LOL_INSTALL_PATH 
    }, (path) => {

      if(!path)
        return;

      this._changePath(path);
    }); 
  },

  onPathChange: function(ev) {
    this._changePath(ev.target.value);
  },

  onRegionChange: function(ev) {
    AppActions.updateLolRegion({
      region: ev.target.value
    });
  },

  onContinueClick: function() {
    // check if given address is correct
    isValidLolDirectroy(this.state.path, (err, exists) => {
      if(exists) {
        AppActions.updateLolPath({
          path: this.state.path
        });
      } else {
        // TODO: show error
      }  
    });
  },

  _changePath: function(path) {
    // TODO: check if is legit, if is then show that its,
    // don't show incorrect value
    this.setState({
      path: path || LOL_INSTALL_PATH
    });
  },

  // ########################################
  // Render
  // ########################################
  createOptions: function() {
    let options = [];

    for(let value in REGIONS) {
      let name = REGIONS[value];
      options.push({
        value,
        name,
        selected: value == this.state.region ? value : null
      })
    };

    return options;
  },

  render: function() {

    let options = this.createOptions();
    
    return (
      <div className="v_welcome">
        <h2>Welcome to the League of Legends build manager!</h2>

        <input
          type="text"
          className="v_welcome__install-dir"
          value={this.state.path}
          onChange={this.onPathChange}
          />
        <button
          type="button"
          onClick={this.onSelectPathPress}
          >
          Select
        </button>
        <InputSelect
          className="v_welcome__regions"
          options={options}
          onChange={this.onRegionChange}
          />
        <button
          className="v_welcome__continue"
          type="button"
          onClick={this.onContinueClick}
          disabled={!navigator.onLine}
          >
          Continue
        </button>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

export default Welcome;
