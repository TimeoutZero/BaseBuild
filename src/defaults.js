'use strict';


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