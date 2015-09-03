/**
 * Build class that represents a single build
 */
'use strict';

export default function Build(data) {

  this._title = null;
  this._filename = null;
  this._blocks = [];
};

Build.prototype.loadFromFile = function();
Build.prototype.loadFromObject = function(data) {};
Build.prototype.setTitle = function(title) {};
Build.prototype.setFilename = function(author) {};
Build.prototype.pushBlocks = function(blocks) {};
Build.prototype.pushBlock = function(block) {};

Build.prototype.toObject = function() {};
Build.prototype.getTitle = function() {};
Build.prototype.getFilename = function() {};
Build.prototype.getBlocks = function() {};

Build.prototype.isValid = function() {};


Build.prototype.save = function(path, callback) {};

