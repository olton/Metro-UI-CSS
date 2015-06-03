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

        clean: {
            build: ['build'],
            docs: ['docs/css/metro*.css', 'docs/js/metro*.js'],
            compiled_html: ['.compiled_html']
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: false
            },
            metro: {
                src: [
                    'js/requirements.js',
                    'js/global.js',
                    'js/widget.js',
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
            compileFont: {
                src: 'less/metro-icons.less',
                dest: 'build/css/metro-icons.css'
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
            minFont: {
                src: 'build/css/metro-icons.css',
                dest: 'build/css/metro-icons.min.css'
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
            docs_css_font: {
                src: 'build/css/metro-icons.css',
                dest: 'docs/css/metro-icons.css'
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
                        },
                        {
                            match: 'hit',
                            replacement: '<%= grunt.file.read(".replace/hit-ua-counter.txt") %>'
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
                tasks: ['concat', 'uglify', 'copy:docs_js']
            }
        }
    });

    grunt.registerTask('default', [
        'clean', 'concat', 'uglify', 'less', 'postcss', 'cssmin', 'copy', 'replace', 'watch'
    ]);

};