// Angular module
// Central point for applicaton configuration

/* global angular */
'use strict';

angular.module('app.config', [])

  // Add your constants and values configurations here
  .value('APP_SETTINGS', {
    name: 'YOUR_APPNAME',
    version: '0.0.0'
  })


  // Enable logging
  .config(['$compileProvider', '$logProvider', function ($compileProvider, $logProvider) {
    $compileProvider.debugInfoEnabled(false);
    $logProvider.debugEnabled(false);
    // @if DEBUG
    $compileProvider.debugInfoEnabled(true);
    $logProvider.debugEnabled(true);
    // @endif
  }])

  // Configure app to use html5 mode for locations
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    // @if DEBUG
    $locationProvider.html5Mode(false).hashPrefix('');
    // @endif
  }])

  .run(['$log', '$rootScope', function ($log, $rootScope) {

    // Registration example.
    // This events is triggered by the ui.router module
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
      $log.warn('$stateNotFound', {
        event: event,
        unfoundState: unfoundState,
        fromState: fromState,
        fromParams: fromParams
      });
    });

  }])
;
