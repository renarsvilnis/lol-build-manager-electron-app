/**
 * Block class that represents a single block withing a guide
 */
'use strict';

export default function Item(data = {}) {

  /**
   * ID of the item
   * @type {Number|null}
   */
  this._id = null;

  /**
   * Count of this item
   * @type {Number}
   */
  this._count = 1;

  this.loadFromObject(data);
};

/**
 * Load data from an given object
 * @param {Object}
 */
Item.prototype.loadFromObject = function(data) {
  this.setId(data.id);
  this.setCount(data.count);
};

/**
 * Set type
 * @param {Number}
 */
Item.prototype.setId = function(id) {

  if(!this.isValidId(id))
    return;

  this._id = id;
};

/**
 * Set count
 * @param {Number}
 */
Item.prototype.setCount = function(count) {

  if(!this.isValidCount(count))
    return;

  this._count = count;
};

/**
 * Return a object representation of this item
 * @return {Object}
 */
Item.prototype.toObject = function() {
  return {
    id: this.getId(),
    count: this.getCount()
  };
};

/**
 * Get the id of item
 * @return {Number|null}
 */
Item.prototype.getId = function() {
  return this._id;
};

/**
 * Get count of the item
 * @return {Number}
 */
Item.prototype.getCount = function() {
  return this._count;
};

/**
 * Check if block is valid
 * @return {Boolean}
 */
Item.prototype.isValid = function() {

  let id = this.getId();
  let count = this.getCount();

  return this.isValidId(id) && this.isValidCount(count);
};

/**
 * Check if given id is valid
 * @param  {*}
 * @return {Boolean}
 */
Item.prototype.isValidId = function(id) {
  return id && typeof id === 'number' && !isNan(id);
};

/**
 * Check if given count are valid
 * @param  {*}
 * @return {Boolean}
 */
Item.prototype.isValidCount = function(items) {
  return count
    && typeof count === 'number'
    && !isNaN(count)
    && count > 0;
};