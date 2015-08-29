'use strict';

import db from '../modules/db';
import Biff from '../modules/biff';

// Creates a DataStore
let GuideStore = Biff.createStore({

}, function (payload) {
  let actionType = payload.actionType;

  console.log('GuideStore', payload.actionType);

  // if(actionType === 'LOL_REGION_LOAD') {
  //   this.loadRegion(payload.data.region);
  //   this.emitChange();
  // }

});

export default GuideStore;