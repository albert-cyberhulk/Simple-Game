'use strict';
/**
 * @file grid.js
 * directive for grid cube
 * @author Albert Stepanyan
 * @date 27.08.2014
 */

/**
 * @namespace app.directives
 * @class Grid
 * directive for controlling Grid
 * @param {Object} $log
 * @param {Object} $compile
 */
app.directives.directive("grid", [
  function() {

  return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'views/grid.html'
  };

}]);
