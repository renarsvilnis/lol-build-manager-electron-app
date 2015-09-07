/**
 * Block class that represents a single block within a guide
 */
'use strict';

import Item from 'item';
import {isObject} from '../util';

export function Block(data = {}) {

  /**
   * Name of the block
   * @type {String|null}
   */
  this._type = null;

  /**
   * Array of items for a block
   * @type {Item[]}
   */
  this._items = [];

  this.loadFromObject(data);
};

/**
 * Load data from an given object
 * @param {Object}
 */
Block.prototype.loadFromObject = function(data) {

  if(!isObject(data))
    return;

  this.setType(data.type);
  this.pushItems(data.items);
};

/**
 * Set type
 * @param {string}
 */
Block.prototype.setType = function(type) {

  type = type.trim();

  if(!this.isValidType(type))
    return;

  this._type = type;
};

/**
 * Push items 
 * @param {Object[]|Item[]}
 */
Block.prototype.pushItems = function(items) {

  if(!Array.isArray(items))
    return;

  items.forEach((item) => {
    this.pushItem(item);
  })
};

/**
 * Push item
 * @param {Object|Item}
 */
Block.prototype.pushItem = function(item) {

  // try to create a new Item class instace and check if it is valid
  if(!this.isValidItem(item)) {
    item = new Item(item);

    if(!this.isValidItem(item))
      return;
  }

  this._items.push(item);
};

/**
 * Return a object representation of this block
 * @return {Object}
 */
Block.prototype.toObject = function() {
  return {
    type: this.getType(),
    items: this.getItems()
  };
};

/**
 * Get the type of block
 * @return {string|null}
 */
Block.prototype.getType = function() {
  return this._type;
};

/**
 * Get items of block
 * @return {Object[]}
 */
Block.prototype.getItems = function() {
  let items = this._items;
  let ret = [];

  items.forEach((item) => {
    ret.push(item.toObject());
  });

  return ret;
};

/**
 * Check if block is valid
 * @return {Boolean}
 */
Block.prototype.isValid = function() {
  let type = this.getType();
  return this.isValidType(type) && this.isValidItems();
};

/**
 * Check if given type is valid
 * @param  {*}
 * @return {Boolean}
 */
Block.prototype.isValidType = function(type) {
  return type && typeof type === 'string';
};

/**
 * Check if block items are valid
 * @param {*} [items=this._items] - Defaults to this block items
 * @return {Boolean}
 */
Block.prototype.isValidItems = function(items) {

  if(typeof items === 'undefined')
    items = this._items;

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
Block.prototype.isValidItem = function(item) {
  return item instanceof Item && item.isValid();
};
