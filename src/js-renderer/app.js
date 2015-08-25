import ipc from 'ipc';
import remote from 'remote';

import Router from './router';

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