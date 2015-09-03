'use strict';

import remote from 'remote';
import React from 'react';

import AppActions from '../actions/app-actions';
import AppStore from '../stores/app-store';

import {REGIONS} from '../constants/lol-constants';
import {restartApp} from '../modules/util';
import {isValidLolDirectroy} from '../modules/util';

import InputSelect from './input-select';

let dialog = remote.require('dialog');

let getState = function() {
  return {
    region: AppStore.getRegion(),
    path: AppStore.getPath()
  };
};

let SettingsRow = React.createClass({

  renderLabel: function() {

    let label;
    let labelInfo = null;

    // if label consists of additional info text
    if(this.props.labelInfo) {
      labelInfo = (
        <div className="c_settings__info">
          {this.props.labelInfo}
        </div>
      );
    }

    label = (
      <div className="c_settings__label">
        {this.props.label}
        {labelInfo}
      </div>
    );

    return label;
  },

  render: function() {

    let label = this.renderLabel();

    return (
      <div className="c_settings__row">
        {label}
        <div className="c_settings__body">
          {this.props.children}
        </div>
      </div>
    );
  }
});

let Settings = React.createClass({

  mixins: [AppStore.mixin],

  getInitialState: function() {
    return getState();
  },

  storeDidChange: function() {
    this.setState(getState());
  },



  // ########################################
  // Input events
  // ########################################
  restartApp: function() {
    restartApp();
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
      <div className="c_settings">
        <h2>Settings</h2>

        <SettingsRow
          label="Game directory:"
          labelInfo="Path to the League of Legends game"
        >
          <input
            type="text"
            className="c_settings__input"
            value={this.state.path}
            onChange={this.onPathChange}
          />
          <button
            className="c_settings__btn"
            type="button"
            onClick={this.onBrowsePress}
          >
            Select
          </button>
        </SettingsRow>

        <SettingsRow
          label="Game region:"
          labelInfo="Affects champion and item images">
          <InputSelect
            className="c_settings__input-select"
            options={options}
          />
        </SettingsRow>

        <SettingsRow
          label="Clear cache:"
          labelInfo="Clears the application cache without removing guides. Application will restart!">
          <button
            className="c_settings__btn"
            type="button"
          >
            Clear
          </button>
        </SettingsRow>

        <SettingsRow>
          <button
            className="c_settings__btn"
            type="button"
          >
            Save settings
          </button>
        </SettingsRow>

      </div>
    );
  }
});

export default Settings;
