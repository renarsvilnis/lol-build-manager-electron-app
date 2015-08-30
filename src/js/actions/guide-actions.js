'use strict';

import Biff from '../modules/biff';
// import db   from '../modules/db';

let GuideActions = Biff.createActions({

  loadList: function(data) {
    this.dispatch({
      actionType: 'LIST_LOAD',
      data
    });
  },

  guideCreate: function(data) {

    // cache.createGuide(data.guide, callback(err, ))

    // this.dispatch({
    //   actionType: 'GUIDE_CREATE',
    //   data:

    // })
  }
});

export default GuideActions;