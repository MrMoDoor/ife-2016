var gulp = require('gulp'),
    gulpImagemin = require('gulp-imagemin');

gulp.task('image', function () {
    gulp.src('img/**')
        .pipe(gulpImagemin())
        .pipe(gulp.dest('images'));
});