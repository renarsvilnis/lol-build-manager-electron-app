/**
 * Module that wraps functionality around getting, setting data to cache.
 * Imagine it like a localhost rest
 */
'use strict';

import path from 'path';
import async from 'async';
import filewalker from 'filewalker';
import jsonfile from 'jsonfile';

import db from '../modules/db';
import lolApi from '../modules/lol-api';
import {downloadImage, getLolItemSetPath} from './util';
import {ITEMS_FOLDER, CHAMPIONS_FOLDER} from '../constants/app-constants';

import AppActions from '../actions/app-actions';
import AppStore from '../stores/app-store';

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

  loadBuilds: function(callback) {

    let itemSetPath = getLolItemSetPath(AppStore.getPath());

    async.waterfall([
      // Get builds from fs
      this._getItemSetFilelist.bind(this, itemSetPath),
      // Get guides from db and mathc them with builds from fs
      this._processGuides.bind(this, itemSetPath),
      // Process builds that where not created by
      // League of Legends build manager
      this._processRemainingFileList.bind(this, itemSetPath),
    ], callback);
  },

  _getItemSetFilelist: function(path, next) {
    let filelist = [];

    filewalker(path)
      .on('file', function(filepath) {

        // If isn't json then ifnore the file
        if(!filepath.endsWith('.json'))
          return;

        // Split filepath into parts for depth detection
        let pathParts = filepath.split('/');

        // Check if depth doesn't exceed maximum
        // Standartcase path template for itemset files:
        // '{CHAMPION_KEY}/Recommended/{FILE_NAME}.json'
        if(pathParts.length !== 3)
          return;

        filelist.push(filepath);

      }).on('done', function() {
        next(null, filelist);
      })
      .walk();
  },

  _processGuides: function(itemSetPath, filelist, next) {

    /**
     * Collection of Guides and Builds for outputting
     * Passed thorught the water methods, starting from here
     * @type {Array}
     */
    let items = [];

    // Read guides from databases
    let guides = db.getGuides() || [];

    async.map(guides, function(guide, callback_1) {
      let builds = guide.builds || [];

      async.map(builds, function(build, callback_2) {

        let indexOfBuild = filelist.indexOf(build);

        // If itemset file matched with a guide
        if(indexOfBuild >= 0) {

          let filepath = filelist[indexOfBuild];
          let absFilepath = path.join(itemSetPath, filepath);

          jsonfile.readFile(absFilepath, callback_2);

          // remove used itemset file from filelist
          filelist.splice(indexOfBuild, 1);

        // Guide contains a build file that doesn't exist in fs.
        // Remove the guide
        } else {
          // TODO: remove guide build from db
          // builds.splice(ii, 1);
        }

      }, function(err, builds) {

        // If a guide doesn't contain any builds, thus making it invalid and
        // useless
        if(!builds.length) {
          // TODO: remove guide from db
        } else {
          guide.builds = builds;
          items.push(guide);
          callback_1(null);  
        }
      });
    }, function() {
      next(null, filelist, items);
    });
  },

  _processRemainingFileList: function(itemSetPath, filelist, items, next) {
    // Iterate remaining itemset files for which finding a guide entry from
    // db was impossible a.k.a process builds that where not created by
    // League of Legends build manager
    async.map(filelist, function(filepath, callback) {
      let filepathParts = filepath.split('/');

      let championKey = filepathParts[0];
      let champion = db.getChampionByName(championKey);

      // If itemset file assigned to a invalid champion, ignore it
      if(!champion) {
        callback(new Error('Unknown champion key'), null);
        return;
      }

      // Try to read the itemset file
      let absFilepath = path.join(itemSetPath, filepath);
      jsonfile.readFile(absFilepath, function(err, obj) {
        // If file doesn't contain valid json ignore it
        if(err) {
          callback(err);
          return;
        }

        // assign the build a champion id
        obj.champion = champion.id;

        items.push(obj);
        callback(null);
      });

    }, function() {
      next(null, items);
    });
  },

};

export default Cache;
