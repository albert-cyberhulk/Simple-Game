'use strict';
/**
 * @file grid.js
 * handles Requests to Backend API
 * maps data operation
 * and business logic for colors
 * @author Albert Cyberhulk
 * @date 27.08.2014
 */

/**
 * @namespace app.services
 * @class Grid
 * Angular factory service HTTP requests
 * @param {Object} $http
 * @param {Object} $log
 * @return {Object}
 */
 app.services.factory('Grid', ['$http', '$log', '$q', 'Config', 'Request',
   function($http, $log, $q, Config, Request) {

     return {

       /**
        * @method getDataArray
        * requests remote API
        * returns data
        * @returns {Array}
        */
        getDataArray: function() {
          return Request.internalHttpRequest(Config.RequestUrls.gridDataUrl, 'get');
        }

     };


   }]);
