'use strict';

/* select vehicle views file */

var Login = require('../views/login-view');
var SelectTrack = require('../views/select-track-view');

function SelectVehicle() {
  // utils needed for this module
  this.vehicles = {};
  this.vehicles.allVehicleInfo = by.repeater('vehicle in vehicles');
  this.vehicles.select = by.css('[ng-click="toggleVehicles(vehicle)"]');
  this.vehicles.continue = by.css('[ng-click="nextSelectVehicle()"]');
  this.vehicles.back = by.css('[ng-click="previousSelectVehicle()"]');
  this.vehicles.selected = '';

  this.chosenTrack = by.id('chosen-track');

  this.login = new Login();
  this.selectTrack = new SelectTrack();
}

// get the chosen track
SelectVehicle.prototype.getChosenTrack = function() {
  return element(this.chosenTrack).getText();
};

// get lists of vehicles
SelectVehicle.prototype.getVehicleList = function() {
  return element.all(this.vehicles.allVehicleInfo).getText();
};

// select a vehicle
SelectVehicle.prototype.selectAVehicle = function(vehicle) {
  var self = this;

  return this.getVehicleList()
    .then(function(txt) {
      for (var i = 0; i < txt.length; i++) {
        if (txt[i].indexOf(vehicle) > -1) {
          self.vehicles.selected = txt[i];
          return element.all(self.vehicles.select).get(i).click();
        }
      }
    });
};

// get selected track
SelectVehicle.prototype.getSelectedVehicle = function() {
  return this.vehicles.selected;
};

// go back to select track page
SelectVehicle.prototype.goToSelectTrack = function() {
  return element(this.vehicles.back).click();
};

// continue to modify code
SelectVehicle.prototype.goToVehicleCode = function() {
  return element(this.vehicles.continue).click();
};

// do a full select vehicle
SelectVehicle.prototype.doFullSelectVehicle = function(options) {
  var vehicle = options.name;

  return this.selectAVehicle(vehicle)
    .then(this.goToVehicleCode.bind(this));
};

module.exports = SelectVehicle;
