'use strict';

/* select track views file */

var Login = require('../views/login-view');
var Utils = require('../utils/shared-utils');

function SelectTrack() {
  // utils needed for this module
  this.tracks = {};
  this.tracks.allTrackInfo = by.repeater('track in tracks');
  this.tracks.select = by.css('[ng-click="toggleTracks(track)"]');
  this.tracks.continue = by.css('[ng-click="nextSelectTrack()"]');
  this.tracks.selected = '';

  this.login = new Login();
  this.utils = new Utils();
}

// get lists of tracks
SelectTrack.prototype.getTrackList = function() {
  return element.all(this.tracks.allTrackInfo).getText();
};

// select a track
SelectTrack.prototype.selectATrack = function(track) {
  var self = this;

  return this.getTrackList()
    .then(function(txt) {
      for (var i = 0; i < txt.length; i++) {
        if (txt[i].indexOf(track) > -1) {
          self.tracks.selected = txt[i];
          return element.all(self.tracks.select).get(i).click();
        }
      }
    });
};

// get selected track
SelectTrack.prototype.getSelectedTrack = function() {
  return this.tracks.selected;
};

// continue to select vehicle
SelectTrack.prototype.goToSelectVehicle = function() {
  return element(this.tracks.continue).click();
};

// do a full select track
SelectTrack.prototype.doFullSelectTrack = function(options) {
  var track = options.track.name;

  return this.login.doFullLogin(options)
    .then(this.selectATrack.bind(this, track))
    .then(this.goToSelectVehicle.bind(this));
};

module.exports = SelectTrack;
