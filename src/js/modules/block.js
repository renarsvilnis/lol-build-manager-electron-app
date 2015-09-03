/**
 * Block class that represents a single block withing a guide
 */
'use strict';

export default function Block(data) {
  this._type = null; // === title
  this._items = [];
};

Build.prototype.loadFromObject = function(data) {};
Build.prototype.setType = function(type) {};
Build.prototype.pushItems = function(items) {};
Build.prototype.pushItem = function(item) {};

Build.prototype.toObject = function() {};
Build.prototype.getTitle = function() {};
Build.prototype.getItems = function() {};

Build.prototype.isValid = function() {};
