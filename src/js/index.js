var ipc = require('ipc');
ipc.on('url', function(ev, ev2, url) {
  console.log(ev, ev2, url);
});