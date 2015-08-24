import ipc from 'ipc';

import Router from './router';


import remote from 'remote';
let db = remote.require('./db');
console.log(db.getGameVersion());

Router.run(document.body);

ipc.on('url', function(ev, ev2, url) {
  console.log(ev, ev2, url);
});

ipc.send('db.getGameVersion');
ipc.once('db.getGameVersion.reply', function(ver) {
  console.log('Version:', ver);
});

// document.addEventListener('DOMContentLoaded', function() {
// });