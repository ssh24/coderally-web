'use strict';

/* vehicle code spec test. to run this single test: gulp test:build --spec test/specs/vehicle-code-spec.js */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Login = require('../../views/login-view');
var SelectTrack = require('../../views/select-track-view');
var SelectVehicle = require('../../views/select-vehicle-view');
var VehicleCode = require('../../views/vehicle-code-view');
var config = require('../../config');
var Utils = require('../../utils/shared-utils');

describe('Vehicle Code Test -', function() {
  this.timeout(10000);

  var login, selectTrack, selectVehicle, vehicleCode, utils;

  var info = {
    'name': 'buggy_orange',
    'acceleration': '100',
    'weight': '100',
    'armor': '500',
    'traction': '100',
    'turning': '100',
  };

  before(function() {
    login = new Login();
    selectTrack = new SelectTrack();
    selectVehicle = new SelectVehicle();
    vehicleCode = new VehicleCode();
    utils = new Utils();
    utils.maximizeBrowserWindow();
  });

  // login and check for vehicle code page and logout
  it('Login, check for vehicle code page and logout', function() {
    login.doFullLogin(config.login)
      .then(selectTrack.doFullSelectTrack.bind(selectTrack, config.login.track))
      .then(selectVehicle.doFullSelectVehicle.bind(selectVehicle,
        config.login.track.vehicles[3]))
      .then(function() {
        expect(login.getLoggedInUser.call(login)).to
          .eventually.contain(config.login.username);
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/vehicle-code');
      })
      .then(login.completeLogout.bind(login))
      .then(function() {
        expect(browser.getCurrentUrl()).to.eventually
          .contain('#/login');
      });
  });

  // get selected race informations
  it('Get selected race information', function() {
    login.doFullLogin(config.login)
      .then(selectTrack.doFullSelectTrack.bind(selectTrack, config.login.track))
      .then(selectVehicle.doFullSelectVehicle.bind(selectVehicle,
        config.login.track.vehicles[3]))
      .then(function() {
        expect(vehicleCode.getSelectedTrackInfo.call(vehicleCode)).to.eventually
          .equal(config.login.track.name);
        expect(vehicleCode.getSelectedVehicleInfo.call(vehicleCode)).to
          .eventually.equal(config.login.track.vehicles[3].name);
      });
  });

  // copy vehicle code
  it('Copy vehicle code', function() {
    vehicleCode.copyVehicleCode()
      .then(function() {
        expect(vehicleCode.getSuccessCopyMessage.call(vehicleCode)).to
          .eventually.equal('Successfully copied to clipboard');
      });
  });
});
