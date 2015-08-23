'use strict';

var util = {

  /**
   * Return human readable filesize
   * http://stackoverflow.com/a/14919494
   * @param  {Number} bytes
   * @param  {Boolean} si
   * @return {String}
   */
  humanFileSize: function(bytes, si) {
    var thresh = si ? 1000 : 1024;

    if(Math.abs(bytes) < thresh)
      return bytes + ' B';

    var units = si ?
      ['kB','MB','GB','TB','PB','EB','ZB','YB'] :
      ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;

    do {
      bytes /= thresh;
      ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);

    return bytes.toFixed(1) + ' ' + units[u];
  },

};

module.exports = util;