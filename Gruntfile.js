module.exports = function(grunt) {

    "use strict";

    var watching = grunt.option('watching');
    var develop = grunt.option('develop');
    var tasks;
    var watch_files = [
        'source/i18n/*.json',
        'source/*.js',
        'source/**/*.js',
        'source/**/*.less',
        'Gruntfile.js'
    ];
    var time = new Date(), day = time.getDate(), month = time.getMonth()+1, year = time.getFullYear(), hour = time.getHours(), mins = time.getMinutes(), sec = time.getSeconds();
    var timestamp = (day < 10 ? "0"+day:day) + "/" + (month < 10 ? "0"+month:month) + "/" + (year) + " " + (hour<10?"0"+hour:hour) + ":" + (mins<10?"0"+mins:mins) + ":" + (sec<10?"0"+sec:sec);

    tasks = [
        'concurrent:clean',
        'concurrent:eslint',
        'concurrent:compile_less',
        'concurrent:postcss',
        'concurrent:concat'];

    if (!develop) {
        tasks.push('concurrent:remove_log');
        tasks.push('concurrent:min');
    }

    tasks.push('concurrent:replace');
    tasks.push('concurrent:copy');

    if (watching) {
        tasks.push('watch');
    }

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        docsDir: 'G:\\Projects\\Metro4-Docs\\public_html\\metro',
        pkg: grunt.file.readJSON('package.json'),

        copyright: '/*\n' +
        ' * Metro 4 Components Library v<%= pkg.version %> <%= pkg.version_suffix %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Built at '+timestamp+'\n' +
        ' * Licensed under <%= pkg.license %>\n' +
        ' */\n',

        banner: "\n(function( factory ) {\n"+
        "    if ( typeof define === 'function' && define.amd ) {\n" +
        "        define('metro4', factory );\n"+
        "    } else {\n" +
        "        factory( );\n"+
        "    }\n"+
        "}(function( ) { \n"+
        "'use strict';\n\n"+
        "window.hideM4QVersion = true;\n\n",

        footer: "\n\n" +
            "if (METRO_INIT ===  true) {\n" +
            "\tMETRO_INIT_MODE === 'immediate' ? Metro.init() : $(function(){Metro.init()});\n" +
            "}" +
            "\n\nreturn Metro;"+
            "\n\n}));",

        clean: {
            build: ['build/js', 'build/css', 'build/mif']
        },

        eslint: {
            target: ['source/**/*.js'],
            rules: {
                "no-unused-vars": 1
            }
        },

        concat: {
            js: {
                options: {
                    banner: '<%= copyright %>' + '<%= banner%>',
                    footer: '<%= footer %>',
                    stripBanners: true,
                    separator: "\n\n"
                },
                src: [
                    'source/m4q/*.js',
                    'source/metro.js',
                    'source/extensions/*.js',
                    'source/common/js/*.js',
                    'source/i18n/*.js',
                    'source/components/**/*.js'
                ],
                dest: 'build/js/metro.js'
            },
            css: {
                options: {
                    stripBanners: true,
                    separator: "\n\n",
                    banner: '<%= copyright %>',
                    process: function(src) {
                        return src.replace(/\n/g, '\n');
                    }
                },
                src: [
                    'build/css/metro.css',
                    'build/css/metro-animations.css',
                    'build/css/metro-colors.css',
                    'build/css/metro-rtl.css',
                    'build/css/metro-icons.css'
                ],
                dest: 'build/css/metro-all.css'
            }
        },

        removelogging: {
            dist: {
                src: "build/js/*.js",

                options: {
                    methods: ["log"]
                }
            }
        },

        uglify: {
            options: {
                banner: '<%= copyright %>',
                stripBanners: develop ? false : {
                    block: true,
                    line: true
                },
                sourceMap: true,
                preserveComments: false
            },
            core: {
                src: 'build/js/metro.js',
                dest: 'build/js/metro.min.js'
            }
        },

        less: {
            options: {
                paths: "source/",
                strictMath: false,
                sourceMap: false,
                banner: '<%= copyright %>'
            },
            src: {
                expand: true,
                cwd: "source/",
                src: [
                    "metro.less",
                    "metro-reset.less",
                    "metro-common.less",
                    "metro-components.less",
                    "metro-rtl.less",
                    "metro-colors.less",
                    "metro-animations.less",
                    "metro-icons.less"
                ],
                ext: ".css",
                dest: "build/css"
            },
            schemes: {
                expand: true,
                cwd: "source/schemes/",
                src: ["*.less"],
                ext: ".css",
                dest: "build/css/schemes"
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        overrideBrowserslist: ['last 3 versions']
                    })
                ]
            },
            dist: {
                src: 'build/css/*.css'
            },
            schemes: {
                src: 'build/css/schemes/*.css'
            }
        },

        cssmin: {
            src: {
                expand: true,
                cwd: "build/css",
                src: ['*.css', '!*.min.css'],
                dest: "build/css",
                ext: ".min.css"
            },
            schemes: {
                expand: true,
                cwd: "build/css/schemes",
                src: ['*.css', '!*.min.css'],
                dest: "build/css/schemes",
                ext: ".min.css"
            }
        },

        copy: {
            fonts: {
                expand: true,
                cwd: 'icons',
                src: '**/*',
                dest: 'build/mif'
            },
            test: {
                expand: true,
                cwd: 'build',
                src: '**/*',
                dest: 'test/metro'
            }
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
                        },
                        {
                            match: 'compile',
                            replacement: timestamp
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
        },

        concurrent: {
            options: {
                limit: 8
            },
            clean: ['clean'],
            compile_less: ['less:src', 'less:schemes'],
            postcss: ['postcss'],
            eslint: ['eslint'],
            concat: ['concat:js', 'concat:css'],
            remove_log: develop ? [] : ['removelogging'],
            min: ['uglify', 'cssmin:src', 'cssmin:schemes'],
            replace: ['replace'],
            copy: ['copy'],
            watch: ['watch']
        },

        watch: {
            scripts: {
                files: watch_files,
                tasks: tasks
            }
        }
    });

    grunt.registerTask('default', tasks);

};