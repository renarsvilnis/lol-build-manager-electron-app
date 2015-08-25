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

export const LOL_INSTALL_PATH_WIN = 'C:/Riot Games/League of Legends/';
export const LOL_INSTALL_PATH_OSX = '/Applications/League Of Legends.app';

export const LOL_INSTALL_PATH = process.platform === 'darwin'
  ? LOL_INSTALL_PATH_OSX
  : LOL_INSTALL_PATH_WIN;

/**
 * Added with help of gulp-preprocessor
 * @type {String}
 */
export const API_KEY = '/* @echo API_KEY */';