/**
 * Block class that represents a single block withing a guide
 */
'use strict';

export default function Block(data = {}) {

  /**
   * Name of the block
   * @type {String|null}
   */
  this._type = null;

  /**
   * Array of items for a block
   * @type {Object[]}
   */
  this._items = [];

  this.loadFromObject(data);
};

/**
 * Load data from an given object
 * @param {Object}
 */
Build.prototype.loadFromObject = function(data) {
  this.setType(data.type);
  this.pushItems(data.items);
};

/**
 * Set type
 * @param {String}
 */
Build.prototype.setType = function(type) {

  if(!this.isValidType(type))
    return;

  this._type = type.trim();
};

/**
 * Push items 
 * @param {Object[]}
 */
Build.prototype.pushItems = function(items) {

  if(!this.isValidItems(items))
    return;

  items.forEach((item) => {
    this.pushItem(item);
  })
};

/**
 * Push item
 * @param {Object}
 */
Build.prototype.pushItem = function(item) {

};

/**
 * Return a object representation of this block
 * @return {Object}
 */
Build.prototype.toObject = function() {
  return {
    type: this.getType(),
    items: this.getItems()
  };
};

/**
 * Get the type of block
 * @return {String|null}
 */
Build.prototype.getType = function() {
  return this._type;
};

/**
 * Get items of block
 * @return {Object[]}
 */
Build.prototype.getItems = function() {
  return this._items;
};

/**
 * Check if block is valid
 * @return {Boolean}
 */
Build.prototype.isValid = function() {

  let type = this.getType();
  let items = this.getItems();

  return this.isValidType(type) && this.isValidItems(items);
};

/**
 * Check if given type is valid
 * @param  {*}
 * @return {Boolean}
 */
Build.prototype.isValidType = function(type) {
  return type && typeof type === 'string';
};

/**
 * Check if given items are valid
 * @param  {*}
 * @return {Boolean}
 */
Build.prototype.isValidItems = function(items) {

  if(!Array.isArray(items) || !items.length)
    return false;

  for(let i = 0, l = items.length; i < l; i++) {
    let item = items[i];

    if(!this.isValidItem(item))
      return false;
  }

  return true;
};

/**
 * Check if given item is valid
 * @param  {*}
 * @return {Boolean}
 */
Build.prototype.isValidItem = function(item) {

  return true;
};
