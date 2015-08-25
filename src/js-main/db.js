/**
 * Module for retriving and storing app cache related stuff
 *
 * References:
 * https://github.com/typicode/lowdb
 * https://github.com/mariocasciaro/object-path
 *
 * Possible alternative to lowdb:
 * https://github.com/typicode/jsop
 */

import low from 'lowdb';
import objectPath from 'object-path';
import app from 'app';
import ipc from 'ipc';

let dir      = app.getPath('userCache'),
    filename = 'cache.json',
    path  = dir + '/' + filename;

let db = low(path, {
  autosave: true,
  async: true
});

var dbMethods = {

  /**
   * Get cached version of League of Legends
   * @return {string || null}
   */
  getGameVersion: function() {
    return objectPath.get(db.object, 'db.object.lol.version');
  },

  /**
   * Get region info of installed League of Legends
   * @return {string || null}
   */
  getLolRegion: function() {
    return objectPath.get(db.object, 'db.object.lol.region');
  }
};

export default dbMethods;
