'use strict';

import remote from 'remote';

let app = remote.require('app');

/**
 * Used in League of Legends API requests
 * Added with help of gulp-preprocessor
 * @type {String}
 */
export const API_KEY = '/* @echo API_KEY */';


/**
 * Path to application cache directory
 * @type {String}
 */
export const CACHE_DIR = app.getPath('userCache');



export const GUIDE_TEMPLATE = {
  /**
   * Champion Id - referenced to League of Legends API id of the champion
   * @type {Number}
   */
  champion: null,

  /**
   * Title of the guide
   * @type {String}
   */
  title: '',

  /**
   * Guide url
   * @type {string}
   */
  url: '',

  /**
   * Info about the guide author
   * @type {Object} author
   * @type {string} author.name - Name, mostly nickname, of the author
   * @type {string} author.url - Url to the author page
   */
  author: {
    name: '',
    url: ''
  },

  
  builds: [
    // {
    //   title: '',
    //   blocks: [
    //     {
    //       type: '',
    //       items: [
    //         {
    //           id: '1001',
    //           count: 1
    //         }, ..
    //       ]
    //     }, ..
    //   ]
    // }, ..
  ],

  /**
   * Epoch date related to the creation or update of the guide
   * Note: whichever is higher
   * @type {Number}
   */
  createdAt: 0,

  /**
   * Epoch date when crawled
   * @type {Number}
   */
  addedAt: 0
};