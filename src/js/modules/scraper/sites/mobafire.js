import cheerio from 'cheerio';
import objectAssign from 'object-assign';
import chrono from 'chrono-node';
import request from 'request';

import db from '../../db';
import {GUIDE_TEMPLATE} from '../../../constants/app-constants';
import {removeNonNumbericCharacters} from '../../util';

const DOMAIN = '//www.mobafire.com';

let findGuideTitle = function($, parent) {
  return parent.find('.guide-main-title').text();
};

let findGuideAuthor = function($, parent) {
  let profileEl = parent.find('a');

  let profileUrl = profileEl.attr('href') || '';
  profileUrl = profileUrl ? (DOMAIN + profileEl) : '';

  return {
    name: profileEl.text(),
    url: profileUrl
  };
};

let findUpdateAt = function($, parent) {
  let authorInfoEl = parent.find('> .author-info');
  let dateContainerEl = authorInfoEl.children().last();

  // Remove the a tag, wierd but first need to empty the contents
  // of the tag
  dateContainerEl.find('a').text('').remove();

  // TODO: tinker more for a better result
  let updatedAt = chrono.parseDate(dateContainerEl.text().trim());
  return updatedAt ? updatedAt.getTime() : null;
};

let findChampion = function($, parent) {
  let buildTitleEl = parent.find('.build-title');

  // User can define a custom title for the block as a h2 tag
  // else champion name is withing h2 tag
  // otherwise it gets placed within a h3 tag
  let h2 = buildTitleEl.find('> h2');
  let h3 = buildTitleEl.find('> h3');

  // Placeholder text within build title
  // Defined by template "<CHAMPION_NAME> BUILD"
  // Champion anme gets extracted from string
  let buildText;
  const REMOVE_PATTERN = ' BUILD';

  if(!h3.length || !h3.text().length) {
    buildText = h2.text();
  } else {
    buildText = h3.text();
  }

  buildText.trim();

  // Using substring as the patern is on the end of file
  let championName = buildText.substring(0, REMOVE_PATTERN.length + 1);

  let champion = db.getChampionByName(championName);

  return champion ? champion.id : null;
};

let findItems = function($, parent) {

  let blocks = [];

  let itemWraps = parent.find('.item-wrap');

  // iterate item blocks
  itemWraps.each(function() {
    let itemWrap = $(this);

    // block title
    let title = itemWrap.find('> h2').text().trim() || '';
    let items = [];

    // iterate each block item
    itemWrap.find('.main-items').each(function() {
      let item = $(this);

      // item name
      let itemName = item.find('.item-title').text().trim();

      // item count
      // if has count greater then 1, it gets shown as 'x<COUNT>'
      // example 'x2'
      let itemCount = 1;

      let itemCountEl = item.find('.item-count');
      if(itemCountEl.length) {
        let countString= itemCountEl.text();
        itemCount = parseInt(removeNonNumbericCharacters(countString), 10);
      }

      let itemObj = db.getItemByName(itemName);

      if(itemObj) {
        items.push({
          id: itemObj.id,
          count: itemCount
        });  
      } else {
        console.log('item not found', itemName);
      }
    });


    blocks.push({
      type: title,
      items
    });
  });

  return blocks;
};

let findBuildTitle = function($, parent) {
  let buildTitleEl = parent.find('.build-title');

  // User can define a custom title for the block as a h2 tag
  // else champion name is withing h2 tag
  // otherwise it gets placed within a h3 tag
  let h2 = buildTitleEl.find('> h2');
  let h3 = buildTitleEl.find('> h3');

  let buildTitle = '';

  if(h3.length && h3.text().length) {
    buildTitle = h2.text();
  }

  return buildTitle.trim();
};

let findBuild = function($, parent) {
  return {
    title: findBuildTitle($, parent),
    blocks: findItems($, parent)
  };
};

let parse = function(url, html) {
  let $ = cheerio.load(html);

  // Create new tempalte object of response
  let json = objectAssign({}, GUIDE_TEMPLATE);

  json.url = url;

  let guideDetails = $('.guide-details');

  json.title = findGuideTitle($, guideDetails);
  json.author = findGuideAuthor($, guideDetails);

  json.updatedAt = findUpdateAt($, guideDetails);
  json.addedAt = Date.now();

  // All build containers
  let buildBlocksEl = $('.build-container .build-box');

  // Only use the the first block to get the champion
  json.champion = findChampion($, buildBlocksEl.first());

  buildBlocksEl.each(function() {
    let build = findBuild($, $(this));
    json.builds.push(build);
  });

  // Clean the values after getting them
  // as for most values it removes the issue of calling trim on null
  // NOTE: some values trim before!
  json.title = json.title.trim();
  json.author.name = json.author.name.trim();
  json.author.url = json.author.url.trim();

  return json;
}

export default function(url, callback) {
  request(url, {
    timeout: 10000
  }, function(err, res, html) {
    if (!err && res.statusCode === 200) {
      callback(null, parse(url, html));
    } else {
      callback(new Error('Issue getting request'), null);
    }
  });
};