  var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
sourcemaps = require('gulp-sourcemaps');


gulp.task('default', function(){
  return gulp.src('./src/YBind.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
})