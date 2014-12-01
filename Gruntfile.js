module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    traceur: {
      options: {
        moduleNames: false
      },
      custom: {
        files: [{
          expand: true,
          cwd: 'src/es6',
          src: ['*.js'],
          dest: 'src/es5'
        }]
      },
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js', 'src/es6/**/*.js'],
        tasks: ['traceur']
      },
    }
  });
};