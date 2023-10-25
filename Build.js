module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        buildnumber: {
            options: {
                field: 'build'
            },
            files: ['package.json']
        },

        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            match: 'build',
                            replacement: "<%= pkg.build %>"
                        },
                        {
                            match: 'version',
                            replacement: "<%= pkg.version %>"
                        },
                        {
                            match: 'status',
                            replacement: "<%= pkg.version_suffix %>"
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/js/*.js'], dest: 'build/js/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['build/css/*.css'], dest: 'build/css/'
                    }
                ]
            }
        }

    });

    grunt.registerTask('default', [
        'buildnumber', 'replace'
    ]);

};