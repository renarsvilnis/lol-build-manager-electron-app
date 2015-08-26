'use strict';

import React from 'react';

import BuildSidebar from './builds-sidebar';
import BuildBody from './builds-body';

let Builds = React.createClass({

  render: function() {
    return (
      <div className="c_builds">
        <BuildSidebar/>
        <BuildBody/>
      </div>
    );
  }
});

export default Builds;
