/* don't use this file without admin privileges */

'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');

var trackVehicles = [];
var vehicles = [];

var Circuit =
  fs.readFileSync('./game-assets/tracks/circuit/trackInfo/vehicleInfo.json');
var Desert =
  fs.readFileSync('./game-assets/tracks/desert/trackInfo/vehicleInfo.json');
var Desk =
  fs.readFileSync('./game-assets/tracks/desk/trackInfo/vehicleInfo.json');
var Figure8 =
  fs.readFileSync('./game-assets/tracks/figure8/trackInfo/vehicleInfo.json');
var LowEarthOrbit =
  fs.readFileSync
  ('./game-assets/tracks/lowearthorbit/trackInfo/vehicleInfo.json');
var Pond =
  fs.readFileSync('./game-assets/tracks/pond/trackInfo/vehicleInfo.json');
var Sky =
  fs.readFileSync('./game-assets/tracks/sky/trackInfo/vehicleInfo.json');
var Space =
  fs.readFileSync('./game-assets/tracks/space/trackInfo/vehicleInfo.json');
var Water =
  fs.readFileSync('./game-assets/tracks/water/trackInfo/vehicleInfo.json');

module.exports = function(app) {
  var datasource = app.dataSources.db;

  var tracks = [{
    tName: 'Circuit',
    tImage: 'images/tracks/circuit.jpg',
  }, {
    tName: 'Desert',
    tImage: 'images/tracks/desert.jpg',
  }, {
    tName: 'Desk',
    tImage: 'images/tracks/desk.jpg',
  }, {
    tName: 'Figure8',
    tImage: 'images/tracks/figure8.jpg',
  }, {
    tName: 'LowEarthOrbit',
    tImage: 'images/tracks/lowearthorbit.jpg',
  }, {
    tName: 'Pond',
    tImage: 'images/tracks/pond.jpg',
  }, {
    tName: 'Sky',
    tImage: 'images/tracks/sky.jpg',
  }, {
    tName: 'Space',
    tImage: 'images/tracks/space.jpg',
  }, {
    tName: 'Water',
    tImage: 'images/tracks/water.jpg',
  }];

  datasource.automigrate('Track', function(err) {
    if (err) return cb(err);
    var Track = app.models.Track;
    Track.create(tracks);
  });

  var circuitVehicles = JSON.parse(Circuit).vehicles;
  var desertVehicles = JSON.parse(Desert).vehicles;
  var deskVehicles = JSON.parse(Desk).vehicles;
  var figure8Vehicles = JSON.parse(Figure8).vehicles;
  var lowearthorbitVehicles = JSON.parse(LowEarthOrbit).vehicles;
  var pondVehicles = JSON.parse(Pond).vehicles;
  var skyVehicles = JSON.parse(Sky).vehicles;
  var spaceVehicles = JSON.parse(Space).vehicles;
  var waterVehicles = JSON.parse(Water).vehicles;

  trackVehicles.push(circuitVehicles);
  trackVehicles.push(desertVehicles);
  trackVehicles.push(deskVehicles);
  trackVehicles.push(figure8Vehicles);
  trackVehicles.push(lowearthorbitVehicles);
  trackVehicles.push(pondVehicles);
  trackVehicles.push(skyVehicles);
  trackVehicles.push(spaceVehicles);
  trackVehicles.push(waterVehicles);

  for (var i = 0; i < trackVehicles.length; i++) {
    for (var j = 0; j < trackVehicles[i].length; j++) {
      vehicles.push(trackVehicles[i][j]);
    }
  }

  datasource.automigrate('Vehicle', function(err) {
    if (err) return cb(err);
    var Vehicle = app.models.Vehicle;
    Vehicle.create(vehicles);
  });
};
