'use strict';

import Biff from '../modules/biff';
import db   from '../modules/db';

let GuideActions = Biff.createActions({
  // updateVersion: function(data) {

  //   db.setLolVersion(data.version);

  //   this.dispatch({
  //     actionType: 'LOL_VERSION_UPDATE',
  //     data
  //   });
  // }

});

export default GuideActions;