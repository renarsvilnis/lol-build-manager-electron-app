'use strict';

import remote from 'remote';

import db from '../modules/db';
import Biff from '../modules/biff';

// Creates a DataStore
let AppStore = Biff.createStore({

  shouldShowWelcomeScreen: function() {
    return !db.getLolVersion() && !db.getLolRegion() && !db.getLolPath();
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
  }

}, function (payload) {
  if (payload.actionType === "EXAMPLE_ACTIONS") {
    // this.createRecipe(payload.data);
    this.emitChange();
  }
});

export default AppStore;