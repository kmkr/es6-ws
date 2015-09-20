var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');

gulp.task('default', function () {
    return gulp.src('src/es6/**/*.js')
        .pipe(watch('src/es6/**/*.js'))
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});