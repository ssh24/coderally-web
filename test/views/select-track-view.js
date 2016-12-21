'use strict';

/* select track views file */

function SelecTrack() {
  this.tracks = {};
  this.tracks.allTrackInfo = by.repeater('track in tracks');
  this.tracks.select = by.css('[ng-click="toggleTracks(track)"]');
  this.tracks.continue = by.css('[ng-click="nextSelectTrack()"]');
  this.tracks.selected = '';
}

// open login view
SelecTrack.prototype.openSelectView = function() {
  return browser.get('/#/select-track');
};

// get lists of tracks
SelecTrack.prototype.getTrackList = function() {
  return element.all(this.tracks.allTrackInfo).getText();
};

// select a track
SelecTrack.prototype.selectATrack = function(track) {
  var self = this;

  return element.all(this.tracks.allTrackInfo).getText()
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
SelecTrack.prototype.getSelectedTrack = function() {
  return this.tracks.selected;
};

// continue to select vehicle
SelecTrack.prototype.goToSelectVehicle = function() {
  return element(this.tracks.continue).click();
};

module.exports = SelecTrack;
