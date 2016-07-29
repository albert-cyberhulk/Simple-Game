'use strict';
/**
* @file loader.js
* preloads assets with createJS
* @type Value Service
* @author Albert Cyberhulk
* @date 27.08.2014
*/

/**
* @namespace app.services
* @class Loader
* Angular Value service for preloading
* @param {Object} $http
* @param {Object} $log
* @return {Object}
*/
angular.module('app.services')
.service("Loader", function() {
  var manifest = [
    {src: "spritesheet_grant.png", id: "grant"},
    {src: "sky.png", id: "sky"},
    {src: "ground.png", id: "ground"},
    {src: "hill1.png", id: "hill"},
    {src: "hill2.png", id: "hill2"}
  ],
  loader = new createjs.LoadQueue(true);

  this.getResult = function (asset) {
    return loader.getResult(asset);
  };
  this.getLoader = function () {
    return loader;
  };
  this.loadAssets = function () {
    loader.loadManifest(manifest, true, "/images/");
  };
});
