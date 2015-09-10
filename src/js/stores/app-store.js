'use strict';

import compareVersions from 'compare-versions';

import db from '../modules/db';
import Biff from '../modules/biff';

// Creates a DataStore
let AppStore = Biff.createStore({
  // ########################################
  _lolRegion: '',
  _lolVersion: '',
  _lolPath: '',
  _items: [],
  _champions: [],
  // ########################################
  shouldShowWelcomeScreen() {
    return !this._lolRegion || !this._lolPath;
  },

  appReady() {
    return this._lolRegion
      && this._lolVersion
      && this._lolPath
      && !!this._items.length
      && !!this._champions.length;
  },

  isNewerVersion(version) {
    let currentVersion = this.getVersion();

    if(!currentVersion)
      currentVersion = '';

    return compareVersions(version, currentVersion);
  },
  // ########################################
  getRegion() {
    return this._lolRegion;
  },
  getVersion() {
    return this._lolVersion;
  },
  getPath() {
    return this._lolPath;
  },
  // ########################################
  loadRegion(region) {
    this._lolRegion = region;
  },

  loadVersion(version) {
    this._lolVersion = version;
  },

  loadPath(path) {
    this._lolPath = path;
  },

  loadItems(items) {
    this._items = items;
  },

  loadChampions(champions) {
    this._champions = champions;
  },
  // ########################################
  updateRegion(region) {
    this._lolRegion = region;
  },

  updatePath(path) {
    this._lolPath = path;
  },

  updateVersion(version) {
    this._lolVersion = version;
  }

}, function (payload) {
  let actionType = payload.actionType;

  console.log('Appstore', payload.actionType);

  // ########################################
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
  if(actionType === 'LOL_ITEMS_LOAD') {
    this.loadItems(payload.data.items);
    this.emitChange();
  }

  if(actionType === 'LOL_CHAMPIONS_LOAD') {
    this.loadChampions(payload.data.champions);
    this.emitChange();
  }
  // ########################################
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


});

export default AppStore;