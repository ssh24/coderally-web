'use strict';

/* login views file */

var Utils = require('../utils/shared-utils');

function Login() {
  // utils needed for this module
  this.userInput = by.css('[ng-model="userName.text"]');

  this.loggedInUser = by.id('userInfo');

  this.authBtn = {};
  this.authBtn.main = by.id('authButton');
  this.authBtn.click = by.css('[ng-click="auth()"]');

  this.selectedServer = {};
  this.selectedServer.chosen = by.css('[ng-model="selectedOption"]');
  this.selectedServer.all = by
    .css('[ng-options="item as item.name for item in servers"]');

  this.loginBtn = by.css('[ng-click="login()"]');
  this.logoutBtn = by.css('[ng-click="logout()"]');

  this.utils = new Utils();
  this.timeout = 1000;
}

// enter username
Login.prototype.authUser = function(username) {
  return element(this.userInput).sendKeys(username)
    .then(element(this.authBtn.click).click);
};

// check auth button text
Login.prototype.checkAuthButtonTxt = function() {
  return element(this.authBtn.click).getText();
};

// select a different server
Login.prototype.selectServer = function(server) {
  return element(by.cssContainingText('option', server)).click();
};

// get a server
Login.prototype.getSelectedServer = function() {
  return element(this.selectedServer.chosen).getText();
};

// get all servers
Login.prototype.getAllServers = function() {
  return element(this.selectedServer.all).getText();
};

// complete log in
Login.prototype.completeLogin = function() {
  return element(this.loginBtn).click();
};

// complete log out
Login.prototype.completeLogout = function() {
  return element(this.logoutBtn).click();
};

Login.prototype.getLoggedInUser = function() {
  return element(this.loggedInUser).getText();
};

// do a full login
Login.prototype.doFullLogin = function(options) {
  var server = options.server;
  var username = options.username;

  return this.utils.openView('/')
    .then(this.selectServer.bind(this, server))
    .then(this.authUser.bind(this, username))
    .then(this.utils.waitForElementEnabled.bind(this.utils, this.loginBtn,
      this.timeout))
    .then(this.completeLogin.bind(this));
};

module.exports = Login;
