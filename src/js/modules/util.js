'use strict';

import fs from 'fs';
import mkdirp from 'mkdirp';
import request from 'request';

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

/**
 * Strip string for all non-numberic characters
 * @param  {string} str
 * @return {string}
 */
export function removeNonNumbericCharacters(str) {
  return str.replace(/\D/g,'');
};

/**
 * Converts object to an array by droping keys
 * Reference: http://stackoverflow.com/a/26166303
 * @param  {Object} obj
 * @return {Array}
 */
export function objectToArray(obj) {
  return Object.keys(obj).map((key) => obj[key]);
};