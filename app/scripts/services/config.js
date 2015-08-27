'use strict';
/**
 * @file config.js
 * configuration object for app
 * @type Value Service
 * @author Albert Cyberhulk
 * @date 27.08.2014
 */

/**
 * @namespace app.services
 * @class Config
 * Angular Value service for config variables
 * @param {Object} $http
 * @param {Object} $log
 * @return {Object}
 */
 app.services.value('Config', {

   RequestUrls: {
     gridDataUrl: '/api/grid'
   }

 });
