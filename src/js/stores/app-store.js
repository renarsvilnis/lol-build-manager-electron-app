'use strict';

import remote from 'remote';

import db from '../modules/db';
import Biff from '../modules/biff';

// Creates a DataStore
let AppStore = Biff.createStore({

  _lolRegion: '',
  _lolVersion: '',
  _lolPath: '',
  // _items: [],
  // _champions: [],
  // _guides: [],

  shouldShowWelcomeScreen: function() {
    // No need to look for path, for the case when user relocates
    // League of Legends game folder
    return !this._lolVersion || !this._lolRegion;
  },

  downloadItems: function(callback) {
    lolApi.getItems(db.getLolRegion(), function(err, results) {

      if(err) {
        callback(err, null);
        return;
      }


      // db.setItems(results);
    });
  },

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

  updateRegion: function(region) {
    this._lolRegion = region;
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
  
});

export default AppStore;