'use strict';
/**
 * @file app.js
 * main bootstrap file og the application
 * defines namespaces and modules
 * configures providers for further processing
 * @author Albert Stepanyan
 * @date 16.06.2014
 */

/**
 * @namespace app
 * main namespace of the application
 */
var app = app || {};

/**
 * @namespace app.module
 * main module namespace of the app
 */
app.module = app.module || {};

/**
 * @namespace app.services
 * @class AppServices
 * services module of the app
 */
angular.module('app.services', []);

/**
 * @namespace app.controllers
 * @class AppControllers
 * controllers module of the app
 */
angular.module('app.controllers', []);

/**
 * @namespace app.directives
 * @class AppDirectives
 * directives module of the app
 */
angular.module('app.directives', []);

/**
 * @class App
 * declaring main module of the application
 * dependencies:
 * ngRoute, ngMock, AppServices, AppControllers, AppDirectives
 */
app.module = angular.module('App', [
    'ngRoute',
    'ngMockE2E',
    'app.services',
    'app.controllers',
    'app.directives'
  ])
  .config(function ($routeProvider) {
    //configuring application routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
 });
