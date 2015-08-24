/**
 * Module for retriving and storing app cache related stuff
 *
 * References:
 * https://github.com/typicode/underscore-db
 * https://github.com/typicode/lowdb
 */

var low = require('lowdb'),
    app = require('app'),
    ipc = require('ipc');

let dir      = app.getPath('userCache'),
    filename = 'cache.json',
    path  = dir + '/' + filename;

let db = low(path, {
  autosave: true,
  async: true
});

// db._.mixin(require('underscore-db'));

var dbMethods = {

  /**
   * Get cached version of League of Legends
   * @return {string || null}
   */
  getGameVersion: function() {
    let ver = db.object.lol.version;
    return ver !== 'string' ? null : ver;
  },

  /**
   * Get region info of installed League of Legends
   * @return {string || null}
   */
  getLolRegion: function() {
    let ver = db.object.lol.region;
    return ver !== 'string' ? null : ver;
  }
};

module.exports = dbMethods;
