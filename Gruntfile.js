module.exports = function(grunt) {

    "use strict";

    var watching = grunt.option('watching');
    var develop = grunt.option('develop');
    var tasks;
    var watch_files = [
        // 'source/i18n/*.json',
        // 'source/*.js',
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
        'concurrent:clean_build',
        'concurrent:eslint',
        'concurrent:file_creator',
        'concurrent:compile_less',
        'concurrent:postcss',
        'concurrent:concat'
    ];

    if (!develop) {
        tasks.push('concurrent:remove_log');
        tasks.push('concurrent:min');
    }

    tasks.push('concurrent:replace');
    tasks.push('concurrent:copy');

    // tasks.push('concurrent:clean_less');

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

        clean: {
            build: ['build/js', 'build/css', 'build/mif'],
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
                "source/metro-components.less": function(fs, fd, done){
                    var glob = grunt.file.glob;
                    var _ = grunt.util._;
                    glob('source/components/**/*.less', function(err, files){
                        var components = [];
                        _.each(files, function(file){
                            components.push(file);
                        });
                        // fs.writeSync(fd, '// this file is auto-generated.  DO NOT MODIFY\n');
                        _.each(components, function(file) {
                            fs.writeSync(fd, '@import "' + file.replace('source/', '').replace('.less', '') + '";\n');
                        });
                        done();
                    })
                }
            },
            "colors-less": {
                "source/metro-colors.less": function(fs, fd, done){
                    var glob = grunt.file.glob;
                    var _ = grunt.util._;
                    glob('source/colors/*.less', function(err, files){
                        var components = [];
                        _.each(files, function(file){
                            components.push(file);
                        });
                        // fs.writeSync(fd, '// this file is auto-generated.  DO NOT MODIFY\n');
                        _.each(components, function(file) {
                            fs.writeSync(fd, '@import "' + file.replace('source/', '').replace('.less', '') + '";\n');
                        });
                        done();
                    })
                }
            },
            "animations-less": {
                "source/metro-animations.less": function(fs, fd, done){
                    var glob = grunt.file.glob;
                    var _ = grunt.util._;
                    glob('source/animations/**/*.less', function(err, files){
                        var components = [];
                        _.each(files, function(file){
                            components.push(file);
                        });
                        // fs.writeSync(fd, '// this file is auto-generated.  DO NOT MODIFY\n');
                        _.each(components, function(file) {
                            fs.writeSync(fd, '@import "' + file.replace('source/', '').replace('.less', '') + '";\n');
                        });
                        done();
                    })
                }
            },
            "common-less": {
                "source/metro-common.less": function(fs, fd, done){
                    var glob = grunt.file.glob;
                    var _ = grunt.util._;
                    glob('source/common/less/*.less', function(err, files){
                        var components = [];
                        _.each(files, function(file){
                            components.push(file);
                        });
                        // fs.writeSync(fd, '// this file is auto-generated.  DO NOT MODIFY\n');
                        _.each(components, function(file) {
                            fs.writeSync(fd, '@import "' + file.replace('source/', '').replace('.less', '') + '";\n');
                        });
                        done();
                    })
                }
            },
            "icons-less": {
                "source/metro-icons.less": function(fs, fd, done){
                    var components = ['icons/mif-base', 'icons/mif-icons'];
                    var _ = grunt.util._;
                    _.each(components, function(file) {
                        fs.writeSync(fd, '@import "' + file + '";\n');
                    });
                    done();
                }
            },
            "reset-less": {
                "source/metro-reset.less": function(fs, fd, done){
                    var components = ['common/less/reset'];
                    var _ = grunt.util._;
                    _.each(components, function(file) {
                        fs.writeSync(fd, '@import "' + file + '";\n');
                    });
                    done();
                }
            },
            "metro-less": {
                "source/metro.less": function(fs, fd, done){
                    var components = ['metro-reset', 'metro-common', 'metro-components'];
                    var _ = grunt.util._;
                    _.each(components, function(file) {
                        fs.writeSync(fd, '@import "' + file + '";\n');
                    });
                    done();
                }
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
                    'source/m4q/*.js',
                    'source/core/metro.js',
                    'source/i18n/*.js',
                    'source/extensions/*.js',
                    'source/common/js/utilities.js',
                    'source/common/js/animations.js',
                    'source/common/js/colors.js',
                    'source/common/js/export.js',
                    'source/common/js/md5.js',
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
                banner: '<%= copyright %>',
                ieCompat: false,
                optimization: 2
            },
            src: {
                expand: true,
                cwd: "source/",
                src: develop
                    ? [
                        "metro.less",
                        "metro-colors.less",
                        "metro-animations.less",
                        "metro-icons.less"
                    ]
                    :[
                    "metro.less",
                    "metro-reset.less",
                    "metro-common.less",
                    "metro-components.less",
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
                dest: 'tests/metro'
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
            },
            clean_build: ['clean:build'],
            file_creator: ['file-creator'],
            compile_less: ['less:src', 'less:schemes'],
            postcss: ['postcss'],
            eslint: ['eslint'],
            concat: ['concat:js', 'concat:css'],
            remove_log: develop ? [] : ['removelogging'],
            min: ['uglify', 'cssmin:src', 'cssmin:schemes'],
            replace: ['replace'],
            copy: ['copy'],
            clean_less: ['clean:less'],
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