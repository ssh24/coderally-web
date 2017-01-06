'use strict';

/* select track spec test. to run this single test: gulp test:build --spec test/specs/select-vehicle-spec.js */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Login = require('../../views/login-view');
var SelectTrack = require('../../views/select-track-view');
var SelectVehicle = require('../../views/select-vehicle-view');
var config = require('../../config');
var Utils = require('../../utils/shared-utils');

describe('Select Vehicle Test -', function() {
  this.timeout(10000);

  var login, selectTrack, selectVehicle, utils;

  before(function() {
    login = new Login();
    selectTrack = new SelectTrack();
    selectVehicle = new SelectVehicle();
    utils = new Utils();
    utils.maximizeBrowserWindow();
  });

  // login and check for select vehicle page and logout
  it('Check for select vehicle page after logging in', function() {
    login.doFullLogin(config.login)
      .then(selectTrack.doFullSelectTrack.bind(selectTrack, config.login.track))
      .then(function() {
        expect(login.getLoggedInUser.call(login)).to
          .eventually.contain(config.login.username);
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/select-vehicle');
      })
      .then(login.completeLogout.bind(login))
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/login');
      });
  });

  // login and proceed to select vehicle page
  it('Login and proceed to select vehicle page', function() {
    login.doFullLogin(config.login)
      .then(selectTrack.doFullSelectTrack.bind(selectTrack, config.login.track))
      .then(function() {
        expect(login.getLoggedInUser.call(login)).to
          .eventually.contain(config.login.username);
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/select-vehicle');
        expect(selectVehicle.getChosenTrack.call(selectVehicle)).to.eventually
          .contain(config.login.track.name);
        var x = expect(utils.getButtonEnableStatus
            .call(utils, selectVehicle.vehicles.back)).to.eventually
          .be.true;
        var y = expect(utils.getButtonEnableStatus.call(utils,
          selectVehicle.vehicles.continue)).to.eventually.be.false;
      });
  });

  // get all vehicles
  it('Get list of vehicles', function() {
    for (var i = 0; i < config.info.tracks[1].vehicles.length; i++) {
      expect(selectVehicle.getVehicleList.call(selectVehicle)).to.
      eventually.contain(config.info.tracks[1].vehicles[i].name);
    }
  });

  // select a vehicle and go back
  it('Select a vehicle and go back',
    function() {
      selectVehicle.selectAVehicle(config.info.tracks[1].vehicles[3].name)
        .then(function() {
          expect(selectVehicle.getSelectedVehicle.call(selectVehicle)).to
            .equal(config.info.tracks[1].vehicles[3].name);
          var x = expect(utils.getButtonEnableStatus
              .call(utils, selectVehicle.vehicles.back)).to.eventually
            .be.true;
          var y = expect(utils.getButtonEnableStatus.call(utils,
            selectVehicle.vehicles.continue)).to.eventually.be.true;
        })
        .then(selectVehicle.goToSelectTrack.bind(selectVehicle))
        .then(function() {
          expect(browser.getCurrentUrl()).to.eventually
            .contain('#/select-track');
          var x = expect(utils.getButtonEnableStatus.call(utils,
            selectTrack.tracks.continue)).to.eventually.be.false;
        })
        .then(selectTrack.selectATrack.bind(selectTrack,
          config.login.track.name))
        .then(selectTrack.goToSelectVehicle.bind(selectTrack));
    });

  // select a vehicle and proceed
  it('Select a vehicle, proceed to modify code parameters and logout',
    function() {
      selectVehicle.selectAVehicle(config.info.tracks[1].vehicles[3].name)
        .then(function() {
          expect(selectVehicle.getSelectedVehicle.call(selectVehicle)).to
            .equal(config.info.tracks[1].vehicles[3].name);
        })
        .then(selectVehicle.goToVehicleCode.bind(selectVehicle))
        .then(function() {
          expect(browser.getCurrentUrl()).to.eventually
            .contain('#/vehicle-code');
        })
        .then(login.completeLogout.bind(login))
        .then(function() {
          expect(browser.getCurrentUrl()).to.eventually
            .contain('#/login');
        });
    });
});
