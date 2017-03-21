var gulp = require('gulp')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var cleanCSS = require('gulp-clean-css')

gulp.task('sass', function () {
  return gulp.src(
    './src/**/*.scss'
  )
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(concat('all.min.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('./build/static/css'))
})
