module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ftp_push: {
            korzh: {
                options: {
                    authKey: "korzh",
                    host: "crocodile.in.ua",
                    dest: "v4/",
                    port: 21,
                    incrementalUpdates: false
                },
                files: [
                    {
                        expand: true,
                        cwd: "build",
                        src: ['**/*']
                    }
                ]
            },
            korzh_v: {
                options: {
                    authKey: "korzh",
                    host: "crocodile.in.ua",
                    dest: "v<%= pkg.version %>/",
                    port: 21,
                    incrementalUpdates: false
                },
                files: [
                    {
                        expand: true,
                        cwd: "build",
                        src: ['**/*']
                    }
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'ftp_push'
    ]);

};