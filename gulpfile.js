var gulp = require('gulp');
var $gulp = require('gulp-load-plugins')();
var rollupBabel = require('rollup-plugin-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');


gulp.task('js', function(){
   return gulp.src('src/main.js')
       .pipe($gulp.rollup({
           plugins: [
               rollupBabel({
                   runtimeHelpers: true,
                   exclude: 'node_modules/**'
               })
           ]
       }))
       .on('error', $gulp.notify.onError(function (error) {
           return  error;
       }))
       .pipe(gulp.dest('dist/js/'));
});

gulp.task('less', function () {
   return gulp.src('src/main.less')
       .pipe($gulp.less())
       .on('error', $gulp.notify.onError(function (error) {
           return  error;
       }))
       .pipe(gulp.dest('dist/css'))
});


gulp.task('server', function(){
    return gulp.src('.')
        .pipe($gulp.webserver({
            livereload: true,
            host: "0.0.0.0",
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('build', ['js', 'less']);

gulp.task('default', ['build'] ,function(){
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.less', ['less']);
    gulp.run('server');
});