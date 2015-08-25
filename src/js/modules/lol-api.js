
import request from 'request';

import db from './db';
import {API_KEY} from '../constants/app-constants';

/**
 * API constants
 * @type {String}
 */
const API_URL = 'https://global.api.pvp.net/api/lol/static-data';
const API_VERSION = 'v1.2';

const ERR_MSG = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  429: 'Rate limit exceeded',
  500: 'Internal server error',
  503: 'Service unavailable',
  NO_REGION: 'Missing region information'
};

/**
 * Helper function to indentify response status code to human-readable error
 * @param  {String} response status code
 * @return {String} human-readable error message
 */
let getStatusMessage = function(code) {
  return new Error(ERR_MSG[code] || 'Unknown error');
};

/**
 * Helper function to build a specific API url
 * @param  {String} League of Legends region
 * @param  {String} name of API service
 * @return {String} API url
 */
let getApiUrl = function(region, service) {
  return [
    API_URL,
    region,
    API_VERSION,
    service
  ].join('/');
};


let lolApi = {

  /**
   * Get the latest version of League of Legends
   * @param  {String} League of Legends region
   * @param  {Function} callback [description]
   * @return {Error}
   * @return {String} newest League of Legends version
   */
  getLatestGameVersion: function(region, callback) {

    if(!region) {
      callback(getStatusMessage('NO_REGION'));
      return;
    }

    let url = getApiUrl(region, 'versions');
    let qs = {api_key: API_KEY};

    request.get({url, qs, json: true}, function(err, res, body) {

      if(err || res.statusCode !== 200) {
        callback(getStatusMessage(res.statusCode));
        return;
      }

      callback(null, body[0]);
    });
  },

  /**
   * Get items
   * @param  {String} League of Legends region
   * @param  {Function} callback [description]
   * @return {Error}
   * @return {Object} results containing version and item data object
   */
  getItems: function(region, callback) {

    if(!region) {
      callback(getStatusMessage('NO_REGION'));
      return;
    }

    let url = getApiUrl(region, 'item');
    let qs = {
      api_key: API_KEY,
      itemListData: 'sanitizedDescription,image',
    };

    request.get({url, qs, json: true}, function(err, res, body) {

      if(err || res.statusCode !== 200) {
        callback(getStatusMessage(res.statusCode));
        return;
      }

      let results = {
        version: body.version,
        data: body.data
      };

      callback(null, results);
    });
  },

  /**
   * Get champions
   * @param  {String} League of Legends region
   * @param  {Function} callback [description]
   * @return {Error}
   * @return {Object} results containing version and champion data object
   */
  getChamps: function(region, callback) {

    if(!region) {
      callback(getStatusMessage('NO_REGION'));
      return;
    }

    let url = getApiUrl(region, 'champion');
    let qs = {
      api_key: API_KEY,
      champData: 'image',
    };

    request.get({url, qs, json: true}, function(err, res, body) {

      if(err || res.statusCode !== 200) {
        callback(getStatusMessage(res.statusCode));
        return;
      }

      let results = {
        version: body.version,
        data: body.data
      };

      callback(null, results);
    });
  }

};

export default lolApi;



