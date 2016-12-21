'use strict';

/* select track spec test. to run this single test: gulp test:build --spec test/specs/select-track-spec.js */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Login = require('../views/login-view');

describe('Select Track Test -', function() {
  this.timeout(5000);

  var login, selectTrack;
  var options = {
    server: 'Worldwide Practise Server',
    username: 'testuser',
  };

  before(function() {
    login = new Login();
  });

  // login and check for select track page
  it('Check for select track page', function() {
    login.doFullLogin(options)
      .then(function() {
        expect(login.getLoggedInUser.call(login)).to
          .eventually.contain(options.username);
        expect(browser.getCurrentUrl()).to.eventually.contain('#/select-track');
      });
  });
});
