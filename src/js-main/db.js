/**
 * Module for retriving and storing app cache related stuff
 *
 * References:
 * https://github.com/typicode/underscore-db
 * https://github.com/typicode/lowdb
 */

import low from 'lowdb';
import app from 'app';
import ipc from 'ipc';

let dir      = app.getPath('userCache'),
    filename = 'cache.json',
    path  = dir + '/' + filename;

let db = low(path, {
  autosave: true,
  async: true
});

db._.mixin(require('underscore-db'));

var dbMethods = {

  /**
   * Get cached version of League of Legends
   * @return {string || null}
   */
  getGameVersion: function() {
    console.log(db.object);
    let ver = db.object['lol'] ? db.object.lol['version'] : null;
    return ver !== 'string' ? null : ver;
  },

  /**
   * Get region info of installed League of Legends
   * @return {string || null}
   */
  getLolRegion: function() {
    let ver = db.object.lol ? db.object.lol.region : null;
    return ver !== 'string' ? null : ver;
  }
};

export default dbMethods;
