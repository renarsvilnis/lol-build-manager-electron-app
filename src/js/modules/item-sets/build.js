/**
 * Build class that represents a single build
 */
'use strict';

import Block from 'block';
import {isObject} from '../util';

export function Build(data = {}) {

  /**
   * Title of build
   * @type {String|null}
   */
  this._title = null;

  /**
   * Filename of saved file for the build
   * @type {String|null}
   */
  this._filename = null;

  /**
   * Array of item blocks for build
   * @type {Block[]}
   */
  this._blocks = [];

  this.loadFromObject(data);
};

// TODO: create method
Build.prototype.loadFromFile = function(filepath) {};

/**
 * Load data from a given object
 * @param {Object}
 */
Build.prototype.loadFromObject = function(data) {
  if(!isObject(data))
    return;

  this.setTitle(data.title);
  this.setFilename(data.filename);
  this.pushBlocks(data.blocks);
};

/**
 * Set title of build
 * @param {string}
 */
Build.prototype.setTitle = function(title) {

  title = title.trim();

  if(!this.isValidTitle(title))
    return;

  this._title = title;
};

// TODO: create method
Build.prototype.setFilename = function(filename) {};

/**
 * Push blocks into build
 * @param  {Object[]|Block[]}
 */
Build.prototype.pushBlocks = function(blocks) {
  if(!Array.isArray(blocks))
    return;

  blocks.forEach((block) => {
    this.pushItem(block);
  });
};

/**
 * Push a block
 * @param  {Object|Block}
 */
Build.prototype.pushBlock = function(block) {

  // try to create a new Block class instance and check if it is valid
  if(!this.isValidBlock(block)) {
    block = new Block(block);

    if(!this.isValidBlock(block))
      return;
  }

  this._blocks.push(block);
};

/**
 * Return a object representation of this build
 * @return {Object}
 */
Build.prototype.toObject = function() {
  return {
    title: this.getTitle(),
    filename: this.getFilename(),
    blocks: this.getBlocks()
  };
};

/**
 * Get the title of the build
 * @return {string|null}
 */
Build.prototype.getTitle = function() {
  return this._title;
};

/**
 * Get the filename of the build
 * @return {string|null}
 */
Build.prototype.getFilename = function() {
  return this._filename;
};

/**
 * Get the item blocks of the build
 * @return {Object[]}
 */
Build.prototype.getBlocks = function() {
  let blocks = this._blocks;
  let ret = [];

  blocks.forEach((block) => {
    ret.push(block.toObject());
  });

  return ret;
};

/**
 * Check if given build is valid
 * @return {Boolean}
 */
Build.prototype.isValid = function() {
  let title = this.getTitle();
  let filename = this.getFilename();

  return this.isValidTitle(title)
    && this.isValidFileName(filename)
    && this.isValidBlocks();
};

Build.prototype.isValidTitle = function(title) {
  return title && typeof type === 'string';
};

// TODO: create method
Build.prototype.isValidFileName = function() {
  return true;
};

/**
 * Check if build blocks ar valid 
 * @param  {*} [blocks=this._blocks]
 * @return {Boolean}
 */
Build.prototype.isValidBlocks = function(blocks) {

  if(typeof blocks === 'undefined')
    blocks = this._blocks;

  if(!Array.isArray(blocks) || !blocks.length)
    return false;

  for(let i = 0, l = blocks.length; i < l; i++) {
    let block = blocks[i];

    if(!this.isValidBlock(block))
      return false;
  }

  return true;
};

/**
 * Check if given block is valid
 * @param  {*}
 * @return {Boolean}
 */
Build.prototype.isValidBlock = function(block) {
  return block instanceof Block && block.isValid();
};

// TODO: create method
Build.prototype.save = function(path, callback) {};

