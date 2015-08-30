'use strict';

import Biff from '../modules/biff';
// import db   from '../modules/db';

let GuideActions = Biff.createActions({

  loadList: function(data) {
    this.dispatch({
      actionType: 'LIST_LOAD',
      data
    });
  }
});

export default GuideActions;