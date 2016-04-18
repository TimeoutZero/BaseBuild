'use strict';

/**
 * Basebuild migrate module, to manage deprecated syntax
 */
var MigrateModule = function(options, mergedOptions) {
  'use strict';

  var options       = options || null,
    utilsModule     = require('./utils.js')(options),
    mergedOptions   = mergedOptions || null,
    warnedAbout     = {},
    migrateWarnings = [],
    $               = utilsModule.plugins;


  var migrateMessages = {
    soon      : 'and will be removed soon',
    soonTo    : 'and will be removed soon, use $newValue instead',
    removed   : 'and has been removed',
    removedTo : 'and has been removed, use $newValue instead',
  };


  function setup () {
  }

  function setMergedOptions(mergedOptions){
    mergedOptions = mergedOptions;
  }


  function migrate() {
    migrateGeneralOptions();

    /**
     * migrate.migrateOptionsManager must be a function
     */
    mergedOptions.migrate && mergedOptions.migrate.migrateOptionsManager && migrateModulesOptions(migrateWarnProp);
  }


  function migrateGeneralOptions(){
    migrateWarnProp({
      obj         : options,
      prop        : 'modulesData',
      dotLocation : 'options',
      value       : options.modulesData,
      msg         : getMessage({
        type        : 'soonTo',
        newValue    : 'modules'
      })
    });
  }


  function getMessage (args) {
    args = args || {};
    var message = migrateMessages[args.type];

    for(let key in args){
      message = message.replace('$' + key, $.chalk.red(args[key]) );
    }

    return message;
  }


  function migrateWarn(msg, prop, dotLocation) {
    if ( !warnedAbout[ msg ] ) {
      warnedAbout[ msg ] = true;
      migrateWarnings.push( msg );
      if ( console && console.warn ) {
        console.warn( utilsModule.getBaseBuildName() + $.chalk.yellow( "Migrate warning: property " + $.chalk.red(prop) + " of " + $.chalk.red(dotLocation) + " is deprecated " + msg) );
        if ( mergedOptions.migrate.trace && console.trace ) {
          console.trace();
        }
      }
    }
  }

  function migrateWarnProp( args ) {
    if ( Object.defineProperty ) {
      try {
        Object.defineProperty( args.obj, args.prop, {
          configurable: true,
          enumerable: true,
          get: function() {
            migrateWarn( args.msg, args.prop, args.dotLocation );
            return args.value;
          },
          set: function( newValue ) {
            migrateWarn( args.msg, args.prop, args.dotLocation );
            args.value = newValue;
          }
        });
        return;
      } catch( err ) {}
    }

    obj[ args.prop ] = args.value;
  }


  /**
   * API
   */
  return {
    setMergedOptions        : setMergedOptions,
    setup                   : setup,
    migrate                 : migrate,
    migrateWarn             : migrateWarn,
    migrateWarnProp         : migrateWarnProp,
    getMessage              : getMessage
  }
}


/**
 * Module exports
 */
module.exports = MigrateModule;