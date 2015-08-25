'use strict';

import remote from 'remote';

import Biff from '../modules/biff';

// import main process db module into store
let db = remote.require('./db');

// Creates a DataStore
let AppStore = Biff.createStore({


  showWelcomeScreen: function() {
    return !db.getLolVersion() || db.getLolRegion() || !db.getLolPath();
  },


}, function (payload) {
  if (payload.actionType === "EXAMPLE_ACTIONS") {
    // this.createRecipe(payload.data);
    this.emitChange();
  }
});

export default AppStore;
