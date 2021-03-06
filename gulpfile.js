/**
* Gulp tasks.
*/
const gulp = require('gulp'),
    addsrc = require('gulp-add-src'),
    concat = require('gulp-concat'),
    del = require('del'),
    jsonConcat = require('gulp-json-concat'),
    packageInfo = require('./package.json'),
    path = require('path'),
    runSequence = require('run-sequence');


const dir = {
    dist: 'dist',
    src: 'src'
};

gulp.task('combine-coins', function () {
  return gulp.src(dir.src + '/coins/**/*.json')
    .pipe(jsonConcat('coins.json',function(data){
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest(dir.dist));
});

gulp.task('copy-images', function () {
  return gulp.src(dir.src + '/images/**/*', {base: dir.src})
    .pipe(gulp.dest(dir.dist));
});

// Cleanup task
gulp.task('clean', function(cb) {
  return del([dir.dist], {force: true}, cb);
});

// Build Task
gulp.task('build', function(cb) {
    runSequence(
        'clean',
        ['combine-coins', 'copy-images'],
        cb
    );
});

// Default task
gulp.task('default', function(cb) {
  runSequence('build', cb);
});
