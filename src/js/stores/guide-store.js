'use strict';

import uuid from 'node-uuid';

import db from '../modules/db';
import Biff from '../modules/biff';


/**
 * Group the list by champions
 * @param  {Array} Array of objects holding build or guide objects
 * @return {Object} Grouped object by chmapion id
 */
let groupList = function(list) {
  let groups = {};

  // group by champion id
  for(let i = 0, l = list.length; i < l; i++) {
    let item = list[i];

    let championId = item.champion;

    if(!championId)
      continue;

    addUuid(item);

    if(typeof groups[championId] === 'undefined')
      groups[championId] = [];

    groups[championId].push(item);
  }

  return groups;
};

/**
 * Add unique id for sidebar menu item, it can be either a build or guide
 * It is used to identify react.js components
 * @param {Object} item [description]
 */
let addUuid = function(item) {
  // if a guide then add uuid for each build
  if(item.url) {
    item.builds.forEech(function(build) {
      build.id = uuid.v1();
    })
  }

  item.id = uuid.v1();
};

let loadGroupChampions = function(groups) {

  let list = [];

  for(let championId in groups) {
    let group = groups[championId];
    let champion = db.getChampionById(championId);

    // ginore group if doesn't have a valid chmapion
    if(!champion)
      continue;

    list.push({
      id: champion.id,
      name: champion.name,
      image: champion.image,
      data: group
    });
  }

  // TODO: sort list by name

  return list;
};


// Creates a DataStore
let GuideStore = Biff.createStore({

  /**
   * Array of builds and guides objects
   * @type {Object[]}
   */
  _list: [],

  /**
   * Array of builds and guides which are grouped by champion
   * @type {Object[]}
   */
  _groupedList: [],


  getList: function() {
    return this._list;
  },

  getGroupedList: function() {
    return this._groupedList;
  },

  loadList: function(list) {
    this._list = list;
    this.processList();
  },

  processList: function() {
    let groupedList = groupList(this.getList());
    this._groupedList = loadGroupChampions(groupedList);
  },

}, function (payload) {
  let actionType = payload.actionType;

  console.log('GuideStore', payload.actionType);

  if(actionType === 'LIST_LOAD') {
    this.loadList(payload.data.list);
    this.emitChange();
  }

});

export default GuideStore;