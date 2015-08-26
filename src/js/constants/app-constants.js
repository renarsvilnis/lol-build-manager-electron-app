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