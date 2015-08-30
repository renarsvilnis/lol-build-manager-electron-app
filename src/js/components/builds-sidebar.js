'use strict';

import React from 'react';

import cache from '../modules/cache';

import GuideStore from '../stores/guide-store';
import AppStore from '../stores/app-store';

import SidebarChampion from './builds-sidebar-champion';



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
    store: GuideStore.getGroupedList()
  }
};


let Sidebar = React.createClass({

  mixins: [GuideStore.mixin],

  getInitialState: function() {
    return getState();
  },

  storeDidChange: function() {
    this.setState(getState());
  },

  componentDidMount: function() {},

  createChampionNodes: function() {
    let nodes = this.state.store.map(function(group) {
      return (
        <SidebarChampion group={group} key={group.id} />
      );
    });

    return nodes;
  },

  render: function() {

    let championNodes = this.createChampionNodes();

    return (
      <div className="c_builds-sidebar">
        <h2>Champions</h2>
        <div className="c_builds-sidebar__champions">
          {championNodes}
        </div>
      </div>
    );
  }
});

export default Sidebar;