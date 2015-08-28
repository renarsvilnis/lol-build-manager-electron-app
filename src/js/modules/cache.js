/**
 * Module that wraps functionality around getting, setting data to cache.
 * Imagine it like a localhost rest
 */
'use strict';

import db from '../modules/db';
import AppActions from '../actions/app-actions';

let Cache = {
  loadApp: function() {
    AppActions.loadLolVersion();
    AppActions.loadLolRegion();
    AppActions.loadLolPath();
  }

};

export default Cache;
