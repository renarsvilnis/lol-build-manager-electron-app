/**
 * Guide class that represents a single guide
 */
'use strict';

export default function Guide(data) {

  this._url = null;
  this._champion = null;
  this._title = null;
  this._author = null;
  this._updatedAt = null;
  this._createAt = Date.now();
  this._builds = [];
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


