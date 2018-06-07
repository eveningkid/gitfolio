var gulp = require('gulp')
var sass = require('gulp-sass')
var hash = require('gulp-hash')
var concat = require('gulp-concat')
var cleanCSS = require('gulp-clean-css')
var rename = require('gulp-rename');
var replace  =  require('gulp-replace');

var hashedCSS;
gulp.task('sass', function () {
  return gulp.src(
    './src/**/*.scss'
  )
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(concat('all.css'))
  .pipe(hash())
  .pipe(rename(function (path) {
    path.basename += "-min";
    hashedCSS = path.basename + '.css';
  }))
  .pipe(gulp.dest('./build/static/css'))
})

gulp.task('htmlreplace', ['sass'], function () {
  return gulp.src('./build/index.html')
  .pipe(replace('css.css', '/static/css/'+hashedCSS))
  .pipe(gulp.dest('./build/'));
});