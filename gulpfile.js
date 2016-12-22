'use strict';

var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var sh = require('shelljs');
var spawn = require('child_process').spawn;
var argv = require('yargs').argv;
var child;

gulp.task('start:app', function(done) {
  child = spawn('node', ['.']);
  done();
});

gulp.task('update:webdriver-manager', function(done) {
  sh.exec('./node_modules/protractor/bin/webdriver-manager update');
  done();
});

gulp.task('test:build', ['start:app', 'update:webdriver-manager'],
  function(done) {
    if (argv.spec)
      sh.exec('./node_modules/protractor/bin/protractor config.js --specs ' +
        argv.spec);
    else {
      var files = fs.readdirSync(path.resolve(__dirname, 'test/specs/build'));
      var specs = '';
      for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf('-spec.js') > -1)
          specs = specs + 'test/specs/build/' + files[i] + ',';
      }
      sh.exec('./node_modules/protractor/bin/protractor config.js --specs ' +
        specs.substring(0, specs.length - 1));
    }
    child.kill();
    child.on('close', function(code) {
      done();
    });
  });

gulp.task('test:e2e', ['start:app', 'update:webdriver-manager'],
  function(done) {
    sh.exec('./node_modules/protractor/bin/protractor config.js --specs ' +
      'test/specs/e2e/e2e-spec.js');
    child.kill();
    child.on('close', function(code) {
      done();
    });
  });

gulp.task('default', function(done) {
  console.log('To run a full e2e test, please run: ' +
    '`./node_modules/gulp/bin/gulp.js test:e2e`');
  console.log('To run suite of build tests, please run: ' +
    '`./node_modules/gulp/bin/gulp.js test:build`');
});
