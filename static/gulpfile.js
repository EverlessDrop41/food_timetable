var gulp = require('gulp');
var sass    = require('gulp-sass');
var cssmin  = require('gulp-cssmin');
var streamify = require('gulp-streamify');
var minify = require('gulp-minify');
var browserify = require('browserify');
var vst = require('vinyl-source-stream');
var vueify = require('vueify');
var plumber = require('gulp-plumber');
var rename  = require('gulp-rename');

var paths = {
  sass: 'sass/**/*.scss',
  css_dir: 'dist/css/',
  css: 'dist/css/app.css',
  js_src_watch: ["./src/**/*.js","./src/**/*.vue", "./main.js"],
  js_src: "./main.js",
  js_dest: "./dist/js/"
}

gulp.task('browserify', function() {
  var bundleStream = browserify(paths.js_src).transform(vueify).bundle()

  bundleStream
    .pipe(plumber())
    .pipe(vst(paths.js_src))
    .pipe(streamify(minify({
        ext:{
          src:'-debug.js',
          min:'.js'
        }
      })))
    .pipe(gulp.dest(paths.js_dest))
})

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.css_dir))
});

gulp.task('mincss', function () {
  return gulp.src(paths.css)
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.css_dir));
});

gulp.task('watch', ['default'],function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.css, ['mincss']);
  gulp.watch(paths.js_src_watch, ['browserify']);
});

gulp.task('default', ['sass', 'mincss', 'browserify']);
