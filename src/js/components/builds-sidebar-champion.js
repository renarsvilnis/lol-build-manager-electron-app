'use strict';

import React from 'react';

let SidebarChampion = React.createClass({

  render: function() {
    console.log(this.props)
    return (
      <div className="c_builds-sidebar__champion">
        <h4>{this.props.name}</h4>
      </div>
    );
  }
});

export default SidebarChampion;