'use strict';

import React from 'react';

import SidebarChampion from './builds-sidebar-champion';
import AppStore from '../stores/app-store';

import cache from '../modules/cache';

// getBuilds: function() {
//   let champions = db.getChampions();

//   if(!champions) {
//     champions = [];
//   } else {
//     champions = champions.data;
//   }

//   // sort champions by lower case name
//   champions.sort(function(a, b) {
//     let lowA = a.name.toLowerCase(),
//         lowB = b.name.toLowerCase();

//     if(lowA < lowB) {
//       return -1;
//     } else if(lowA > lowB) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });

//   return champions;

let getState = function() {
  return {
    // active:AppStore.getActiveGuideId()
    // store: AppStore.getBuilds()
    store: []
  }
};

let Sidebar = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    cache.loadBuilds(function() {});
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