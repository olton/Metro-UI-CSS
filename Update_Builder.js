module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ftp_push: {
            builder_metro: {
                options: {
                    authKey: "metroui",
                    host: "eg77.mirohost.net",
                    dest: "builder.metroui.org.ua/vendors/metro/",
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
            builder_source_less: {
                options: {
                    authKey: "metroui",
                    host: "eg77.mirohost.net",
                    dest: "builder.metroui.org.ua/source/less/",
                    port: 21,
                    incrementalUpdates: false
                },
                files: [
                    {
                        expand: true,
                        cwd: "less",
                        src: ['**/*']
                    }
                ]
            },
            builder_source_js: {
                options: {
                    authKey: "metroui",
                    host: "eg77.mirohost.net",
                    dest: "builder.metroui.org.ua/source/js/",
                    port: 21,
                    incrementalUpdates: false
                },
                files: [
                    {
                        expand: true,
                        cwd: "js",
                        src: ['**/*']
                    }
                ]
            },
            builder_source_icons: {
                options: {
                    authKey: "metroui",
                    host: "eg77.mirohost.net",
                    dest: "builder.metroui.org.ua/source/icons/",
                    port: 21,
                    incrementalUpdates: false
                },
                files: [
                    {
                        expand: true,
                        cwd: "icons",
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