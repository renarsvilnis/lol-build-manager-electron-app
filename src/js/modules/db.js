/**
 * Module for retriving and storing app cache related stuff
 * NOTE - ONLY WORKS IN RENDERER!
 *
 * References:
 * https://github.com/typicode/lowdb
 * https://github.com/mariocasciaro/object-path
 *
 * Possible alternative to lowdb:
 * https://github.com/typicode/jsop
 */
'use strict';

import path from 'path';
import low from 'lowdb';
import objectPath from 'object-path';

import mgnUtil from 'lol-build-manager-util';
import {CACHE_DIR} from '../constants/app-constants';

const filename = 'cache.json';
const filepath = path.join(CACHE_DIR, filename);

let db = low(filepath, {
  autosave: true,
  async: false // synchronous for now, as we don't have heavy I/O operations
});

let dbMethods = {

  // ########################################
  // GET
  // ########################################

  getLolVersion: () => objectPath.get(db.object, 'db.object.lol.version'),
  getLolRegion:  () => objectPath.get(db.object, 'db.object.lol.region'),
  getLolPath:    () => objectPath.get(db.object, 'db.object.lol.path'),
  getItems:      () => objectPath.get(db.object, 'db.object.items'),
  getChampions:  () => objectPath.get(db.object, 'db.object.champions'),
  getGuides:     () => objectPath.get(db.object, 'db.object.guides'),

  getItemByName: function(name) {

    if(!name)
      return null;
    
    let items = this.getItems();

    if(!items || typeof items.data === 'undefined')
      return null;

    items = items.data;
    name = name.toLowerCase();

    // try to find item by name
    for(let id in items) {
      let item = items[id];

      let itemName = item.name.toLowerCase();

      if(mgnUtil.isSubtringInString(itemName, name))
        return item;
    }

    // if wasn't able to find it, most likely a item with an enchantment
    return this.getEnchantedItemByName(name);
  },

  getEnchantedItemByName: function(name) {
    // Most likely pattern of enchanted items are
    // '<parent_item_name> - <enchantment_name>' 
    let itemParts = name.split(' - ');

    if(itemParts.length !== 2) 
      return null;

    let parentName = itemParts[0].trim(),
        enchantmentName = itemParts[1].trim();

    enchantmentName = enchantmentName.toLowerCase();

    // find the parent element
    let parentItem = dbMethods.getItemByName(parentName);

    if(!parentItem)
      return null;

    let itemsFromParent = this.getItemsBuiltFromParentId(parentItem.id);

    if(!itemsFromParent.length)
      return null;

    // iterate items that where created form parent and try to match it
    // with the name of the enchantment
    for(let i = 0, l = itemsFromParent.length; i < l; i++) {
      let item = itemsFromParent[i];
      let itemName = item.name.toLowerCase();

      if(mgnUtil.isSubtringInString(itemName, enchantmentName))
        return item;
    }

    return null;
  },

  getItemsBuiltFromParentId: function(parentId) {
    // typecast to string
    parentId = parentId + '';

    let items = this.getItems();

    let foundItems = [];

    if(!items || typeof items.data === 'undefined')
      return foundItems;

    items = items.data;

    items.forEach((item) => {
      // if item is built from other items
      
      if(item.from) {
        let parentItemIndex = item.from.indexOf(parentId);

        // if item is built from the given parent id
        if(parentItemIndex >= 0) {
          foundItems.push(item);
        }
      }
    });

    return foundItems;
  },

  getItemById: function(id) {
    let items = thus.getItems();

    if(!items || typeof items.data === 'undefined')
      return null;

    items = items.data;

    for(let key in items) {
      let item = items[key];

      if(item.id == id)
        return item;
    }

    return null;
  },

  getChampionByName: function(name) {

    if(!name)
      return null;

    let champions = this.getChampions();

    if(!champions || typeof champions.data === 'undefined')
      return null;

    champions = champions.data;
    name = name.toLowerCase();

    for(let id in champions) {
      let champion = champions[id];

      let championName = champion.name.toLowerCase();
      let championKey = champion.key.toLowerCase();

      // Depending on name good ideda to try to look for key and name match
      if(mgnUtil.isSubtringInString(championName, name) || mgnUtil.isSubtringInString(championKey, name))
        return champion;
    }

    return null;
  },

  getChampionById: function(id) {
    let champions = this.getChampions();

    if(!champions || typeof champions.data === 'undefined')
      return null;

    champions = champions.data;

    for(let key in champions) {
      let champion = champions[key];

      if(champion.id == id)
        return champion;
    }

    return null;
  },

  getGuideByFile: function(file) {
    let guides = this.getGuides();

    if(!guides || !guides.length)
      return null;

    for(let i = 0, l = guides.length; i < l; i++) {
      let guide = guides[i];
      let builds = guide.builds;

      if(!builds || !builds.length)
        continue;

      for(let ii = 0, ll = builds.length; ii < ll; ii++) {
        let build = builds[ii];

        if(build === file)
          return guide;
      }
    }

    return null;
  },

  // ########################################
  // POST
  // ########################################

  setLolVersion: function(version) {
    objectPath.set(db.object, 'db.object.lol.version', version);
    db.save();
  },

  setLolRegion: function(region) {
    objectPath.set(db.object, 'db.object.lol.region', region);
    db.save();
  },

  setLolPath: function(folderpath) {
    objectPath.set(db.object, 'db.object.lol.path', folderpath);
    db.save();
  },

  setItems: function(items) {
    objectPath.set(db.object, 'db.object.items', items);
    db.save();
  },

  setChampions: function(champions) {
    objectPath.set(db.object, 'db.object.champions', champions);
    db.save();
  },

  // ########################################
  // DELETE
  // ########################################
  reset: function() {
    db.object = {};
    db.save();
  }

};

export default dbMethods;
