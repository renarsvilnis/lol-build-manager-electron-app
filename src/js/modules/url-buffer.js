/**
 * Singleton class that stores incoming data from app set custom protocol
 * so that it can be used later when the app has launched succesfully
 */
'use strict';

import {parseAppProtocolUrl} from 'lol-build-manager-util';
import objectAssign from 'object-assign';

/**
 * Buffer that holds a single (last) recieved data object from
 * the registered custom url scheme
 * @type {Object|null}
 */
let buffer = null;

/**
 * Parse and push a url-string into buffer
 * @param  {string} 
 * @param  {Function}
 * @return {null}
 * @return {Boolean} Did it push to the buffer successfully
 */
export function push(url, callback) {
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
};

/**
 * Returns and cleans the buffer
 * @return {Object|null} buffer
 */
export function flush() {
  let tempBuffer = get();
  clean();
  return tempBuffer;
};

/**
 * Gets buffer
 * @return {Object|null}
 */
export function get() {
  return typeof buffer === 'object' ? objectAssign({}, buffer) : null;
};

/**
 * Cleans the buffer
 */
export function clean() {
  buffer = null;
};
