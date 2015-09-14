'use strict';

import path from 'path';
import app from 'app';
import BrowserWindow from 'browser-window';
import CrashReporter from 'crash-reporter';

import UrlBuffer from './modules/url-buffer';
import pkg from '../package.json';

let mainWindow = null;

// Report crashes to our server.
CrashReporter.start({
  productName: pkg.appName,
  companyName: pkg.author.name,
  submitUrl: '', // TODO
  autoSubmit: true
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  app.quit();
});

app.on('ready', function () {
  createMainWindow();
});

// Listen to custom protocole incoming messages
app.on('open-url', function (ev, url) {
  UrlBuffer.push(url);
});

let createMainWindow = function () {
  if (mainWindow) {
    return;
  }

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
  let mainWindowPath = path.join('file://', __dirname, '/../html/index.html');
  console.log(mainWindowPath);
  mainWindow.loadUrl(mainWindowPath);
  mainWindow.focus();
  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};
