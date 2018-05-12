module.exports = function (grunt) {
    'use strict';
    function baseConfig() {
        return {
            pkg: grunt.file.readJSON('package.json'),
            concat: {
                options: {
                    // define a string to put between each file in the concatenated output
                    separator: ';'
                },
                dist: {
                    // the files to concatenate
                    src: ['src/**/*.js'],
                    dest: 'dist/<%= pkg.name %>.js'
                }
            },
            uglify: {
                options: {
                    // the banner is inserted at the top of the output
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                dist: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            },
            qunit: {
                files: ['test/**.*.html']
            },
            jshint: {
                // define the files to lint
                files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
                // configure JSHint (documented at http://www.jshint.com/docs/)
                options: {
                    globals: {
                        jQuery: true,
                        console: true,
                        module: true
                    }
                }
            },
            watch: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint', 'qunit']
            }
        };
    }
    function loadTasks(mods) {
        mods.forEach(function (element) {
            grunt.loadNpmTasks(element);
        });
    }
    grunt.initConfig(baseConfig(grunt));
    loadTasks([
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-contrib-qunit',
        'grunt-contrib-watch',
        'grunt-contrib-concat'
    ]);

    // this would be run by typing 'grunt test' on the command line
    grunt.registerTask('test', ['jshint', 'qunit']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};