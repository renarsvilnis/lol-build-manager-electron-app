/**
 * Guide class that represents a single guide
 */
'use strict';

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

Guide.prototype.loadFromObject = function(data) {};
Guide.prototype.setUrl = function(url) {};
Guide.prototype.setChampion = function(champion) {};
Guide.prototype.setTitle = function(title) {};
Guide.prototype.setAuthor = function(author) {};
Guide.prototype.setUpdateDate = function(date) {};
Guide.prototype.pushBuilds = function(builds) {};
Guide.prototype.pushBuild = function(build) {};

Guide.prototype.toObject = function() {};
Guide.prototype.getUrl = function() {};
Guide.prototype.getChampion = function() {};
Guide.prototype.getTitle = function() {};
Guide.prototype.getAuthor = function() {};
Guide.prototype.getUpdateDate = function() {};
Guide.prototype.getBuilds = function() {};

Guide.prototype.isValid = function() {};

Guide.prototype.save = function(path, callback) {};


