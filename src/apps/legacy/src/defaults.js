'use strict';

var nodePlugins = require('gulp-load-plugins')({
  pattern: [
    '*',
    '!gulp',
    '!protractor'
  ]
});

var _ = nodePlugins.lodash;


module.exports = function(){

  /*
    ==========================
    Basic Options
    ==========================
  */
  var defaultOptions = {}

  /*
    ==========================
    Stream Errors
    ==========================
  */
  defaultOptions.errorHandler = function(title) {
    return function(err) {
      nodePlugins.util.log(nodePlugins.util.colors.red('[' + title + ']'), err.toString());
      nodePlugins.util.beep();
      _.isFunction(this.emit) && this.emit('end');
    };
  };


  defaultOptions.plugins = nodePlugins;
  defaultOptions.modules = {};


  // Common initial properties
  // for(key in defaultOptions.modules){
  //   defaultOptions.modulesData[key].isEnabled = true;
  //   defaultOptions.modulesData[key].uses = defaultOptions.modulesData[key].defaultValue;
  // }


  // Migrate properties
  defaultOptions.migrate = {
    active : true,
    trace: false
  };


  return defaultOptions;

}