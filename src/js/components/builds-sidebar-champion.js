'use strict';

import React from 'react';

let SidebarChampion = React.createClass({

  render: function() {
    return (
      <div className="c_builds-sidebar__champion">
        <h4>{this.props.champion.name}</h4>
      </div>
    );
  }
});

export default SidebarChampion;