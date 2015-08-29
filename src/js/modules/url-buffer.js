/**
 * Node module that stores incoming data from app set custom protocol
 * so that it can be used later when the app has launched succesfully
 */
'use strict';

import app from 'app';
import mgnUtil from 'lol-build-manager-util';

let buffer = [];

export default {
  push: function(url) {
    buffer.push(mgnUtil.decodeUrlData(url));
  },

  flush: function() {
    let bufferTemp = this.get().slice();
    this.clean();
    return bufferTemp;
  },

  get: function() {
    return buffer;
  },

  clean: function() {
    buffer = [];
  }
};