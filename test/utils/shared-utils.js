'use strict';
// Utility functions that are shared across views and specs
var EC = protractor.ExpectedConditions;

var Utils = function() {};

Utils.prototype.openView = function(link) {
  return browser.get(link);
};

Utils.prototype.getButtonEnableStatus = function(element) {
  return browser.findElement(element).isEnabled();
};

Utils.prototype.maximizeBrowserWindow = function() {
  return browser.driver.manage().window().maximize();
};

Utils.prototype.clearThenSendKeys = function(elem, keys) {
  return elem.clear()
    .then(function() {
      return elem.sendKeys(keys);
    });
};

Utils.prototype.waitForElement = function(element, timeout) {
  return browser.wait(function() {
    return browser.isElementPresent(element);
  }, timeout);
};

Utils.prototype.waitForElementEnabled = function(element, timeout) {
  return browser.wait(function() {
    return browser.findElement(element).isEnabled();
  }, timeout);
};

Utils.prototype.waitForElementDisplayed = function(element, timeout) {
  return browser.wait(function() {
    return browser.findElement(element).isDisplayed();
  }, timeout);
};

Utils.prototype.waitUntilReady = function(element, timeout) {
  timeout = timeout || 10000;

  return this.waitForElement(element, timeout)
    .then(this.waitForElementDisplayed.bind(this, element, timeout));
};

Utils.prototype.waitForElementClickable = function(e1, timeout) {
  return browser.wait(EC.elementToBeClickable(element(e1)), timeout);
};

module.exports = Utils;
