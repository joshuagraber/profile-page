var gulp = require('gulp');
var sass = require('gulp-sass')(require('node-sass'));
var autoprefixer = require('gulp-autoprefixer');
var cssMinify = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('styles', async function() {
    gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer([
            'last 2 versions',
            'ie >= 9',
            'Android >= 2.3',
            'ChromeAndroid > 20',
            'FirefoxAndroid > 20',
            'iOS >= 8'
            ]))
        .pipe(gulp.dest('css'))
});

gulp.task('minify', async function() {
    gulp.src('css/style.css')
        .pipe(cssMinify())
        .pipe(gulp.dest('build/css'))
});

gulp.task('uglify', async function() {
    gulp.src('javascript/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/javascript'))
})

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', gulp.series('styles'));
    gulp.watch('css/*.css', gulp.series('minify'))
    gulp.watch('javascript/*.js', gulp.series('uglify'));
});