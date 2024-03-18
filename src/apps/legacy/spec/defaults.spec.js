'use strict';

describe('Default Options', function(){
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
    // const _            = require('lodash');

    const sinon  = require('sinon');
    const chai   = require('chai');
    const assert = chai.assert;
    const expect = chai.expect;


    /*
     * Tests
    */
    describe('Provides a default error handler... ', function(){

      beforeEach(function(){
        sinon.stub(defaultOptions.plugins.util, 'log');
        sinon.stub(defaultOptions.plugins.util, 'beep');
      });

      afterEach(function(){
        defaultOptions.plugins.util.log.restore();
        defaultOptions.plugins.util.beep.restore();
      });


      it('Returns a function when invoked to be a callback on tasks errors', function(){
        assert.isFunction(defaultOptions.errorHandler('TitleX'));
      });

      it('Uses a custom title to track the error', function(){
        let cleanCustomTitle  = 'MycleanCustomTitle';
        let redCustomTitle    = '\u001b[31m[' + cleanCustomTitle + ']\u001b[39m';
        let errorMessage      = 'ErrorXPTO';


        let errorHandler = defaultOptions.errorHandler(cleanCustomTitle);
        errorHandler.apply(this, [errorMessage]);

        assert.isTrue(defaultOptions.plugins.util.log.calledOnce);
        assert.isTrue( defaultOptions.plugins.util.log.calledWith(redCustomTitle, errorMessage) );
      });


      it('Beeps the terminal to alert the developer', function(){

        let errorHandler = defaultOptions.errorHandler('whatever');
        errorHandler.apply(this, ['error']);
        assert.isTrue(defaultOptions.plugins.util.beep.called);

      });


      it('Emits end of the stream when invoked', function(){
        this.emit = function(){};
        sinon.stub(this, 'emit');

        let errorHandler = defaultOptions.errorHandler('whatever');
        errorHandler.apply(this, ['error']);

        assert.isTrue(this.emit.calledWith('end'));
        this.emit.reset();
      });

    });

    describe('Provides node plugins to use as option...', function () {

      it('Being an object as API', function (){
        expect(defaultOptions.plugins).to.be.a('object')
      });

      it('Contains all gulp plugins in basebuild (gulp-* pattern loaded for gulp-load-plugins)',function(done){
        let gulpPlugins = [
          "util"
        ];

        gulpPlugins.forEach(function(plugin) {
          expect(defaultOptions.plugins).to.have.property(plugin);
        });

        done();
      });


      it('Contains all third-party plugins loaded in basebuild', function(done){
        let thirdPartyPlugins = [
          "lodash",
          "chalk"
        ];

        thirdPartyPlugins.forEach(function(plugin) {
          expect(defaultOptions.plugins).to.have.property(plugin);
        });

        done()
      });
    });
});