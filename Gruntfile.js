module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        // Wipe out previous builds and test reporting.
        clean: ["dist/"],

        // Run your source code through JSHint"s defaults.
        jshint: {
            default: ["app/**/*.js"],
        },

        // Move vendor and app logic during a build.
        copy: {
            release: {
                files: [{
                    src: ["app/**"],
                    dest: "dist/"
                }]
            }
        },
        concat: {
            dist: {
                src: ['app/*.js'],
                dest: 'dist/source.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/source.min.js': ['dist/source.js']
                }
            }
        },
        // Unit testing is provided by Karma.  Change the two commented locations
        // below to either: mocha, jasmine, or qunit.
        karma: {
            options: {
                basePath: process.cwd(),
                singleRun: true,
                captureTimeout: 7000,
                autoWatch: true,

                //reporters: ["spec"],
                reporters: ["spec", "growl"],

                browsers: ["PhantomJS"],

                // Change this to the framework you want to use.
                frameworks: ["mocha", "chai"],

                plugins: [
                    "karma-mocha",
                    "karma-phantomjs-launcher",
                    "karma-spec-reporter",
                    "karma-growl-reporter",
                    "karma-chai"
                ],

                files: [
                    "app/**/*.js",
                    "test/**/*.spec.js"
                ]
            },

            // This creates a server that will automatically run your tests when you
            // save a file and display results in the terminal.
            daemon: {
                options: {
                    singleRun: false,
                    // clear preprocessors to evict coverage inject in debug
                    preprocessors: {}
                }
            },

            // This is useful for running the tests just once.
            run: {
                options: {
                    singleRun: true
                }
            }
        }
    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Third-party tasks.
    grunt.loadNpmTasks("grunt-karma");

    // When running the default Grunt command, just lint the code.
    grunt.registerTask("default", [
        "clean",
        "jshint:default",
        "karma:run",
        "concat",
        "uglify"
    ]);

};
