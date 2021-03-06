'use strict';

import Biff from '../modules/biff';
import db   from '../modules/db';

let AppActions = Biff.createActions({

  // ########################################
  // Load methods
  // ########################################
  loadLolRegion() {
    this.dispatch({
      actionType: 'LOL_REGION_LOAD',
      data: {
        region: db.getLolRegion()
      }
    });
  },
  loadLolVersion() {
    this.dispatch({
      actionType: 'LOL_VERSION_LOAD',
      data: {
        version: db.getLolVersion()
      }
    });
  },
  loadLolPath() {
    this.dispatch({
      actionType: 'LOL_PATH_LOAD',
      data: {
        path: db.getLolPath()
      }
    });
  },
  loadItems(data) {
    this.dispatch({
      actionType: 'LOL_ITEMS_LOAD',
      data
    });
  },
  loadChampions(data) {
    this.dispatch({
      actionType: 'LOL_CHAMPIONS_LOAD',
      data
    });
  },

  // ########################################
  // Update methods
  // ########################################
  updateLolRegion(data) {

    db.setLolRegion(data.region);

    this.dispatch({
      actionType: 'LOL_REGION_UPDATE',
      data
    });
  },

  updateLolPath(data) {

    db.setLolPath(data.path);

    this.dispatch({
      actionType: 'LOL_PATH_UPDATE',
      data
    });
  },

  updateVersion(data) {

    db.setLolVersion(data.version);

    this.dispatch({
      actionType: 'LOL_VERSION_UPDATE',
      data
    });
  }

});

export default AppActions;