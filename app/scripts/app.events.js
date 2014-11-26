// Angular module
// Central point for registering angular root events

/* global angular */
'use strict';

angular.module('app.events', [])
  .run(['$log', '$rootScope', function ($log, $rootScope) {

    // Registration examples.
    // This events are triggered by the ui.router module
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
      $log.warn('$stateNotFound', {
        event: event,
        unfoundState: unfoundState,
        fromState: fromState,
        fromParams: fromParams
      });
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      $log.warn('$stateChangeError', {
        event: event,
        toState: toState,
        toParams: toParams,
        fromState: fromState,
        fromParams: fromParams,
        error: error
      });
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.warn('$stateChangeStart', {
        event: event,
        toState: toState,
        toParams: toParams,
        fromState: fromState,
        fromParams: fromParams
      });
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      $log.warn('$stateChangeSuccess', {
        event: event,
        toState: toState,
        toParams: toParams,
        fromState: fromState,
        fromParams: fromParams
      });
    });
  }])
;
