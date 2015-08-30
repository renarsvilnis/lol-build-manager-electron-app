/**
 * Module for retriving and storing app cache related stuff
 * NOTE - ONLY WORKS IN RENDERER!
 *
 * References:
 * https://github.com/typicode/lowdb
 * https://github.com/mariocasciaro/object-path
 *
 * Possible alternative to lowdb:
 * https://github.com/typicode/jsop
 */
'use strict';

import low from 'lowdb';
import objectPath from 'object-path';

import mgnUtil from 'lol-build-manager-util';
import {CACHE_DIR} from '../constants/app-constants';

let filename = 'cache.json',
    path     = CACHE_DIR + '/' + filename;

let db = low(path, {
  autosave: true,
  async: false // synchronous for now, as we don't have heavy I/O operations
});

let dbMethods = {

  // ########################################
  // GET
  // ########################################

  getLolVersion: () => objectPath.get(db.object, 'db.object.lol.version'),
  getLolRegion: () => objectPath.get(db.object, 'db.object.lol.region'),
  getLolPath: () => objectPath.get(db.object, 'db.object.lol.path'),
  getItems: () => objectPath.get(db.object, 'db.object.items'),
  getChampions: () => objectPath.get(db.object, 'db.object.champions'),
  getGuides: () => objectPath.get(db.object, 'db.object.guides'),

  getItemByName: function(name) {
    let items = this.getItems();

    if(!items || typeof items.data === 'undefined')
      return null;

    items = items.data;
    name = name.toLowerCase();

    for(let id in items) {
      let item = items[id];

      let itemName = item.name.toLowerCase();

      if(mgnUtil.isSubtringInString(itemName, name))
        return item.id;
    }

    return null;
  },

  getItemById: function(id) {
    let items = thus.getItems();

    if(!items || typeof items.data === 'undefined')
      return null;

    items = items.data;

    for(let key in items) {
      let item = items[key];

      if(item.id === id)
        return item;
    }

    return null;
  },

  getChampionByName: function(name) {
    let champions = this.getChampions();

    if(!champions || typeof champions.data === 'undefined')
      return null;

    champions = champions.data;
    name = name.toLowerCase();

    for(let id in champions) {
      let champion = champions[id];

      let championName = champion.name.toLowerCase();
      let championKey = champion.key.toLowerCase();

      // Depending on name good ideda to try to look for key and name match
      if(mgnUtil.isSubtringInString(championName, name) || mgnUtil.isSubtringInString(championKey, name))
        return champion.id;
    }

    return null;
  },

  getItemById: function(id) {
    let champions = this.getChampions();

    if(!champions || typeof champions.data === 'undefined')
      return null;

    champions = champions.data;

    for(let key in champions) {
      let champion = champions[key];

      if(champion.id === id)
        return champion;
    }

    return null;
  },

  getGuideByFile: function(filepath) {
    let guides = this.getGuides();

    if(!guides || !guides.length)
      return null;

    for(let i = 0, l = guides.length; i < l; i++) {
      let guide = guides[i];
      let builds = guide.builds;

      if(!builds || !builds.length)
        continue;

      for(let ii = 0, ll = builds.length; ii < ll; ii++) {
        let build = builds[ii];

        if(build === filepath)
          return guide;
      }
    }

    return null;
  },

  // ########################################
  // POST
  // ########################################

  setLolVersion: function(version) {
    objectPath.set(db.object, 'db.object.lol.version', version);
    db.save();
  },

  setLolRegion: function(region) {
    objectPath.set(db.object, 'db.object.lol.region', region);
    db.save();
  },

  setLolPath: function(path) {
    objectPath.set(db.object, 'db.object.lol.path', path);
    db.save();
  },

  setItems: function(items) {
    objectPath.set(db.object, 'db.object.items', items);
    db.save();
  },

  setChampions: function(champions) {
    objectPath.set(db.object, 'db.object.champions', champions);
    db.save();
  },

  // ########################################
  // DELETE
  // ########################################
  reset: function() {
    db.object = {};
    db.save();
  }

};

export default dbMethods;
