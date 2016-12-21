'use strict';

/* forbidden link views file */

function Forbidden() {
  this.forbidden = {};
  this.forbidden.message = by.id('forbidden');
}

Forbidden.prototype.goToLoginPage = function() {
  return browser.get('/#/login');
};

Forbidden.prototype.getErrorMessage = function() {
  return element(this.forbidden.message).getText();
};

module.exports = Forbidden;
