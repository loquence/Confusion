'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
   var files = [
      './*.html',
      './css/*.css',
      './img/*.{png,jpg,gif}',
      './js/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "./"
      }
   });

});

// Default task
gulp.task('default', gulp.series('browser-sync', 'sass:watch'));

gulp.task('clean', function(){
   return del(['dist']) 
});

gulp.task('copyfonts', function(){
   gulp.src('./node_modules/font-awesom/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function() {
    return gulp.src('img/*.{png,jpg,gif}').pipe(imagemin({ optimizationLevel: 3, progressive: true})).pipe(gulp.dest('dist/img'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts','imagemin')));