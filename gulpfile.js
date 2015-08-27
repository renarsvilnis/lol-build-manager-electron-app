'use strict';

// ########################################
// Modules
// ########################################
var gulp              = require('gulp'),
    del               = require('del'),
    mqpacker          = require('css-mqpacker'),
    autoprefixer      = require('autoprefixer-core'),
    // wiredep           = require('wiredep').stream,
    packager          = require('electron-packager');

var $ = require('gulp-load-plugins')({
  scope: ['devDependencies'],
  camelize: true,
  lazy: false,
});

var pkg = require('./package.json');

// ########################################
// Variables
// ########################################

// current enviroment
var env = process.env.NODE_ENV || 'development';

var IN_BASE   = 'src/';
var OUT_BASE  = 'prebuild/';
var OUT_BUILD = 'build/';
var BOWER     = 'bower_components/';

var IN = {
  CSS   : IN_BASE + 'scss/',
  JS    : IN_BASE + 'js/',
  IMG   : IN_BASE + 'img/',
  FONTS : IN_BASE + 'fonts/',
  HTML  : IN_BASE + 'html/'
};

var OUT = {
  CSS   : OUT_BASE + 'stylesheets/',
  JS    : OUT_BASE + 'javascripts/',
  IMG   : OUT_BASE + 'images/',
  FONTS : OUT_BASE + 'fonts/',
  HTML  : OUT_BASE + 'html/',
  ICONS : OUT_BASE + 'icons/'
};


// ########################################
// Helpers
// ########################################
var isProduction = function() {
  return env === 'production';
};

var isDevelopment = function() {
  return env === 'development';
};

gulp.task('clean', function(cb) {
  del([OUT_BASE], cb);
});


// ########################################
// Electron tasks
// ########################################
gulp.task('electron', function() {
  gulp.start('misc-files', 'node-modules');
});

gulp.task('misc-files', function() {
  return gulp.src([
    './package.json'
  ]).pipe(gulp.dest(OUT_BASE));
});

gulp.task('node-modules', function() {
  var dependencies = [];

  if(pkg.dependencies) {

    var depList = Object.keys(pkg.dependencies);

    depList.map(function(dep) {
      dependencies.push(dep);
    });
  }

  dependencies = dependencies.map(function(dep) {
    return './node_modules/' + dep + '/**/*';
  })

  return gulp.src(dependencies, {
    base: './node_modules/'
  })
    .pipe(gulp.dest(OUT_BASE + 'node_modules/'));
});

// ####################
// CSS
// ####################
gulp.task('styles', function() {
  var processors = [
    // autoprefix css
    autoprefixer({
      browsers: ['> 5%'],
      cascade: true,
      remove: true,
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
      processImport: true,
    })))
    .pipe(gulp.dest(OUT.CSS));
});

// ####################
// HTML
// ####################
gulp.task('html', function() {
  return gulp.src(IN.HTML + '**/*.html')
    .pipe($.if(isProduction(), $.minifyHtml({
      spare: true
    })))
    .pipe(gulp.dest(OUT.HTML));
});

// ####################
// IMAGES
// ####################
gulp.task('images', function() {
  return gulp.src(IN.IMG + '**/*')
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
gulp.task('fonts', function() {
  var fileTypes = '**/*.{eot,svg,ttf,woff,woff2}';

  return gulp.src(IN.FONTS + fileTypes)
    .pipe(gulp.dest(OUT.FONTS));
});


// ####################
// Javacript
// ####################
gulp.task('js', function() {
  return gulp.src(IN.JS + '**/*.js')
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.preprocess())
    // .on('error', function(e) {
    //   console.error(e);
    //   this.emit('end');
    // })
    .pipe(gulp.dest(OUT.JS));
});

// ####################
// Main TASKS
// ####################
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'images', 'fonts', 'js', 'html', 'electron', function(){

    // only launch in development
    if(isDevelopment()) {
      gulp.start('watch', function() {
        console.log('Listening for changes');
      });  
    } else {
      console.log('build installation');
    }
    
  });
});


gulp.task('package', function(callback) {

  /**
   * Escape regex expression
   * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
   * @param  {String} string
   * @return {String}
   */
  var escapeRegExp = function(string){
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  };

  // var ignoreList = [
  //   '/.git',
  //   '/tasks',
  //   '/sample-build.json'
  // ];

  // // Add development node modules to ignore list
  // if(typeof pkg.devDependencies) {
  //   var devDependencies = Object.keys(pkg.devDependencies);

  //   devDependencies.map(function(devPkg) {
  //     ignoreList.push('/node_modules/' + devPkg);
  //   });  
  // };

  // // Escape regex for all ignored files
  // ignoreList = ignoreList.map(function(ignore) {
  //   return escapeRegExp(ignore)
  // });

  var opts = {
    dir: OUT_BASE,
    // ignore: new RegExp(ignoreList.join('|'), 'i'),
    name: pkg.appName,
    out: OUT_BUILD,
    platform: 'darwin',
    arch: 'x64',
    version: '0.30.4',
    overwrite: true,
    protocols: [
      {
        name: pkg.appName,
        schemes: [pkg.name]
      }
    ]
  };

  packager(opts, function(err, appPath) {
    callback(null);
  });
});

gulp.task('watch', function () {

  // bower.json
  // package.json
  gulp.watch(IN.FONTS + '**/*', ['fonts']);
  gulp.watch(IN.IMG + '**/*', ['images']);
  gulp.watch(IN.JS + '**/*.{js,jsx}', ['js']);
  gulp.watch(IN.CSS + '**/*.scss', ['styles']);
  gulp.watch(IN.HTML + '**/*.html', ['html']);
});
