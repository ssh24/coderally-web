'use strict';

/* select track spec test. to run this single test: gulp test:build --spec test/specs/select-track-spec.js */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Login = require('../../views/login-view');
var SelectTrack = require('../../views/select-track-view');

describe('Select Track Test -', function() {
  this.timeout(5000);

  var login, selectTrack;
  var options = {
    server: 'Worldwide Practise Server',
    username: 'testuser',
  };
  var tracks = ['Desert', 'Desk', 'Figure8',
    'LowEarthOrbit',
    'Pond',
    'Sky',
    'Space',
    'Water',
  ];

  before(function() {
    login = new Login();
    selectTrack = new SelectTrack();
  });

  // login and check for select track page
  it('Check for select track page after logging in', function() {
    login.doFullLogin(options)
      .then(function() {
        expect(login.getLoggedInUser.call(login)).to
          .eventually.contain(options.username);
        expect(browser.getCurrentUrl()).to.eventually.contain('#/select-track');
      });
  });

  // get all tracks
  it('Get list of tracks', function() {
    for (var i = 0; i < tracks.length; i++) {
      expect(selectTrack.getTrackList.call(selectTrack)).to.
      eventually.contain(tracks[i]);
    }
  });

  // select a track and proceed
  it('Select a track and proceed', function() {
    selectTrack.selectATrack(tracks[1])
      .then(function() {
        expect(selectTrack.getSelectedTrack.call(selectTrack)).to
          .equal(tracks[1]);
      })
      .then(selectTrack.goToSelectVehicle.bind(selectTrack))
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/select-vehicle');
      });
  });
});
