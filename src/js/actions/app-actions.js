'use strict';

import Biff from '../modules/biff';
import db   from '../modules/db';

let AppActions = Biff.createActions({

  // ########################################
  // Load methods
  // ########################################
  loadLolRegion: function () {
    this.dispatch({
      actionType: 'LOL_REGION_LOAD',
      data: {
        region: db.getLolRegion()
      }
    });
  },
  loadLolVersion: function (data) {
    this.dispatch({
      actionType: 'LOL_VERSION_LOAD',
      data: {
        version: db.getLolVersion()
      }
    });
  },
  loadLolPath: function (data) {
    this.dispatch({
      actionType: 'LOL_PATH_LOAD',
      data: {
        path: db.getLolPath()
      }
    });
  },

  updateLolRegion: function(data) {

    // save to database
    db.setLolRegion(data.region);

    this.dispatch({
      actionType: 'LOL_REGION_UPDATE',
      data: data
    });
  }

});

export default AppActions;