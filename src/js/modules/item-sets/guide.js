/**
 * Guide class that represents a single guide
 * TODO: setting champion id recursively sets champion id for all builds
 * TODO: onSome item change change last updated?
 */
'use strict';

import normalizeUrl from 'normalize-url'
import Build from 'build';
import {isObject, isUndefinedOrNull} from '../util';

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
  title = title.trim();

  if(!this.isValidTitle(title))
    return;

  this._title = title;
};

/**
 * Set the author of the guide
 * @param {Object|null}
 */
Guide.prototype.setAuthor = function(author) {
  if(!this.isValidAuthor())
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

/**
 * Set epoch date when the guide was created by app-side
 * @param {number}
 */
Guide.prototype.setCreatedAt = function(date) {
  if(!this.isValidDate(date))
    return;

  this._createdAt = date;
};

/**
 * Set epoch date when the guide was last updated by app-side
 * @param {number}
 */
Guide.prototype.setUpdatedAt = function(date) {
  if(!this.isValidDate(date))
    return;

  this._updatedAt = date;
};

/**
 * Set epoch date when the guide was last updated by the guide author
 * @param {number}
 */
Guide.prototype.setGuideUpdatedAt = function(date) {
  if(!this.isValidDate(date))
    return;

  this._guideUpdatedAt = date;
};

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
Guide.prototype.getCreatedAt = function() {
  return this._createdAt;
};

// TODO: this
Guide.prototype.getUpdatedAt = function() {
  return this._updatedAt;
};

// TODO: this
Guide.prototype.getGuideUpdatedAt = function() {
  return this._guideUpdatedAt;
};

/**
 * Check if given guide is valid
 * @return {Boolean}
 */
Guide.prototype.isValid = function() {
  let url            = this.getUrl(),
      champion       = this.getChampion(),
      title          = this.getTitle(),
      author         = this.getAuthor(),
      createdAt      = this.getCreatedAt(),
      updatedAt      = this.getUpdatedAt(),
      guideUpdatedAt = this.getGuideUpdatedAt();

  return this.isValidUrl(url) &&
    this.isValidChampion(champion) &&
    this.isValidTitle(title) &&
    this.isValidAuthor(author) &&
    this.isValidDate(createdAt) &&
    this.isValidDate(updatedAt) &&
    this.isValidDate(guideUpdatedAt) &&
    this.isValidBuilds();
};

/**
 * Check if given url is valid
 * @param  {*}
 * @return {Boolean}
 */
Guide.prototype.isValidUrl = function(url) {
  return url && typeof url === 'string';
};

/**
 * Check if given champion id is valid
 * @param  {*}
 * @return {Boolean}
 */
Guide.prototype.isValidChampion = function(champion) {
  return champion && typeof champion === 'number' && !isNan(champion);
};

// TODO: this
Guide.prototype.isValidTitle = function(title) {
  return title && typeof title === 'string';
};

// TODO: this
Guide.prototype.isValidAuthor = function(author) {

  if(isUndefinedOrNull(author))
    return true;

  if(!isObject(author))
    return false;

  let name = author.name,
      url  = author.url;

  // if(isUndefinedOrNull())


  // check author url
  // if(author.url )

  return true;
};

// TODO: this
Guide.prototype.isValidDate = function(date) {
  return date && typeof date === 'number' && !isNaN(data) && date > 0;
};

/**
 * Check if all builds are valid
 * @param  {*}  [builds=this._builds]
 * @return {Boolean}
 */
Guide.prototype.isValidBuilds = function(builds) {

  if(isUndefinedOrNull(builds))
    builds = this._builds;

  if(!Array.isArray(builds) || !builds.length)
    return false;

  for(let i = 0, l = builds.length; i < l; i++) {
    let build = builds[i];

    if(!this.isValidBuild(build))
      return false;
  }

  return true;
};

/**
 * Check if given build is valid
 * @param  {*}
 * @return {Boolean}
 */
Guide.prototype.isValidBuild = function(build) {
  return build instanceof Build && build.isValid();
};
