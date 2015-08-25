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
import remote from 'remote';
import ipc from 'ipc';

let app = remote.require('app');

let dir      = app.getPath('userCache'),
    filename = 'cache.json',
    path     = dir + '/' + filename;

let db = low(path, {
  autosave: true,
  async: true
});

let dbMethods = {

  // ########################################
  // GET
  // ########################################

  /**
   * Get cached version of League of Legends
   * @return {String|Undefined}
   */
  getLolVersion: function() {
    return objectPath.get(db.object, 'db.object.lol.version');
  },

  /**
   * Get region info of installed League of Legends
   * @return {String|Undefined}
   */
  getLolRegion: function() {
    return objectPath.get(db.object, 'db.object.lol.region');
  },

  /**
   * Get path of League of Legends game folder
   * @return {String|Undefined}
   */
  getLolPath: function() {
    return objectPath.get(db.object, 'db.object.lol.path');
  },

  getItems: function() {
    return objectPath.get(db.object, 'db.object.items');
  },

  getChampions: function() {
    return objectPath.get(db.object, 'db.object.champions');
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
    objectPath.set(db.object, 'db.object.items', path);
    db.save();
  },

  setChampions: function(champs) {
    objectPath.set(db.object, 'db.object.champions', path);
    db.save();
  }

};

export default dbMethods;
