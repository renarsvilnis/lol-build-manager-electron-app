'use strict';

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import remote from 'remote';
import request from 'request';
import pathExists from 'path-exists';
import childProcess from 'child_process';

let app = remote.require('app');

import {LOL_ITEM_SET_PATH, LOL_VALID_INSTALL_PATH} from '../constants/lol-constants';

/**
 * Download an image to a specific folder
 * @param  {String} Filename with extension
 * @param  {String} Url for the image including filename
 * @param  {String} Path to directory where image is going to be saved
 * @param  {Function}
 * @return {Error}
 * @return {String} Path to saved image
 */
export function downloadImage(filename, url, saveDirectory, callback) {

  // craete save directory if needed
  mkdirp(saveDirectory, function(err) {

    if(err) {
      callback(new Error('Issue creating a save directory'));
      return;
    }

    err = null;
    
    let savePath = path.normalize(saveDirectory + filename);

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
 * @param  {string}
 * @return {string}
 */
export function removeNonNumbericCharacters(str) {
  if(typeof str === 'string') {
    return str.replace(/\D/g,'');  
  } else if(typeof str === 'number' && !isNaN) {
    return str;
  } else {
    return '';
  }
  
};

/**
 * Parse number out of string
 * Example: 'x2' -> 2
 * Example: '2x' -> 2
 * @param {string}
 * @return {number}
 */
export function parseIntFromString(str) {
  return parseInt(removeNonNumbericCharacters(str), 10);
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

/**
 * Create the itemset path from given League of Legends base game folder
 * @param  {string} Path to League of Legends installation folder
 * @return {string}
 */
export function createLolItemSetPath(baseDir) {
  return path.normalize(baseDir + LOL_ITEM_SET_PATH);
};

/**
 * Check wheter given path contains valid item set directory
 * @param  {string} Path to League of Legends installation folder
 * @param  {Function}
 * @return {Error}
 * @return {Boolean} Does dir exists
 */
export function isValidLolDirectroy(baseDir, callback) {
  let folderPath = path.normalize(baseDir + LOL_VALID_INSTALL_PATH)
  pathExists(folderPath, callback);
};

/**
 * Creates a recursive file path for itemsets if doesn't exist
 * @param  {string} Path to League of Legends installation folder
 * @param  {Function} callback   [description]
 * @return {[type]}              [description]
 */
export function createIfNotExistLolItemSetDir(baseDir, callback) {
  let itemSetPath = createLolItemSetPath(baseDir);
  mkdirp(itemSetPath, callback);
};

/**
 * Restart electron app
 * Note: doesn't reopen the application in OSX
 * TODO: look for an alternative of clossing the renderer
 *       window and reopening it
 * Reference: https://github.com/atom/electron/issues/539
 */
export function restartApp() {
  childProcess.exec(process.execPath);
  app.quit();
};

/**
 * Check if given value is an object
 * Reference: http://stackoverflow.com/a/22482737/1378261
 * @param  {*}
 * @return {Boolean}
 */
export function isObject(val) {
  if(val === null)
    return false;

  return (typeof val === 'function') || (typeof val === 'object');
};

/**
 * Check if given value is undefined or null
 * @type {*}
 * @return {Boolean}
 */
export function isUndefinedOrNull(val) {
  return typeof author === 'undefined' || author === null;
};
