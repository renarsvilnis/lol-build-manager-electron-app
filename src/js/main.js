'use strict';

import path from 'path';
import app from 'app';
import BrowserWindow from 'browser-window';
import ipc from 'ipc';

let mainWindow = null;

// Report crashes to our server.
import CrashReporter from 'crash-reporter';
CrashReporter.start();

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

// Reference: https://developer.riotgames.com/docs/item-sets
let RESERVED_SUFFFIXES = ['SR', 'TT', 'DM', 'ASC', 'PG'];

app.on('ready', function() {
  createMainWindow();
});

app.on('open-url', function(ev, url) {

  if(!mainWindow) {
    app.on('ready', function() {
      createMainWindow();  

      mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.webContents.send('url', util.decodeUrlData(url));
      });

    });
  }

});

let createMainWindow = function() {

  if(mainWindow)
    return;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    show: true,
    frame: true,
    resizable: false
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/../html/index.html');

  // Open the devtools.
  mainWindow.openDevTools();

  mainWindow.focus();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

};