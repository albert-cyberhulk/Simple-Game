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
app.directives.directive("grid", ['$log', '$compile',
  function($log, $compile) {
  return {
      restrict: "AE",
      replace: true,
      compile: function(cElem, cAttrs) {
        //linking function
        return function(lscope, lElem, lAttrs) {
          lscope.$watch("gridData" , function(n,o){
            lElem.html(JSON.stringify(lscope.gridData));
            $compile(lElem.contents())(lscope);
          });
        }
      }
  }
}]);
