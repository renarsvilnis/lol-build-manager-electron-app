/**
 * Node module that scrapes a given url for a League of Legends
 * champion build guide data
 */
'use strict';

import request from 'request';
// import config  from 'lol-build-manager-config'; 
// import util    from 'lol-build-manager-util';

import moduleMobafire from './sites/mobafire';

export default function(url, callback) {
  // 1. check if supported url
  // 2. pass to correct scrape module
  // 3. call callback with scraped data - hopefully

  request(url, {
    timeout: 2000
  }, function(err, res, html) {
    if (!err && res.statusCode === 200) {
      console.log(moduleMobafire(html));
    } else {
      callback(new Error('Issue getting request'), null);
    }
  });

  
};

// [
//   {
//     id: 'probuilds',
//     domain: 'probuilds.net',
//     urlSchemas: [
//       {
//         schema: 'probuilds.net/guide/',
//         module: 'probuilds'
//       }
//     ]
//   }
// ]

// http://www.mobafire.com/league-of-legends/build/viktor-mid-a-basic-guide-to-the-machine-herald-428841