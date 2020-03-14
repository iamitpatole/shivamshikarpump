'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cachebust = require('gulp-cache-bust');
var del = require('del');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var log = require('fancy-log');
var changed = require('gulp-changed');
var replace = require('replace-in-file');


var isProdBuild = true;
var js_vendor_src = [
  '../js/jquery.magnific-popup.js',
  '../js/jquery-1.11.0.min.js',
  '../js/myscript.js',
  '../js/responsive-nav.js',
];

var css_vendor_src = [
  './assets/vendor/sufee-admin/css/normalize.css',
  './assets/vendor/sufee-admin/css/bootstrap.min.css',
  './assets/vendor/sufee-admin/css/font-awesome.min.css',
  './assets/vendor/sufee-admin/css/themify-icons.css',
  './assets/vendor/sufee-admin/css/cs-skin-elastic.css',
  './assets/vendor/sufee-admin/scss/style.css',
];

var font_src = [
  './assets/vendor/sufee-admin/fonts/*',
];

function handleError(level, error) {
  log(error.message);
}

function onError(error) {
  handleError.call(this, 'error', error);
}


gulp.task('clean', function() {
  return del([
    'dist/**/*', '../static/js/**/'
  ], {
    force: true
  });
});

gulp.task('minify:vendorjs', [], function() {

  if (isProdBuild) {
    return gulp.src(js_vendor_src)
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));
  }

  return gulp.src(js_vendor_src)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    //.pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify:vendorcss', [
  'clean',
], function() {

  if (isProdBuild) {
    return gulp.src(css_vendor_src)
      .pipe(concat('vendor.css'))
      .pipe(minifyCss())
      .pipe(gulp.dest('./dist/assets'));
  }

  return gulp.src(css_vendor_src)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.css'))
    //.pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('minify:sass', [
  'clean',
  'minify:vendorcss'
], function() {

  if (isProdBuild) {
    return gulp.src('./assets/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCss())
      .pipe(gulp.dest('./dist/assets'));
  }

  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy:fonts', [
  'clean'
], function() {
  return gulp.src(font_src)
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copy:images', [
  'clean',
], function() {
  return gulp.src(['./assets/images/**/*'])
    .pipe(gulp.dest('dist/images'));
});

gulp.task('cachebust', [
  'clean',
  'minify:sass',
  'minify:sitejs'
],
  function() {
    replace.sync({
      files: jsp_site_src,
      from: /v=[0-9]+/g,
      to: 'v=' + new Date().getTime(),
    });
  });

gulp.task('copy:dist', [
  'clean',
  'minify:sass',
  'copy:fonts',
  'copy:images',
  'cachebust',
], function() {
  return gulp.src('./dist/**/*')
    .pipe(gulp.dest('../static/js'));
});

gulp.task('default', [
  'clean',
  'minify:sass',
  'copy:fonts',
  'copy:images',
  'cachebust',
  'copy:dist'
], function() {});

