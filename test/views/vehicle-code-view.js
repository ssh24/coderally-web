'use strict';

/* vehicle code views file */

var Utils = require('../utils/shared-utils');

function VehicleCode() {
  // utils needed for this module
  this.chosen = {};
  this.chosen.track = by.id('chosen-track');
  this.chosen.vehicle = by.id('chosen-vehicle');

  this.editor = {};
  this.editor.div = by.id('editor');
  this.editor.content = by.css('.ace_content');
  this.editor.textArea = by.css('.ace_text-input');

  this.copy = {};
  this.copy.btn = by.id('copy-vehicle-code');
  this.copy.success = by.id('success-copy');

  this.utils = new Utils();
}

// get selected track informations
VehicleCode.prototype.getSelectedTrackInfo = function() {
  return element(this.chosen.track).getText();
};

// get selected vehicle informations
VehicleCode.prototype.getSelectedVehicleInfo = function() {
  return element(this.chosen.vehicle).getText();
};

// copy vehicle code
VehicleCode.prototype.copyVehicleCode = function() {
  return element(this.copy.btn).click();
};

// get success copy message
VehicleCode.prototype.getSuccessCopyMessage = function() {
  return element(this.copy.success).getText();
};

module.exports = VehicleCode;
