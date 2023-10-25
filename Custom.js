module.exports = function(grunt) {

    "use strict";

    var watching = grunt.option('watching');
    var develop = grunt.option('develop');
    var tasks;
    var watch_files = [
        'source/**/*.js',
        'source/components/**/*.less',
        'source/icons/**/*.less',
        'source/include/*.less',
        'source/colors/*.less',
        'source/animations/**/*.less',
        'source/schemes/**/*.less',
        'source/common/**/*.less',
        'Gruntfile.js'
    ];
    var time = new Date(), day = time.getDate(), month = time.getMonth()+1, year = time.getFullYear(), hour = time.getHours(), mins = time.getMinutes(), sec = time.getSeconds();
    var timestamp = (day < 10 ? "0"+day:day) + "/" + (month < 10 ? "0"+month:month) + "/" + (year) + " " + (hour<10?"0"+hour:hour) + ":" + (mins<10?"0"+mins:mins) + ":" + (sec<10?"0"+sec:sec);

    tasks = [
        'clear',
        'clean:build',
        // 'eslint',
        'file-creator',
        'less',
        'postcss',
        'concat'
    ];

    if (!develop) {
        tasks.push('removelogging');
        tasks.push('uglify');
        tasks.push('cssmin');
    }

    tasks.push('replace');
    tasks.push('copy');

    if (!develop) {
        tasks.push('clean:less');
    }

    if (watching) {
        tasks.push('watch');
    }

    var components_css = [
        'source/components/accordion/*.less',
        'source/components/activity/*.less',
        'source/components/app-bar/*.less',
        'source/components/button/*.less',
        'source/components/container/*.less',
        'source/components/cookie-disclaimer/*.less',
        'source/components/d-menu/*.less',
        'source/components/dialog/*.less',
        'source/components/dropdown/*.less',
        'source/components/form/*.less',
        'source/components/grid/*.less',
        'source/components/hamburger/*.less',
        'source/components/hero/*.less',
        'source/components/input-common/*.less',
        'source/components/light-box/*.less',
        'source/components/scrollbar/*.less',
        'source/components/table/*.less',
        'source/components/tabs/*.less',
    ]
    var components_js = [
        'source/components/accordion/*.js',
        'source/components/activity/*.js',
        'source/components/app-bar/*.js',
        'source/components/colors/*.js',
        'source/components/cookie/*.js',
        'source/components/cookie-disclaimer/*.js',
        'source/components/dialog/*.js',
        'source/components/dropdown/*.js',
        'source/components/gravatar/*.js',
        'source/components/html-container/*.js',
        'source/components/lightbox/*.js',
        'source/components/tabs/*.js',
    ]

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var createLessFile = function(scope, include, exclude){
        return Array.isArray(scope) ?
            function(fs, fd, done){
                var _ = grunt.util._;
                _.each(scope, function(file) {
                    fs.writeSync(fd, '@import "' + file + '";\n');
                });
                done();
            }
            :
            function(fs, fd, done){
                var glob = grunt.file.glob;
                var _ = grunt.util._;
                var inc = include ? include : 'source/'+scope+'/**/*.less'
                glob(inc, function(err, files){
                    var components = [];
                    _.each(files, function(file){
                        if (Array.isArray(exclude) && exclude.indexOf(file) > -1) {
                            return;
                        }
                        components.push(file);
                    });
                    // fs.writeSync(fd, '// this file is auto-generated.  DO NOT MODIFY\n');
                    _.each(components, function(file) {
                        fs.writeSync(fd, '@import "' + file.replace('source/', '').replace('.less', '') + '";\n');
                    });
                    done();
                })
            }
    }

    grunt.initConfig({
        docsDir: 'G:\\Projects\\Metro4-Docs\\public_html\\metro',
        pkg: grunt.file.readJSON('package.json'),

        copyright: '/*\n' +
        ' * Metro UI Components Library v<%= pkg.version %> <%= pkg.version_suffix %> (<%= pkg.homepage %>)\n' +
        ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Built at '+timestamp+'\n' +
        ' * Licensed under <%= pkg.license %>\n' +
        ' */\n',

        clean: {
            build: ['custom/js', 'custom/css', 'custom/mif'],
            less: ['source/*.less']
        },

        clear: {},

        eslint: {
            target: ['source/**/*.js'],
            rules: {
                "no-unused-vars": 1
            }
        },

        "file-creator": {
            "components-less": {
                "source/metro-components.less": createLessFile("components", components_css)
            },
            "colors-less": {
                "source/metro-colors.less": createLessFile("colors")
            },
            "common-less": {
                "source/metro-common.less": createLessFile("common", ["source/common/less/reset.less"])
            },
            "icons-less": {
                "source/metro-icons.less": createLessFile(['icons/mif-base', 'icons/mif-icons'])
            },
            "reset-less": {
                "source/metro-reset.less": createLessFile(['common/less/reset'])
            },
            "metro-less": {
                "source/metro.less": createLessFile(['metro-reset', 'metro-common', 'metro-components'])
            }
        },

        concat: {
            js: {
                options: {
                    banner: '<%= copyright %>',
                    stripBanners: true,
                    separator: "\n\n"
                },
                src: [
                    'source/datetime/datetime.plugins.js',
                    'source/datetime/datetime.locales.js',
                    'source/cake/cake.js',
                    'source/m4q/m4q.js',
                    'source/core/global.js',
                    'source/core/metro.js',
                    'source/i18n/*.js',
                    'source/extensions/*.js',
                    'source/common/js/*.js',
                ].concat(components_js),
                dest: 'custom/js/metro.js'
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
                    'custom/css/metro.css',
                    'custom/css/metro-colors.css',
                    'custom/css/metro-icons.css'
                ],
                dest: 'build/css/metro-all.css'
            }
        },

        removelogging: {
            dist: {
                src: "custom/js/*.js",

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
                src: 'custom/js/metro.js',
                dest: 'custom/js/metro.min.js'
            }
        },

        less: {
            options: {
                paths: "source/",
                strictMath: false,
                sourceMap: false,
                banner: '<%= copyright %>',
                ieCompat: false,
                optimization: 2
            },
            src: {
                expand: true,
                cwd: "source/",
                src: [
                    "metro.less",
                    "metro-reset.less",
                    "metro-common.less",
                    "metro-components.less",
                    "metro-colors.less",
                    "metro-icons.less"
                ],
                ext: ".css",
                dest: "custom/css"
            },
            schemes: {
                expand: true,
                cwd: "source/schemes/",
                src: ["*.less"],
                ext: ".css",
                dest: "custom/css/schemes"
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: 'custom/css/*.css'
            },
            schemes: {
                src: 'custom/css/schemes/*.css'
            }
        },

        cssmin: {
            src: {
                expand: true,
                cwd: "custom/css",
                src: ['*.css', '!*.min.css'],
                dest: "custom/css",
                ext: ".min.css"
            },
            schemes: {
                expand: true,
                cwd: "custom/css/schemes",
                src: ['*.css', '!*.min.css'],
                dest: "custom/css/schemes",
                ext: ".min.css"
            }
        },

        copy: {
            fonts: {
                expand: true,
                cwd: 'icons',
                src: '**/*',
                dest: 'custom/mif'
            },
            test: {
                expand: true,
                cwd: 'custom',
                src: '**/*',
                dest: 'tests/metro'
            }
        },

        replace: {
            build: {
                options: {
                    patterns: [
                        {
                            match: 'version',
                            replacement: "<%= pkg.version %>"
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
                        src: ['custom/js/*.js'], dest: 'custom/js/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['custom/css/*.css'], dest: 'custom/css/'
                    }
                ]
            }
        },

        watch: {
            scripts: {
                files: watch_files,
                tasks: tasks,
                options: {
                    spawn: false,
                    reload: true
                }
            }
        }
    });

    grunt.registerTask('default', tasks);

};