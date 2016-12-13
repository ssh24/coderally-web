'use strict';

var gulp = require('gulp');
var fs = require('fs');
var sh = require('shelljs');
var spawn = require('child_process').spawn;
var child;

gulp.task('start:app', function(done) {
  child = spawn('node', ['.']);
  done();
});

gulp.task('update:webdriver-manager', function(done) {
  sh.exec('./node_modules/protractor/bin/webdriver-manager update');
  done();
});

gulp.task('begin:test', function(done) {
  sh.exec('./node_modules/protractor/bin/protractor config.js');
  done();
});

gulp.task('test:build', ['start:app', 'update:webdriver-manager', 'begin:test'],
  function(done) {
    child.kill();
    child.on('close', function(code) {
      done();
    });
  });

gulp.task('default', function(done) {
  console.log('To run suite of build tests, please run `gulp test:build`');
});
