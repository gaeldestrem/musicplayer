'use strict'

# Declare app level module which depends on filters, and services
App = angular.module('app', [
  'ngCookies'
  'ngResource'
  'ngRoute'
  'app.controllers'
  'app.directives'
  'app.filters'
  'app.services'
  'partials'
  'audioPlayer'
])

App.config([
  '$routeProvider'
  '$locationProvider'

($routeProvider, $locationProvider, config) ->

  $routeProvider

    .when('/test', {templateUrl: '/partials/test.html'})
    .when('/zik', {templateUrl: '/partials/zik.html'})

    # Catch all
    .otherwise({redirectTo: '/zik'})

  # Without server side support html5 must be disabled.
  $locationProvider.html5Mode(false)
])
