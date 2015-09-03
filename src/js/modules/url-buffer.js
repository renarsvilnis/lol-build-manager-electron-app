/**
 * Singleton class that stores incoming data from app set custom protocol
 * so that it can be used later when the app has launched succesfully
 */
'use strict';

import {parseAppProtocolUrl} from 'lol-build-manager-util';
import objectAssign from 'object-assign';

let buffer = null;

export default {

  /**
   * Parse and push a url-string into buffer
   * @param  {string} 
   * @param  {Function}
   * @return {null}
   * @return {Boolean} Did it push to the buffer successfully
   */
  push: function(url, callback) {
    parseAppProtocolUrl(url, function(err, obj) {
      if(err) {
        callback(null, false);
      } else {
        buffer = obj;
        callback(null, true);
      }
    });
  },

  /**
   * Returns and cleans the buffer
   * @return {Object|null} buffer
   */
  flush: function() {
    let tempBuffer = this.get();
    this.clean();
    return tempBuffer;
  },

  /**
   * Gets buffer
   * @return {Object|null}
   */
  get: function() {
    return typeof buffer === 'object' ? objectAssign({}, buffer) : null;
  },

  /**
   * Cleans the buffer
   */
  clean: function() {
    buffer = null;
  }
};