module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('_public/package.json'),
    nodewebkit: {
      options: {
        version: "0.8.3",
        build_dir: './dist',
        // specifiy what to build
        mac: false,
        win: false,
        linux32: false,
        linux64: true
      },
      src: './_public/**/*'
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');

  grunt.registerTask('default', ['nodewebkit']);
};
