var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    browserSync = require("browser-sync")

// 处理css 
/*
gulp.task('styles', function() {
    return gulp.src('app/SASS/style.scss')
        .pipe(sass({ style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/DIST/CSS'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('app/dist/CSS'))
        .pipe(notify({ message: 'Style task complete' }));
});
*/

gulp.task('styles' ,function() {
    
    return sass('app/SASS/*.scss', {
            style: "compress"
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/DIST/CSS'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/dist/CSS'));
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app"
        }
    });
    gulp.watch("./app/**/*.*").on('change', browserSync.reload);
    gulp.watch(['dist/**']).on('change', livereload.changed);
});