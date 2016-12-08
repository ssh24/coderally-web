'use strict';

angular
  .module('app')
  .controller('AllTracksController', ['$scope', 'Track', 'Vehicle',
    function($scope, Track, Vehicle) {
      $scope.vehicles = Vehicle.find({
        filter: {
          where: {
            trackId: 1,
          },
        },
      });
    },
  ]);
