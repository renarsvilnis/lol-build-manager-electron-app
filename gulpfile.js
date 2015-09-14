'use strict';

var fs = require('fs');

var gulp = require('gulp');
var del = require('del');
var mqpacker = require('css-mqpacker');
var autoprefixer = require('autoprefixer-core');
var packager = require('electron-packager');

// autoload node modules that prefixed with 'gulp-'
var $ = require('gulp-load-plugins')({
  scope: ['devDependencies'],
  camelize: true,
  lazy: false
});

var pkg = require('./package.json');

// ########################################
// Variables
// ########################################

// current enviroment
var env = process.env.NODE_ENV || 'development';

var IN_BASE = 'src/';
var OUT_BASE = 'prebuild/';
var OUT_BUILD = 'build/';
// var BOWER = 'bower_components/';
var NODE_MODULES = 'node_modules/';

var IN = {
  CSS: IN_BASE + 'scss/',
  JS: IN_BASE + 'js/',
  IMG: IN_BASE + 'img/',
  FONTS: IN_BASE + 'fonts/',
  HTML: IN_BASE + 'html/'
};

var OUT = {
  CSS: OUT_BASE + 'stylesheets/',
  JS: OUT_BASE + 'javascripts/',
  IMG: OUT_BASE + 'images/',
  FONTS: OUT_BASE + 'fonts/',
  HTML: OUT_BASE + 'html/',
  ICONS: OUT_BASE + 'icons/'
};

// ########################################
// Helpers
// ########################################
var isProduction = function () {
  return env === 'production';
};

var isDevelopment = function () {
  return env === 'development';
};

gulp.task('clean', function (cb) {
  del([OUT_BASE], cb);
});

/**
 * Escape regex expression
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
 * @param  {String} string
 * @return {String}
 */
// var escapeRegExp = function (string) {
//   return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
// };

var checkApiKey = function () {
  if (!process.env.API_KEY) {
    throw new Error('Missing API key');
  }
};

// ########################################
// Electron tasks
// ########################################
gulp.task('electron', function () {
  gulp.start('misc-files', 'node-modules');
});

gulp.task('misc-files', function () {
  return gulp.src([
    './package.json'
  ]).pipe(gulp.dest(OUT_BASE));
});

gulp.task('node-modules', function (callback) {
  /**
   * Array of dependencies that need to be copied, by default it loads all
   * production dependencies
   * Note: its possible to add more modules manualy, by adding the name
   * of the module to the array
   * @type {string[]}
   */
  var dependencies = [
  ];

  // Instead of requiring package.json file, we want to read it each time there
  // is an update to it, instead of watching all node_modules files for
  // changes. Don't trigger if you don't save a installed node module, which
  // would not be happening anyway
  fs.readFile('./package.json', {encoding: 'utf8'}, function (err, pkgJson) {
    if (err) {
      callback(err);
      return;
    }

    // autoload all production dependencies
    if (pkgJson.dependencies) {
      var depList = Object.keys(pkgJson.dependencies);
      depList.map(function (dep) {
        dependencies.push(dep);
      });
    }

    // add globs to the dependencies
    dependencies = dependencies.map(function (dep) {
      return './node_modules/' + dep + '/**/*';
    });

    gulp.src(dependencies, {base: './node_modules/'})
      .pipe($.cached('node-modules'))
      .pipe(gulp.dest(OUT_BASE + 'node_modules/'))
      .on('end', callback);
  });
});

// ####################
// CSS
// ####################
gulp.task('styles', function () {
  var processors = [
    // autoprefix css
    autoprefixer({
      browsers: ['> 5%'],
      cascade: true,
      remove: true
    }),
    // combine identical media queries
    mqpacker({})
  ];

  return gulp.src(IN.CSS + '**/*.scss')
    .pipe($.plumber())
    .pipe($.sass({
      // includePaths: IN.CSS
    }).on('error', $.sass.logError))
    .pipe($.postcss(processors))
    .pipe($.if(isProduction(), $.minifyCss({
      keepSpecialComments: 0,
      processImport: true
    })))
    .pipe(gulp.dest(OUT.CSS));
});

// ####################
// HTML
// ####################
gulp.task('html', function () {
  return gulp.src(IN.HTML + '**/*.html')
    .pipe($.cached('html'))
    .pipe($.if(isProduction(), $.minifyHtml({
      spare: true
    })))
    .pipe(gulp.dest(OUT.HTML));
});

// ####################
// IMAGES
// ####################
gulp.task('images', function () {
  return gulp.src(IN.IMG + '**/*')
    .pipe($.cached('img'))
    .pipe($.if(isProduction(), $.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [
        {cleanupIDs: false}
      ]
    })))
    .pipe(gulp.dest(OUT.IMG));
});

// ####################
// FONTS
// ####################
var fontFiletypes = '**/*.{eot,svg,ttf,woff,woff2}';
gulp.task('fonts', function () {
  return gulp.start('fonts-local', 'fonts-material-icons');
});

gulp.task('fonts-local', function () {
  return gulp.src(IN.FONTS + fontFiletypes)
    .pipe(gulp.dest(OUT.FONTS));
});

gulp.task('fonts-material-icons', function () {
  var inPath = NODE_MODULES + 'material-design-icons/iconfont/' + fontFiletypes;
  return gulp.src(inPath)
    .pipe(gulp.dest(OUT.FONTS));
});

// ####################
// Javacript
// ####################
gulp.task('js', function () {
  return gulp.src(IN.JS + '**/*.{js,jsx}')
    .pipe($.cached('js'))
    .pipe($.plumber())
    .pipe($.babel({
      blacklist: [
        'es6.blockScoping',
        'es6.constants',
        'es6.properties.shorthand',
        'es6.classes',
        'es6.templateLiterals'
      ]
    }))
    .pipe($.preprocess())
    .pipe(gulp.dest(OUT.JS));
});

// ####################
// Main TASKS
// ####################
gulp.task('default', ['clean'], function () {
  // check for the presence of the api key
  checkApiKey();

  gulp.start('styles', 'images', 'fonts', 'js', 'html', 'electron', function () {
    // only launch in development
    if (isDevelopment()) {
      gulp.start('watch', function () {
        console.log('Listening for changes');
      });
    } else {
      console.log('build installation');
    }
  });
});

gulp.task('package', function (callback) {
  // check for the presence of the api key
  checkApiKey();

  // TODO: instead of copying node-odules llok at using 'npm prune'
  // Reference: https://docs.npmjs.com/cli/prune

  var opts = {
    name: pkg.appName,
    dir: OUT_BASE,
    out: OUT_BUILD,
    platform: ['darwin', 'win32'],
    arch: 'x64',
    version: '0.31.2',
    overwrite: true,
    asar: true, // packages the source code within your app into an archive
    protocols: [
      {
        name: pkg.appName,
        schemes: [pkg.name]
      }
    ]
    // TODO: version string
    // version-string
  };

  packager(opts, function (err, appPath) {
    if (err) {}
    callback(null);
  });
});

gulp.task('watch', function () {
  gulp.watch(IN.FONTS + '**/*', ['fonts']);
  gulp.watch(IN.IMG + '**/*', ['images']);
  gulp.watch(IN.JS + '**/*.{js,jsx}', ['js']);
  gulp.watch(IN.CSS + '**/*.scss', ['styles']);
  gulp.watch(IN.HTML + '**/*.html', ['html']);
  gulp.watch('package.json', ['electron']);
});
