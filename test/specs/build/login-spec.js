'use strict';

/* login spec test. to run this single test: gulp test:build --spec test/specs/login-spec.js */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var Login = require('../../views/login-view');
var SelectTrack = require('../../views/select-track-view');
var Forbidden = require('../../views/forbidden-view');
var Utils = require('../../utils/shared-utils');
var config = require('../../config.json');

describe('Account Login Test -', function() {
  this.timeout(10000);

  var login, selectTrack, forbidden, utils;

  before(function() {
    login = new Login();
    selectTrack = new SelectTrack();
    forbidden = new Forbidden();
    utils = new Utils();
  });

  // access the select track page to check forbidden
  it('Access the select track page to check forbidden message', function() {
    var errorMessage = '403 Forbidden';

    utils.openView('/#/select-track')
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually.contain('#/forbidden');
      })
      .then(function() {
        expect(forbidden.getErrorMessage.call(forbidden)).to.eventually
          .contain(errorMessage);
      })
      .then(forbidden.goToLoginPage.bind(forbidden));
  });

  // open the browser to check login page
  it('Open the browser to check login page', function() {
    utils.openView('/')
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually.contain('#/login');
        var x = expect(utils.getButtonEnableStatus.call(utils,
          login.loginBtn)).to.eventually.be.false;
      });
  });

  // get list of all the active servers
  it('Get list of active servers', function() {
    for (var i = 0; i < config.info.servers.length; i++) {
      expect(login.getAllServers.call(login)).to
        .eventually.contain(config.info.servers[i].name);
    }
  });

  // select a server to login against
  it('Select a server', function() {
    expect(login.getSelectedServer.call(login))
      .to.eventually.contain(config.info.servers[0].name)
      .then(login.selectServer.bind(login, config.info.servers[5].name))
      .then(function() {
        expect(login.getSelectedServer.call(login))
          .to.eventually.contain(config.info.servers[5].name);
      });
  });

  // authenticate the user
  it('Authenticate a user', function() {
    expect(login.checkAuthButtonTxt.call(login)).to.eventually
      .equal('Authenticate')
      .then(login.authUser.bind(login, config.login.username))
      .then(function() {
        expect(login.checkAuthButtonTxt.call(login)).to.eventually
          .equal('User successfully authenicated.');
      });
  });

  // complete the sign in and sign out
  it('Complete sign in and sign out', function() {
    login.completeLogin()
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually.contain('#/select-track');
      })
      .then(login.completeLogout.bind(login))
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually.contain('#/login');
      });
  });
});
