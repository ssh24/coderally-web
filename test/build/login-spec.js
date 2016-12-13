'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Login = require('../views/login');

describe('Account Login Test -', function() {
  var login;
  var user = {
    username: 'testuser',
  };
  var servers = [{
    name: 'North American Contest Server',
  }, {
    name: 'Brazilian Contest Server',
  }, {
    name: 'Indian Contest Server',
  }, {
    name: 'Chinese Regional Server',
  }, {
    name: 'European Regional Server',
  }, {
    name: 'Worldwide Practise Server',
  }, {
    name: 'Use Custom Server',
  }];

  before(function() {
    login = new Login();
  });

  // open the browser to check login page
  it('Open the browser to check login page', function() {
    login.openLoginView()
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually.contain('#/login');
      });
  });

  // get list of all the active servers
  it('Get list of active servers', function() {
    for (var i = 0; i < servers.length; i++) {
      expect(login.getAllServers.call(login)).to
        .eventually.contain(servers[i].name);
    }
  });

  // select a server to login against
  it('Select a server', function() {
    expect(login.getSelectedServer.call(login))
      .to.eventually.contain(servers[0].name)
      .then(login.selectServer.bind(login, servers[5].name))
      .then(function() {
        expect(login.getSelectedServer.call(login))
          .to.eventually.contain(servers[5].name);
      });
  });

  // authenticate the user
  it('Authenticate a user', function() {
    expect(login.checkAuthButtonTxt.call(login)).to.eventually
      .equal('Authenticate')
      .then(login.authUser.bind(login, user.username))
      .then(function() {
        expect(login.checkAuthButtonTxt.call(login)).to.eventually
          .equal('User successfully authenicated.');
      });
  });

  // complete the sign in
  it('Complete signing in', function() {
    login.completeLogin()
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually.contain('#/select-track');
      });
  });
});
