'use strict';

/**
 * Basebuild's migrate module, to manage deprecated syntax
 */
class MigrateModule {

  constructor(mergedOptions, userOptions, defaults){
    $                    = mergedOptions.plugins;
    this.mergedOptions   = mergedOptions || {};
    this.userOptions     = userOptions   || {};
    this.defaults        = defaults      || {};
    this.migrateWarnings = [];
    this.warnedAbout     = {};
    this.migrateMessages = {
      soon      : 'and will be removed soon',
      soonTo    : 'and will be removed soon, use $newValue instead',
      removed   : 'and has been removed',
      removedTo : 'and has been removed, use $newValue instead',
    };
  }



  migrate() {
    this.migrateGeneralOptions();

    /**
     * migrate.manager must be a function
     */
    if(this.mergedOptions.migrate){
      let manager = this.mergedOptions.migrate.optionsManager;
      try {
        manager(this.mergedOptions, this.userOptions, this.defaults);
      } catch (err){
        new manager(this.mergedOptions, this.userOptions, this.defaults);
      }
    }
  }


  migrateGeneralOptions(){
    this.migrateWarnProp({
      obj         : this.mergedOptions,
      prop        : 'modulesData',
      dotLocation : 'options',
      value       : this.mergedOptions.modulesData,
      msg         : getMessage({
        type        : 'soonTo',
        newValue    : 'modules'
      })
    });
  }


  getMessage(args) {
    args        = args || {};
    let message = this.migrateMessages[args.type];

    for(let key in args){
      message = message.replace('$' + key, $.chalk.red(args[key]) );
    }

    return message;
  }


  migrateWarn(msg, prop, dotLocation) {
    if ( !this.warnedAbout[ msg ] ) {
      this.warnedAbout[ msg ] = true;
      this.migrateWarnings.push( msg );
      if ( console && console.warn ) {
        console.warn( utilsModule.getBaseBuildName() + $.chalk.yellow( "Migrate warning: property " + $.chalk.red(prop) + " of " + $.chalk.red(dotLocation) + " is deprecated " + msg) );
        if ( this.mergedOptions.migrate.trace && console.trace ) {
          console.trace();
        }
      }
    }
  }

  migrateWarnProp( args ) {
    if ( Object.defineProperty ) {
      try {
        Object.defineProperty( args.obj, args.prop, {
          configurable: true,
          enumerable: true,
          get: function() {
            this.migrateWarn( args.msg, args.prop, args.dotLocation );
            return args.value;
          },
          set: function( newValue ) {
            this.migrateWarn( args.msg, args.prop, args.dotLocation );
            args.value = newValue;
          }
        });
        return;
      } catch( err ) {}
    }

    // obj[ args.prop ] = args.value;
  }
}


/**
 * Module exports
 */
module.exports = MigrateModule;