module.exports = function(grunt) {

    "use strict";

    require('load-grunt-tasks')(grunt);

    var autoprefixer = require('autoprefixer-core');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                ' * Metro UI CSS v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
                ' */\n',

        requirejs_banner: "\n(function( factory ) {\n"+
                          "    if ( typeof define === 'function' && define.amd ) {\n" +
                          "        define([ 'jquery' ], factory );\n"+
                          "    } else {\n" +
                          "        factory( jQuery );\n"+
                          "    }\n"+
                          "}(function( jQuery ) { \n'use strict';\n\nvar $ = jQuery;\n\nwindow.METRO_VERSION = '<%= pkg.version %>';\n\n",

        clean: {
            build: ['build/js', 'build/css', 'build/fonts'],
            docs: ['docs/css/metro*.css', 'docs/js/metro*.js'],
            compiled_html: ['.compiled_html']
        },

        concat: {
            options: {
                banner: '<%= banner %>' + '<%= requirejs_banner%>',
                footer: "\n\n return $.Metro.init();\n\n}));",
                stripBanners: true,
                process: function(src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            metro: {
                src: [
                    'js/requirements.js',
                    'js/global.js',
                    'js/widget.js',
                    'js/initiator.js',
                    'js/utils/*.js',
                    'js/widgets/*.js'
                ],
                dest: 'build/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false,
                sourceMap: false
            },
            metro: {
                src: '<%= concat.metro.dest %>',
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        },

        less: {
            options: {
                paths: ['less'],
                strictMath: false
            },
            compileCore: {
                src: 'less/<%= pkg.name %>.less',
                dest: 'build/css/<%= pkg.name %>.css'
            },
            compileResponsive: {
                src: 'less/<%= pkg.name %>-responsive.less',
                dest: 'build/css/<%= pkg.name %>-responsive.css'
            },
            compileRtl: {
                src: 'less/<%= pkg.name %>-rtl.less',
                dest: 'build/css/<%= pkg.name %>-rtl.css'
            },
            compileSchemes: {
                src: 'less/<%= pkg.name %>-schemes.less',
                dest: 'build/css/<%= pkg.name %>-schemes.css'
            },
            compileColors: {
                src: 'less/<%= pkg.name %>-colors.less',
                dest: 'build/css/<%= pkg.name %>-colors.css'
            },
            compileFont: {
                src: 'less/<%= pkg.name %>-icons.less',
                dest: 'build/css/<%= pkg.name %>-icons.css'
            }
        },

        postcss: {
            options: {
                processors: [
                    autoprefixer({ browsers: ['> 5%'] }).postcss
                ]
            },
            dist: { src: 'build/css/*.css' }
        },

        cssmin: {
            minCore: {
                src: 'build/css/<%= pkg.name %>.css',
                dest: 'build/css/<%= pkg.name %>.min.css'
            },
            minRtl: {
                src: 'build/css/<%= pkg.name %>-rtl.css',
                dest: 'build/css/<%= pkg.name %>-rtl.min.css'
            },
            minResponsive: {
                src: 'build/css/<%= pkg.name %>-responsive.css',
                dest: 'build/css/<%= pkg.name %>-responsive.min.css'
            },
            minSchemes: {
                src: 'build/css/<%= pkg.name %>-schemes.css',
                dest: 'build/css/<%= pkg.name %>-schemes.min.css'
            },
            minColors: {
                src: 'build/css/<%= pkg.name %>-colors.css',
                dest: 'build/css/<%= pkg.name %>-colors.min.css'
            },
            minFont: {
                src: 'build/css/<%= pkg.name %>-icons.css',
                dest: 'build/css/<%= pkg.name %>-icons.min.css'
            }
        },

        copy: {
            build_font: {
                src: 'fonts/*',
                dest: 'build/',
                expand: true
            },            
            docs_css_core: {
                src: 'build/css/<%= pkg.name %>.css',
                dest: 'docs/css/<%= pkg.name %>.css'
            },
            docs_css_rtl: {
                src: 'build/css/<%= pkg.name %>-rtl.css',
                dest: 'docs/css/<%= pkg.name %>-rtl.css'
            },
            docs_css_responsive: {
                src: 'build/css/<%= pkg.name %>-responsive.css',
                dest: 'docs/css/<%= pkg.name %>-responsive.css'
            },
            docs_css_schemes: {
                src: 'build/css/<%= pkg.name %>-schemes.css',
                dest: 'docs/css/<%= pkg.name %>-schemes.css'
            },
            docs_css_colors: {
                src: 'build/css/<%= pkg.name %>-colors.css',
                dest: 'docs/css/<%= pkg.name %>-colors.css'
            },
            docs_css_font: {
                src: 'build/css/<%= pkg.name %>-icons.css',
                dest: 'docs/css/<%= pkg.name %>-icons.css'
            },
            docs_js: {
                src: 'build/js/<%= pkg.name %>.js',
                dest: 'docs/js/<%= pkg.name %>.js'
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'adsense',
                            replacement: '<%= grunt.file.read(".replace/google-adsense-block.txt") %>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['docs/*.html'], dest: '.compiled_html/'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js', 'js/utils/*.js', 'js/widgets/*js'],
                tasks: ['concat', 'uglify', 'less', 'postcss', 'cssmin', 'copy']
            }
        }
    });

    grunt.registerTask('default', [
        'clean', 'concat', 'uglify', 'less', 'postcss', 'cssmin', 'copy', 'replace', 'watch'
    ]);

};