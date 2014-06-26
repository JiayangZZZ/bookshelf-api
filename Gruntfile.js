module.exports = function(grunt) {

  grunt.initConfig({
    compass : { // Target options
      dev : {
        options: {
          sassDir : 'app/public/styles',
          cssDir : 'app/public/styles/build',
          noLineComments : true,
          debugInfo : true
        }
      }
    }
  });

};
