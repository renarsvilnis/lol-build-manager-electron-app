'use strict';

import remote from 'remote';

import db from '../modules/db';
import Biff from '../modules/biff';

// Creates a DataStore
let AppStore = Biff.createStore({

  shouldShowWelcomeScreen: function() {
    return !db.getLolVersion() || db.getLolRegion() || !db.getLolPath();
  },


}, function (payload) {
  if (payload.actionType === "EXAMPLE_ACTIONS") {
    // this.createRecipe(payload.data);
    this.emitChange();
  }
});

export default AppStore;