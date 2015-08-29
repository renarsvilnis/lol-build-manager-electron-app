/**
 * Module that wraps functionality around getting, setting data to cache.
 * Imagine it like a localhost rest
 */
'use strict';

import path from 'path';
import async from 'async';

import db from '../modules/db';
import AppActions from '../actions/app-actions';
import AppStore from '../stores/app-store';
import lolApi from '../modules/lol-api';
import {downloadImage} from './util';

import {ITEMS_FOLDER, CHAMPIONS_FOLDER} from '../constants/app-constants';

let Cache = {
  loadApp: function() {
    AppActions.loadLolVersion();
    AppActions.loadLolRegion();
    AppActions.loadLolPath();
  },

  loadAssets: function() {
    let version = AppStore.getVersion();
    let region = AppStore.getRegion();

    if(version && region) {
      this.loadItems();
      this.loadChampions();
    }
  },

  loadItems: function() {
    let items = db.getItems();

    // if items up-to-date
    if(items && items.version && AppStore.isNewerVersion(items.version) == 0) {
      AppActions.loadItems({items: items.data});

    // download items && images
    } else {

      // get item data
      lolApi.getItems(AppStore.getRegion(), function(err, items) {
        if(err) {
          // TODO: what to do?
          return;
        }

        async.map(items.data, function(item, callback) {
          let filename = item.image.full;

          let url = lolApi.getItemImageUrl(filename);

          // Try to download image
          downloadImage(filename, url, ITEMS_FOLDER, function(err, filepath) {
            item.image = err ? null : filepath;
            callback(null, item);
          });

        }, function(err, results) {
          db.setItems(items);
          AppActions.loadItems({items: items.data});
        });
      });
    }
  },

  loadChampions: function() {
    let champions = db.getChampions();

    // if items up-to-date
    if(champions && champions.version && AppStore.isNewerVersion(champions.version) == 0) {
      AppActions.loadChampions({champions: champions.data});

    // download items && images
    } else {

      // get item data
      lolApi.getChampions(AppStore.getRegion(), function(err, champions) {
        if(err) {
          // TODO: what to do?
          return;
        }

        async.map(champions.data, function(champion, callback) {
          let filename = champion.image.full;

          let url = lolApi.getChampionImageUrl(filename);

          // Try to download image
          downloadImage(filename, url, CHAMPIONS_FOLDER, function(err, filepath) {
            champion.image = err ? null :filepath;
            callback(null, champion);
          });

        }, function(err, results) {
          db.setChampions(champions);
          AppActions.loadChampions({champions: champions.data});
        });
      });
    }
  },


};

export default Cache;
