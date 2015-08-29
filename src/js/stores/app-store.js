'use strict';

import remote from 'remote';
import compareVersions from 'compare-versions';

import db from '../modules/db';
import Biff from '../modules/biff';

// Creates a DataStore
let AppStore = Biff.createStore({

  _lolRegion: '',
  _lolVersion: '',
  _lolPath: '',
  _items: [],
  _champions: [],

  shouldShowWelcomeScreen: function() {
    return !this._lolRegion || !this._lolPath;
  },

  appReady: function() {
    return this._lolRegion
      && this._lolVersion
      && this._lolPath
      && !!this._items.length
      && !!this._champions.length;
  },

  isNewerVersion: function(version) {
    let currentVersion = this.getVersion();

    if(!currentVersion)
      currentVersion = '';

    return compareVersions(version, currentVersion);
  },

  // TODO: REMOVE THIS
  getBuilds: function() {
    let champions = db.getChampions();

    if(!champions) {
      champions = [];
    } else {
      champions = champions.data;
    }

    // sort champions by lower case name
    champions.sort(function(a, b) {
      let lowA = a.name.toLowerCase(),
          lowB = b.name.toLowerCase();

      if(lowA < lowB) {
        return -1;
      } else if(lowA > lowB) {
        return 1;
      } else {
        return 0;
      }
    });

    return champions;
  },

  getRegion: function() {
    return this._lolRegion;
  },
  getVersion: function() {
    return this._lolVersion;
  },
  getPath: function() {
    return this._lolPath;
  },

  loadRegion: function(region) {
    this._lolRegion = region;
  },

  loadVersion: function(version) {
    this._lolVersion = version;
  },

  loadPath: function(path) {
    this._lolPath = path;
  },

  loadItems: function(items) {
    this._items = items;
  },

  loadChampions: function(champions) {
    this._champions = champions;
  },

  updateRegion: function(region) {
    this._lolRegion = region;
  },

  updatePath: function(path) {
    this._lolPath = path;
  },

  updateVersion: function(version) {
    this._lolVersion = version;
  }

}, function (payload) {
  let actionType = payload.actionType;

  console.log('Appstore', payload.actionType);

  if(actionType === 'LOL_REGION_LOAD') {
    this.loadRegion(payload.data.region);
    this.emitChange();
  }
  if(actionType === 'LOL_VERSION_LOAD') {
    this.loadVersion(payload.data.version);
    this.emitChange();
  }
  if(actionType === 'LOL_PATH_LOAD') {
    this.loadPath(payload.data.path);
    this.emitChange();
  }

  if(actionType === 'LOL_REGION_UPDATE') {
    this.updateRegion(payload.data.region);
    this.emitChange();
  }

  if(actionType === 'LOL_PATH_UPDATE') {
    this.updatePath(payload.data.path);
    this.emitChange();
  }

  if(actionType === 'LOL_VERSION_UPDATE') {
    this.updateVersion(payload.data.version);
    this.emitChange();
  }

  if(actionType === 'LOL_ITEMS_LOAD') {
    this.loadItems(payload.data.items);
    this.emitChange();
  }

  if(actionType === 'LOL_CHAMPIONS_LOAD') {
    this.loadChampions(payload.data.champions);
    this.emitChange();
  }

});

export default AppStore;