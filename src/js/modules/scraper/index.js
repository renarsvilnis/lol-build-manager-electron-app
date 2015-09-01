/**
 * Node module that scrapes a given url for a League of Legends
 * champion build guide data
 */
'use strict';

import request from 'request';
import url from 'url';
import normalizeUrl from 'normalize-url';
import {getScrapeModule} from 'lol-build-manager-util';

// scrape modules
import modMobaFire from './sites/mobafire';

const scrapeModules = {
  mobafire: modMobaFire
};

/**
 * Validate scraped data object if it requires the minimum amount of data
 * @param  {Object} json
 * @return {Boolean}
 */
let isValidBuild = function(json) {

  if(!json.champion||
     !json.title ||
     !json.url ||
     !json.builds ||
     !json.builds.length)
    return false;

  // check if valid builds
  for(let i = 0, l = json.builds.length; i < l; i++) {
    let build = json.builds[i];

    if(!build.title ||
       !build.blocks ||
       !build.blocks.length)
      return false;

    // check if build has correct blocks
    for(let ii = 0, ll = build.blocks.length; ii < ll; ii++) {
      let block = build.blocks[ii];

      if(!block.type ||
         !block.items ||
         !block.items.length)
        return false;

      // check if items are correct
      for(let iii = 0, lll = block.items.length; iii < lll; iii++) {
        let item = block.items[iii];

        if(!item.id || !item.count)
          return false;
      }
    }
  }

  return true;
};

export default function(scrapeUrl, callback) {

  scrapeUrl = normalizeUrl(scrapeUrl);

  let scrapeModuleName = getScrapeModule(scrapeUrl);

  if(!scrapeModuleName) {
    callback(new Error('Unsupported url'));
    return;
  }

  let scrapeModule = scrapeModules[scrapeModuleName];

  if(!scrapeModule) {
    callback(new Error('Unknown scrape module'), null);
    return
  };

  // scrape the website
  scrapeModule(scrapeUrl, function(err, json) {

    // check if scraped valid data
    if(isValidBuild(json)) {
      callback(null, json);
    } else {
      callback(new Error('Unable to get build, please check the url'));
    }

  });
};