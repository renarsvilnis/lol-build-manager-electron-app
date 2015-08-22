var path = require('path');

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

// Report crashes to our server.
require('crash-reporter').start();

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
var RESERVED_SUFFFIXES = ['SR', 'TT', 'DM', 'ASC', 'PG'];

var util = require('lol-build-manager-util');

var ipc = require('ipc');

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

var createWindow = function() {

  if(mainWindow)
    return;

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/../html/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};