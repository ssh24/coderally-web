'use strict';

function Login() {
  // utils needed for this module
  this.userInput = by.css('[ng-model="userName.text"]');

  this.authBtn = {};
  this.authBtn.click = by.css('[ng-click="authBtn()"]');

  this.selectedServer = {};
  this.selectedServer.chosen = by.css('[ng-model="selectedOption"]');
  this.selectedServer.all = by
    .css('[ng-options="item as item.name for item in servers"]');

  this.loginBtn = by.css('[ng-click="loginBtn()"]');
}

// open login view
Login.prototype.openLoginView = function() {
  return browser.get('/');
};

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

module.exports = Login;
