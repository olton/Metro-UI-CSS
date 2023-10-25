module.exports = function(grunt) {

    "use strict";

    var tasks, time = new Date(), day = time.getDate(), month = time.getMonth()+1, year = time.getFullYear(), hour = time.getHours(), mins = time.getMinutes(), sec = time.getSeconds();
    var timestamp = (day < 10 ? "0"+day:day) + "/" + (month < 10 ? "0"+month:month) + "/" + (year) + " " + (hour<10?"0"+hour:hour) + ":" + (mins<10?"0"+mins:mins);

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        "string-replace": {
            build: {
                files: {
                    'build/': 'build/js/*.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: "@@version.@@build @@status",
                            replacement: "<%= pkg.version %>-dev " + timestamp
                        },
                        {
                            pattern: "@@version",
                            replacement: "<%= pkg.version %>-dev " + timestamp
                        }
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', [
        'string-replace'
    ]);

};