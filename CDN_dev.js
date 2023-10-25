module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ftp_push: {
            keycdn: {
                options: {
                    authKey: "keycdn",
                    host: "ftp.keycdn.com",
                    dest: "v4-dev/",
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