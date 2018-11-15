module.exports = function(grunt) {

    "use strict";

    var watching = grunt.option('watching');
    var tasks = [];

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
        ' * Metro 4 Components Library v<%= pkg.version %> build @@build<%= pkg.version_suffix %> (<%= pkg.homepage %>)\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under <%= pkg.license %>\n' +
        ' */\n',

        requirejs_banner: "\n(function( factory ) {\n"+
        "    if ( typeof define === 'function' && define.amd ) {\n" +
        "        define([ 'jquery' ], factory );\n"+
        "    } else {\n" +
        "        factory( jQuery );\n"+
        "    }\n"+
        "}(function( jQuery ) { \n'use strict';\n\nvar $ = jQuery;\n\n",

        clean: {
            build: ['build/js', 'build/css', 'build/mif']
        },

        concat: {
            js: {
                options: {
                    banner: '<%= banner %>' + '<%= requirejs_banner%>',
                    footer: "\n\nreturn METRO_INIT === true ? Metro.init() : Metro;\n\n}));",
                    stripBanners: true,
                    process: function(src, filepath) {
                        return '\n// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },
                src: [
                    'js/*.js',
                    'js/utils/*.js',
                    'js/plugins/*.js'
                ],
                dest: 'build/js/metro.js'
            },
            css: {
                options: {
                    stripBanners: true,
                    banner: '<%= banner %>'
                },
                src: [
                    'build/css/metro.css',
                    'build/css/metro-colors.css',
                    'build/css/metro-rtl.css',
                    'build/css/metro-icons.css'
                ],
                dest: 'build/css/metro-all.css'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,
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
                paths: "less/",
                strictMath: false,
                sourceMap: false,
                banner: '<%= banner %>'
            },
            src: {
                expand: true,
                cwd: "less/",
                src: ["metro.less", "metro-rtl.less", "metro-colors.less", "metro-icons.less"],
                ext: ".css",
                dest: "build/css"
            },
            schemes: {
                expand: true,
                cwd: "less/schemes/",
                src: ["*.less"],
                ext: ".css",
                dest: "build/css/schemes"
            },
            third: {
                expand: true,
                cwd: "less/third-party/",
                src: ["*.less"],
                ext: ".css",
                dest: "build/css/third-party"
            },
            docs: {
                expand: true,
                cwd: "docs/css/",
                src: ["*.less"],
                ext: ".css",
                dest: "docs/css"
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'build/css/*.css'
            },
            schemes: {
                src: 'build/css/schemes/*.css'
            },
            third: {
                src: 'build/css/third-party/*.css'
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
            },
            third: {
                expand: true,
                cwd: "build/css/third-party",
                src: ['*.css', '!*.min.css'],
                dest: "build/css/third-party",
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
            docs: {
                expand: true,
                cwd: 'build',
                src: '**/*',
                dest: 'docs/metro'
            }
        },

        watch: {
            scripts: {
                files: ['js/i18n/*.json', 'js/*.js', 'js/utils/*.js', 'js/plugins/*js', 'less/*.less', 'less/include/*.less', 'less/third-party/*.less', 'less/schemes/*.less', 'less/schemes/builder/*.less', 'Gruntfile.js'],
                tasks: ['clean',  'less', 'postcss', 'concat', 'uglify', 'cssmin', 'copy']
            }
        }
    });

    tasks = ['clean', 'less', 'postcss', 'concat', 'uglify', 'cssmin', 'copy'];

    if (watching) {
        tasks.push('watch');
    }

    grunt.registerTask('default', tasks);

};