'use strict';

/* select vehicle views file */

function SelectVehicle() {
  // utils needed for this module
  this.vehicles = {};
  this.vehicles.allVehicleInfo = by.repeater('vehicle in vehicles');
  this.vehicles.select = by.css('[ng-click="toggleVehicles(vehicle)"]');
  this.vehicles.continue = by.css('[ng-click="nextSelectVehicle()"]');
  this.vehicles.back = by.css('[ng-click="previousSelectVehicle()"]');
  this.vehicles.selected = '';

  this.chosenTrack = by.id('chosen-track');
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
SelectVehicle.prototype.goToModifyCode = function() {
  return element(this.vehicles.continue).click();
};

// do a full select vehicle
SelectVehicle.prototype.doFullSelectVehicle = function(options) {
  var track = options.track.name;
  var vehicle = options.track.vehicles[3].name;

  return this.login.doFullLogin(options)
    .then(this.selectATrack.bind(this, track))
    .then(this.selectAVehicle.bind(this, vehicle))
    .then(this.goToModifyCode.bind(this));
};

module.exports = SelectVehicle;
