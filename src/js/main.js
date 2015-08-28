'use strict';

import path from 'path';
import app from 'app';
import BrowserWindow from 'browser-window';
import CrashReporter from 'crash-reporter';
import ipc from 'ipc';

import urlBuffer from './modules/url-buffer';

let mainWindow = null;

// Report crashes to our server.
CrashReporter.start();

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  createMainWindow();
});

app.on('open-url', function(ev, url) {
  urlBuffer.push(url);
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