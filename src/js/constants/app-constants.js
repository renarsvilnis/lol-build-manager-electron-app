'use strict';

import path from 'path';
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

export const ITEMS_FOLDER = path.join(CACHE_DIR, 'items/');
export const CHAMPIONS_FOLDER = path.join(CACHE_DIR, 'champions/');


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

  /**
   * Info about builds inside of guides - as many League of Legends guide
   * websites have the ability for a single  guide to create several builds
   * @type {Array} builds
   */
  builds: [

    /**
     * Build information
     * @type {Object} guide
     * @type {string} guide.title - Title of the guide
     * @type {Array} guide.blocks - Array of objects of block rows
     */
    // {
    //   title: '',
    //   blocks: [
        /**
         * Item block
         * @type {Object} block
         * @type {string} block.type - Title of the block, same as LOL API
         * @type {Array} block.items - Array of objects of block items
         */
        // {
        //   type: '',
        //   items: [
            /**
             * Item
             * @type {object} item
             * @type {string} item.id - Item Id as string
             * @type {count} item.count - Shows how many item needed
             */
    //         {
    //           id: '1001',
    //           count: 1
    //         } 
    //       ]
    //     }
    //   ]
    // }
  ],

  /**
   * Epoch date representing creation, last updated time for the
   * guide, taken from the guide origin
   * @type {Number}
   */
  updatedAt: 0,

  /**
   * Epoch date when crawled
   * @type {Number}
   */
  addedAt: 0
};