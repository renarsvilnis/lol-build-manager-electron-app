import path from 'path';
import app from 'app';
import BrowserWindow from 'browser-window';
import ipc from 'ipc';

let db = require('./db.js');

let mainWindow = null;

// Report crashes to our server.
import CrashReporter from 'crash-reporter';
CrashReporter.start();

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // For this app commented out because we want the app to close
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform != 'darwin') {
    // app.quit();
  // }

  app.quit();
});


// detect network
// progress bar for first installation - http://electron.atom.io/docs/v0.30.0/tutorial/desktop-environment-integration/

// Reference: https://developer.riotgames.com/docs/item-sets
let RESERVED_SUFFFIXES = ['SR', 'TT', 'DM', 'ASC', 'PG'];

app.on('ready', function() {
  createWindow();
});

app.on('open-url', function(ev, url) {

  if(!mainWindow) {
    app.on('ready', function() {
      createWindow();  

      mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.webContents.send('url', util.decodeUrlData(url));
      });

    });
  }

});

let createWindow = function() {

  if(mainWindow)
    return;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    // title
    show: true,
    frame: true
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/../html/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  mainWindow.focus();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};


/**
 * IPC methods for database module from renderer
 */

ipc.on('db.getLolVersion', function(ev) {
  ev.sender.send('db.getLolVersion.reply', db.getLolVersion());
});

ipc.on('db.getLolRegion', function(ev) {
  ev.sender.send('db.getLolRegion.reply', db.getLolRegion());
});