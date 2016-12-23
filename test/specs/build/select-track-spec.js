'use strict';

/* select track spec test. to run this single test: gulp test:build --spec test/specs/select-track-spec.js */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Login = require('../../views/login-view');
var SelectTrack = require('../../views/select-track-view');
var SelectVehicle = require('../../views/select-vehicle-view');
var config = require('../../config');
var Utils = require('../../utils/shared-utils');

describe('Select Track Test -', function() {
  this.timeout(10000);

  var login, selectTrack, selectVehicle, utils;

  before(function() {
    login = new Login();
    selectTrack = new SelectTrack();
    selectVehicle = new SelectVehicle();
    utils = new Utils();
    utils.maximizeBrowserWindow();
  });

  // login and check for select track page and logout
  it('Login, check for select track page and logout', function() {
    login.doFullLogin(config.login)
      .then(function() {
        expect(login.getLoggedInUser.call(login)).to
          .eventually.contain(config.login.username);
        expect(browser.getCurrentUrl()).to.eventually.contain('#/select-track');
      })
      .then(login.completeLogout.bind(login))
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/login');
      });
  });

  // login and proceed to select track page
  it('Login and proceed to select track page', function() {
    login.doFullLogin(config.login)
      .then(function() {
        expect(login.getLoggedInUser.call(login)).to
          .eventually.contain(config.login.username);
        expect(browser.getCurrentUrl()).to.eventually.contain('#/select-track');
        var x = expect(utils.getButtonEnableStatus.call(utils,
          selectTrack.tracks.continue)).to.eventually.be.false;
      });
  });

  // get all tracks
  it('Get list of tracks', function() {
    for (var i = 0; i < config.info.tracks.length; i++) {
      expect(selectTrack.getTrackList.call(selectTrack)).to.
      eventually.contain(config.info.tracks[i].name);
    }
  });

  // select a track and proceed
  it('Select a track, proceed to select vehicle page and logout', function() {
    selectTrack.selectATrack(config.info.tracks[1].name)
      .then(function() {
        expect(selectTrack.getSelectedTrack.call(selectTrack)).to
          .equal(config.info.tracks[1].name);
        var x = expect(utils.getButtonEnableStatus.call(utils,
          selectTrack.tracks.continue)).to.eventually.be.true;
      })
      .then(selectTrack.goToSelectVehicle.bind(selectTrack))
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/select-vehicle');
        var x = expect(utils.getButtonEnableStatus
            .call(utils, selectVehicle.vehicles.back)).to.eventually
          .be.true;
        var y = expect(utils.getButtonEnableStatus.call(utils,
          selectVehicle.vehicles.continue)).to.eventually.be.false;
      })
      .then(login.completeLogout.bind(login))
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/login');
      });
  });
});
