
/*
  ==========================
  Imports
  ==========================
*/
const gutil = require('gulp-util');

/*
  ==========================
  options
  ==========================
*/
var options = {
  modulesData: {
    server: {
      isEnabled: false
    }
  }
}


/*
  ==========================
  Env
  ==========================
*/
var basebuildMainFile = '../src/main.js';
if(gutil.env.prod){
  options.modulesData.gulp.uses  = 'gulp';
  options.modulesData.karma.uses = 'karma';
  basebuildMainFile              = 'basebuild-angular';
}


/*
  ==========================
  Read gulp files
  ==========================
*/
require(basebuildMainFile)(options);