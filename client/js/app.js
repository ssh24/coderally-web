'use strict';

angular
  .module('app', [
    'ui.router',
    'lbServices',
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
    $urlRouterProvider) {
    $stateProvider
      .state('all-tracks', {
        url: '/all-tracks',
        templateUrl: 'views/all-tracks.html',
        controller: 'AllTracksController',
      });
    $urlRouterProvider.otherwise('all-tracks');
  }]);
