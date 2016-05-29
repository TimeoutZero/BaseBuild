'use strict';

describe('Config Module', function(){
   'use strict';
    /*
     * Global Variables
    */
    let rootPath      = "..";
    let srcPath       = `${rootPath}/src`;
    // let bbNodeModules = "#{rootPath}/node_modules";

    /*
     * Imports
    */
    let defaultOptions = require(`${srcPath}/defaults`)();
    let ConfigModule   = require(`${srcPath}/config.js`);
    const _            = require('lodash');

    const sinon  = require('sinon');
    const chai   = require('chai');
    const assert = chai.assert;
    const expect = chai.expect;

    const commonUserDefaults = {
      deep: {
        string: 'string',
        array : ['item1', 'item2'],
        date  : new Date()
      }
    };


    /*
     * Tests
    */

    describe('New instance', function () {


      describe('which user options is empty and defaults is not', function () {
        let instance = null;

        beforeEach(function () {
          instance = new ConfigModule({}, commonUserDefaults);
        });


        it('Sets user options as empty object', function () {
          assert.isObject(instance.userOptions);
          assert.isTrue( _.isEmpty(instance.userOptions) );
        });

        it('Sets default options up by parameter', function () {
          assert.isObject(instance.defaults);
          assert.isFalse( _.isEmpty(instance.defaults) );
        });

        it('Sets merged options as empty object', function () {
          assert.isObject(instance.finalOptions);
        });


      });



    });


    // describe('Provides a merge to user and default options', function () {
    //    let instance = null;

    //   it('should do what...', function () {
    //       assert.deepPropertyVal(instance, 'defaults.deep.string', commonUserDefaults.deep.string);
    //       assert.deepPropertyVal(instance, 'defaults.deep.array' , commonUserDefaults.deep.array );
    //       assert.deepPropertyVal(instance, 'defaults.deep.date'  , commonUserDefaults.deep.date );
    //   });

    // });



});