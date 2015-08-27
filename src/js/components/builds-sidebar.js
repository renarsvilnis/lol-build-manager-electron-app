'use strict';

import React from 'react';

import SidebarChampion from './builds-sidebar-champion';
import AppStore from '../stores/app-store';

let getState = function() {
  return {
    // active:AppStore.getActiveGuideId()
    store: AppStore.getBuilds()
  }
};

let Sidebar = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {

  },

  createChampionNodes: function() {
    let nodes = this.state.store.map(function(champion) {
      return (
        <SidebarChampion champion={champion} key={champion.id} />
      );
    });

    return nodes;
  },

  render: function() {

    let championNodes = this.createChampionNodes();

    return (
      <div className="c_builds-sidebar">
        <h2>Champions</h2>
        {championNodes}
      </div>
    );
  }
});

export default Sidebar;