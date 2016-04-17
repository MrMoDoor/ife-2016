<<<<<<< HEAD
var gulp = require('gulp'),
    gulpImagemin = require('gulp-imagemin');

gulp.task('image', function () {
    gulp.src('img/**')
        .pipe(gulpImagemin())
        .pipe(gulp.dest('images'));
=======
var gulp = require('gulp'),
    gulpImagemin = require('gulp-imagemin');

gulp.task('image', function () {
    gulp.src('img/**')
        .pipe(gulpImagemin())
        .pipe(gulp.dest('images'));
>>>>>>> 467e6f6c220461185c8617ae4e0e8fef15fff009
});