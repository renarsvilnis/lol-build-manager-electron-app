/**
 * Object of all League of legends available regions
 * @type {Object}
 */
'use strict';

export const REGIONS = {
  na: 'North America',
  euw: 'EU West',
  eune: 'EU Nordic & East',
  lan: 'Latin America North',
  las: 'Latin America South',
  br: 'Brazil',
  ru: 'Russia',
  tr: 'Turkey',
  oce: 'Oceania',
  kr: 'Republic of Korea'
};

/**
 * Paths to League of Legends game folder on OS.
 * Only used as a baseline when promting user to find folder
 * @type {String}
 */
export const LOL_INSTALL_PATH_WIN = 'C:/Riot Games/League of Legends/';
export const LOL_INSTALL_PATH_OSX = '/Applications/League of Legends.app';
export const LOL_INSTALL_PATH = process.platform === 'darwin'
  ? LOL_INSTALL_PATH_OSX
  : LOL_INSTALL_PATH_WIN;


/**
 * Used in League of Legends API requests
 * Added with help of gulp-preprocessor
 * @type {String}
 */
export const API_KEY = '/* @echo API_KEY */';

/**
 * Reserved filename suffixes for item-sets
 * Reference: https://developer.riotgames.com/docs/item-sets
 * @type {Array}
 */
export const RESERVED_SUFFFIXES = ['SR', 'TT', 'DM', 'ASC', 'PG'];