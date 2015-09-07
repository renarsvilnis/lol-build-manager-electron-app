/**
 * Guide class that represents a single guide
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

  // TODO: figure out what to do
  this._updatedAt = null;

  // TODO: figure out what to do
  this._createAt = Date.now();

  /**
   * Array of builds for guide
   * @type {Build[]}
   */
  this._builds = [];

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
  // TODO: add updatedAt
  // TODO: add createdAt
  this.pushBuilds(data.buids);
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

// TODO: implement method
// Guide.prototype.setUpdateDate = function(date) {};

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

Guide.prototype.pushBuild = function(build) {};

Guide.prototype.toObject = function() {};
Guide.prototype.getUrl = function() {};
Guide.prototype.getChampion = function() {};
Guide.prototype.getTitle = function() {};
Guide.prototype.getAuthor = function() {};
Guide.prototype.getUpdateDate = function() {};
Guide.prototype.getBuilds = function() {};

Guide.prototype.isValid = function() {};

Guide.prototype.isValidUrl = function(url) {};

// TODO: make db call to cehck if that champion exists?!
Guide.prototype.isValidChampion = function(champion) {};
Guide.prototype.isValidTitle = function(title) {};

Guide.prototype.save = function(path, callback) {};


