'use strict';

import fs from 'fs';
import mkdirp from 'mkdirp';
import request from 'request';

/**
 * Return human readable filesize
 * http://stackoverflow.com/a/14919494
 * @param  {Number} bytes
 * @param  {Boolean} si
 * @return {String}
 */
export function humanFileSize(bytes, si) {
  let thresh = si ? 1000 : 1024;

  if(Math.abs(bytes) < thresh)
    return bytes + ' B';

  let units = si ?
    ['kB','MB','GB','TB','PB','EB','ZB','YB'] :
    ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
  let u = -1;

  do {
    bytes /= thresh;
    ++u;
  } while(Math.abs(bytes) >= thresh && u < units.length - 1);

  return bytes.toFixed(1) + ' ' + units[u];
};

/**
 * Download an image to a specific folder
 * @param  {String} filename with extension
 * @param  {String} url for the image including filename
 * @param  {String} path to directory where image is going to be saved
 * @param  {Function} callback
 * @return {Error} error message
 * @return {String} path to saved image
 */
export function downloadImage(filename, url, saveDirectory, callback) {

  // craete save directory if needed
  mkdirp(saveDirectory, function(err) {

    if(err) {
      callback(new Error('Issue creating a save directory'));
      return;
    }

    err = null;
    
    let savePath = saveDirectory + filename;

    request(url)
      .on('response', function(res) {
        // Only if response is valid create the file
        if(res.statusCode === 200) {
          this.pipe(fs.createWriteStream(savePath));
        } else {
          err = new Error('Issue while downloading image');
        }
      }).on('end', function() {
        callback(err, savePath);
      });

  });
};
