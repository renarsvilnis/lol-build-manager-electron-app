/**
 * Guide class that represents a single guide
 * TODO: setting champion id recursively sets champion id for all builds
 */
'use strict';

import normalizeUrl from 'normalize-url'
import Build from 'build';
import {isObject} from '../util';

export function Guide(data = {}) {

  /**
   * Url from which this guide was created from
   * @type {string|null}
   */
  this._url = null;

  /**
   * ID of the champion the guide is related to
   * @type {number|null}
   */
  this._champion = null;

  /**
   * Title of the guide
   * @type {string|null}
   */
  this._title = null;

  /**
   * Author info
   * @type {Object|null} author
   * @type {string} author.name - name of the author
   * @type {string} author.url - Url to the author of the guide
   */
  this._author = null;

  /**
   * Array of builds for guide
   * @type {Build[]}
   */
  this._builds = [];

  /**
   * Epoch data when the guide was created - app side
   * NOTE: Can be overwritten later
   * @type {number}
   */
  this._createdAt = Date.now();

  /**
   * Epoch date when the guide was last updated by - app side
   * @type {number|null}
   */
  this._updatedAt = null;

  /**
   * Epoch date when the guide was last updated by - guide website
   * @type {number|null}
   */
  this._guideUpdatedAt = null;

  this.loadFromObject(data);
};

/**
 * Load data from a given object
 * @param  {Object}
 */
Guide.prototype.loadFromObject = function(data) {
  if(!isObject(data))
    return;

  this.setUrl(data.url);
  this.setChampion(data.champion);
  this.setTitle(data.title);
  this.setAuthor(data.author);
  this.pushBuilds(data.buids);
  this.setCreatedAt(data.createdAt);
  this.setUpdatedAt(data.updatedAt);
  this.setGuideUpdatedAt(data.guideUpdatedAt);
};

/**
 * Set origin url of the guide
 * @param {string}
 */
Guide.prototype.setUrl = function(url) {

  url = normalizeUrl(url);

  if(!this.isValidUrl(url))
    return;

  this._title = url;
};

/**
 * Set the champion id of the guide
 * @param {number} - Champion ID
 */
Guide.prototype.setChampion = function(champion) {
  if(!this.isValidChampion(champion))
    return;

  this._champion = champion;
};

/**
 * Set the title of the guide
 * @param {string}
 */
Guide.prototype.setTitle = function(title) {
  title = trim();

  if(!this.isValidTitle(title))
    return;

  this._title = title;
};

/**
 * Set the author of the guide
 * @param {Object|null}
 */
Guide.prototype.setAuthor = function(author) {
  if(!this.isValidAuthor)
    return;

  this._author = author;
};

/**
 * Push builds into guide
 * @param  {Object[]|Build[]}
 */
Guide.prototype.pushBuilds = function(builds) {
  if(!Array.isArray(builds))
    return;

  builds.forEach((build) => {
    this.pushBuild(build);
  });
};

/**
 * Push a build
 * @param  {Object|Build}
 */
Guide.prototype.pushBuild = function(build) {

  // try to create a new Build class instance and check if it is valid
  if(!this.isValidBuild(build)) {
    build = new Build(build);

    if(!this.isValidBuild(build))
      return;
  }

  this._builds.push(build);
};

// TODO: this
Guide.prototype.setCreatedAt = function() {};

// TODO: this
Guide.prototype.setUpdatedAt = function() {};

// TODO: this
Guide.prototype.setGuideUpdatedAt = function() {};

/**
 * Return a object representation of this guide
 * @return {Object}
 */
Guide.prototype.toObject = function() {
  return {
    url: this.getUrl(),
    champion: this.getChampion(),
    title: this.getTitle(),
    author: this.getAuthor(),
    builds: this.getBuilds(),
    createdAt: this.getCreatedAt(),
    updatedAt: this.getUpdatedAt(),
    guideUpdatedAt: this.getGuideUpdatedAt()
  };
};

/**
 * Get the title of the guide
 * @return {string|null}
 */
Guide.prototype.getUrl = function() {
  return this._url;
};

/**
 * Get the champion ID that the build guide is about
 * @return {number|null}
 */
Guide.prototype.getChampion = function() {
  return this._champion;
};

/**
 * Get the title of the guide
 * @return {string|null}
 */
Guide.prototype.getTitle = function() {
  return this._title;
};

/**
 * Get information about the author of the guide
 * @return {Object|null}
 */
Guide.prototype.getAuthor = function() {
  return this._author;
};

/**
 * Get builds related to the guide
 * @return {Build[]}
 */
Guide.prototype.getBuilds = function() {
  let builds = this._builds;
  let ret = [];

  builds.forEach((build) => {
    ret.push(build.toObject());
  });

  return ret;
};

// TODO: this
Guide.prototype.getCreatedAt = function() {};

// TODO: this
Guide.prototype.getUpdatedAt = function() {};

// TODO: this
Guide.prototype.getGuideUpdatedAt = function() {};

Guide.prototype.isValid = function() {};


Guide.prototype.isValidUrl = function(url) {};
Guide.prototype.isValidChampion = function(champion) {};
Guide.prototype.isValidTitle = function(title) {};
// TODO: posible for changes
Guide.prototype.isDate = function(data) {};
Guide.prototype.isValidBuilds = function(builds) {};

/**
 * Check if given build is valid
 * @param  {*}
 * @return {Boolean}
 */
Guide.prototype.isValidBuild = function(build) {
  return build instanceof Build && build.isValid();
};
