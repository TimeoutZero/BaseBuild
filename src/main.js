'use strict';

/**
 * Imports
 */
const _              = require('lodash');
const chalk          = require('chalk');
const gutil          = require('gulp-util');
const packageJSON    = require('../package.json');


var basebuildMainScript = function(options){

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
  // var configModule   = require('./config.js')();
  // options            = configModule.setup(options);
  // var defaultOptions = options.defaultOptions;

  /**
   * Utils
   */
  // var baseBuildUtils = require(defaultOptions.modulesData['utils'].uses)(options);
  // var baseBuildName  = baseBuildUtils.getBaseBuildName();

  /*
    ==========================
    Read gulp files
    ==========================
  */
//   for(key in options.modulesData){
//     var value      = options.modulesData[key].uses;
//     var category   = chalk.green(' external ');
//     var useMode    = '';

//     !options.modulesData[key] && (options.modulesData[key] = {});
//     var moduleData = options.modulesData[key];

//     !moduleData.notStart ? (useMode = 'required') : (useMode = 'using');
//     moduleData.requireName = value;

//     if(defaultOptions.modulesData[key] && value === defaultOptions.modulesData[key].defaultValue && !moduleData.isExternal){
//       category = chalk.cyan(' built-in ');
//     } else {
//       moduleData.isDefault  = false;
//       moduleData.isExternal = true;
//       moduleData.requireName = process.cwd() + "/" + value;
//     }

//     if(!moduleData.notStart && moduleData.isEnabled  !== false){
//       var module = require( moduleData.requireName );
//       _.isFunction(module) && module(options);

//     }

//     !moduleData.notLogOnStart && moduleData.isEnabled  !== false && console.log( baseBuildName + useMode + category + chalk.magenta(key) + ' module as ' + chalk.magenta(value) );


//   }

//   console.log('\n');
}


/*
  ==========================
  Export
  ==========================
*/
module.exports = basebuildMainScript;