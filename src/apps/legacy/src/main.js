'use strict';

/**
 * Imports
 */
const _              = require('lodash');
const chalk          = require('chalk');
const gutil          = require('gulp-util');
const packageJSON    = require('../package.json');


var basebuildMainScript = function(options, defaults){

  /*
    ==========================
    Imaginations
    ==========================
  */
  console.log('\n\n');
  console.log(' ____                 _             _     _         ' );
  console.log('| __ )  __ _ ___  ___| |__  _   _(_) | __| |       '  );
  console.log('|  _ \\ / _` / __|/ _ | `_ \\| | | | | |/ _` | '      );
  console.log('| |_) | (_| \\__ \\  __/ |_) | |_| | | | (_| |'       );
  console.log('|____/ \\__,_|___/\\___|_.__/ \\__,_|_|_|\\__,_|    ' );
  console.log('                                   '     + chalk.red('' + chalk.green('v' + packageJSON.version)) );
  console.log('\n\n');

  console.log( chalk.bgBlue('This module is under development and it will be available soon ;)') );
  console.log('\n\n');

  /**
   * Config phase
   */
  let configModule   = new require('./config.js')(options, defaults);
  options            = configModule.options;
  defaults           = options.defaults;

  /**
   * Utils
   */
  let bbUtils        = require('./utils.js')(options);
  let baseBuildName  = bbUtils.getBaseBuildName();

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(let key in options.modules){
    let value      = options.modules[key].uses;
    let category   = chalk.green(' external ');
    let useMode    = '';

    !options.modules[key] && (options.modules[key] = {});
    let bbModule = options.modules[key];

    !bbModule.notStart ? (useMode = 'required') : (useMode = 'using');
    bbModule.requireName = value;

    if(defaults.modules[key] && value === defaults.modules[key].defaultValue && !bbModule.isExternal){
      category = chalk.cyan(' built-in ');
    } else {
      bbModule.isDefault  = false;
      bbModule.isExternal = true;
      bbModule.requireName = process.cwd() + "/" + value;
    }

    if(!bbModule.notStart && bbModule.isEnabled  !== false){
      let moduleFunction = require( bbModule.requireName );
      _.isFunction(moduleFunction) && moduleFunction(options);
    }

    !bbModule.notLogOnStart && bbModule.isEnabled  !== false && console.log( chalk.white( baseBuildName ) + useMode + category + chalk.magenta(key) + ' module as ' + chalk.magenta(value) );
  }

  console.log('\n');

};


/*
  ==========================
  Export
  ==========================
*/
module.exports = basebuildMainScript;