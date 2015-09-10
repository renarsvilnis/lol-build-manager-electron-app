/**
 * Singleton class that stores incoming data from app set custom protocol
 * so that it can be used later when the app has launched succesfully
 */
'use strict';

import objectAssign from 'object-assign';

import {parseAppProtocolUrl} from 'lol-build-manager-util';

/**
 * Buffer that holds a single (last) recieved data object from
 * the registered custom url scheme
 * @type {Object|null}
 */
let buffer = null;

export default {

  /**
   * Parse and push a url-string into buffer
   * @param  {string} 
   * @param  {Function}
   * @return {null}
   * @return {Boolean} Did it push to the buffer successfully
   */
  push(url, callback) {
    parseAppProtocolUrl(url, function(err, obj) {
      if(err) {

        if(callback)
          callback(null, false);
      } else {
        buffer = obj;

        if(callback)
          callback(null, true);
      }
    });
  },

  /**
   * Returns and cleans the buffer
   * @return {Object|null} buffer
   */
  flush() {
    let tempBuffer = this.get();
    this.clean();
    return tempBuffer;
  },

  /**
   * Gets buffer
   * @return {Object|null}
   */
  get() {
    return typeof buffer === 'object' ? objectAssign({}, buffer) : null;
  },

  /**
   * Cleans the buffer
   */
  clean() {
    buffer = null;
  }
};