'use strict';

import React from 'react';
import {restartApp} from '../modules/util';

let Settings = React.createClass({

  restartApp: function() {
    restartApp();
  },

  render: function() {
    return (
      <div className="c_settings">
        <h2>Settings</h2>
        <button onClick={this.restartApp}>Restart app</button>
      </div>
    );
  }
});

export default Settings;
