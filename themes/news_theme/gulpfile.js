'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    cssmin = require('gulp-cssmin'),
    rename = require("gulp-rename"),
    replace = require("gulp-replace"),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync');

var pkg = require('./package.json');

gulp.task('sass', function () {
    gulp.src('./src/sass/styles.scss')
      .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./css'));
    gulp.src('./src/sass/print.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css'));
});

gulp.task('compress', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function () {
    watch('./src/sass/**/*.scss', function () {
        gulp.start('sass');
        browserSync.reload();
    });

    watch('./src/js/**/*.js', function () {
        gulp.start('compress');
        browserSync.reload();
    });
});

gulp.task('build', ['sass', 'compress']);
gulp.task('default', ['sass', 'compress', 'watch']);
