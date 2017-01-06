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

  before(function() {
    login = new Login();
    selectTrack = new SelectTrack();
    selectVehicle = new SelectVehicle();
    vehicleCode = new VehicleCode();
    utils = new Utils();
    utils.maximizeBrowserWindow();
  });

  // login and check for vehicle code page and logout
  it('Check for vehicle code page after logging in', function() {
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
});
