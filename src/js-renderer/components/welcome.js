import remote from 'remote';
import React from 'react';
import Router from 'react-router';

let dialog = remote.require('dialog');
let app = remote.require('app');

import AppStore from '../stores/app-store';
import InputSelect from './input-select';
import {
  REGIONS,
  LOL_INSTALL_PATH,
} from '../constants/lol-constants';

let RouteHandler = Router.RouteHandler;
let RouteNavigation = Router.Navigation;

/**
 * Create available option list for InputSelect
 * Also set default value to EU West region
 */
let options = [];
for(let value in REGIONS) {
  let name = REGIONS[value];
  options.push({
    value,
    name,
    selected: value == 'euw' ? value : null
  })
};


var Welcome = React.createClass({

  mixins: [RouteNavigation],

  getInitialState: function() {

    return {
      defaultPath: 'euw',
      inputValue: LOL_INSTALL_PATH
    };
  },

  componentDidMount: function() {
    if(!AppStore.showWelcomeScreen()) {
      this.transitionTo('home');
    }

  },

  onInputChange: function(ev) {
    this.setState({
      inputValue: ev.target.value
    });
  },

  onBrowsePress: function() {

    dialog.showOpenDialog({
      properties: ['openDirectory'],
      defaultPath: LOL_INSTALL_PATH
    }, (folderPath) => {

      if(!folderPath)
        return;

      this.setState({
        inputValue: folderPath,
      });
    }); 
  },

  onContinueClick: function() {
    console.log(this);
    this.transitionTo('home');
  },

  render: function() {
    

    return (
      <div className="v_welcome">
        <h2>Welcome to the League of Legends build manager!</h2>

        <input
          ref="input"
          type="text"
          className="v_welcome__install-dir"
          value={this.state.inputValue}
          onClick={this.onInputChange}
          />
        <button
          type="button"
          onClick={this.onBrowsePress}
          >
          Browse
        </button>
        <InputSelect
          className="v_welcome__regions"
          options={options} />
        <button
          className="v_welcome__continue"
          type="button"
          onClick={this.onContinueClick}
          >
          Continue
        </button>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = Welcome;