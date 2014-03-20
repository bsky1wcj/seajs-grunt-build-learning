module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),

        transport : {
            options : {
                paths: ['sea-modules'],
                alias: '<%= pkg.spm.alias %>'
            },

            helloSeajsApp : {
                options : {
                    idleading : 'dist/hello-seajs/'
                },
                files : [
                    {
                        expand: true,
                        cwd : 'src/hello-seajs/',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/hello-seajs'
                    }
                ]
            },
            todoBackboneApp : {
                options : {
                    idleading : 'dist/todo-backbone/'
                    // idleading : 'todo-backbone/'
                },
                files : [
                    {
                        expand: true,
                        cwd : 'src/todo-backbone/',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/todo-backbone'
                    }
                ]
            },
            backbonePart1App : {
                options : {
                    idleading : 'dist/backbone-part1/'
                },
                files : [
                    {
                        expand: true,
                        cwd : 'src/backbone-part1/',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/backbone-part1'
                    }
                ]
            },
            backbonePaginatorApp : {
                options : {
                    idleading : 'dist/backbone-paginator/'
                },
                files : [
                    {
                        expand: true,
                        cwd : 'src/backbone-paginator/',
                        src : '**/*',
                        filter : 'isFile',
                        dest : '.build/backbone-paginator'
                    }
                ]
            }
        },

        concat : {
            options : {
                paths: ['sea-modules'],
                include : 'relative'
            },
            helloSeajsApp : {
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['hello-seajs/**/*.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            todoBackboneApp : {
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['todo-backbone/**/*.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            backbonePart1App : {
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['backbone-part1/**/*.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            backbonePaginatorApp : {
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['backbone-paginator/**/*.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },

        uglify : {
            helloSeajsApp : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['hello-seajs/**/*.js', '!hello-seajs/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            todoBackboneApp : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['todo-backbone/**/*.js', '!todo-backbone/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            backbonePart1App : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['backbone-part1/**/*.js', '!backbone-part1/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },
            backbonePaginatorApp : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['backbone-paginator/**/*.js', '!backbone-paginator/**/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },
        clean : {
            spm : ['.build']
        }
    });

    // grunt.loadNpmTasks('grunt-cmd-transport');
    // grunt.loadNpmTasks('grunt-cmd-concat');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['clean']);
    grunt.registerTask('build-hello-seajs-app', ['transport:helloSeajsApp', 'concat:helloSeajsApp', 'uglify:helloSeajsApp', 'clean']);
    grunt.registerTask('build-todo-backbone-app', ['transport:todoBackboneApp', 'concat:todoBackboneApp', 'uglify:todoBackboneApp', 'clean']);
    grunt.registerTask('build-backbone-part1-app', ['transport:backbonePart1App', 'concat:backbonePart1App', 'uglify:backbonePart1App', 'clean']);
    grunt.registerTask('build-backbone-paginator-app', ['transport:backbonePaginatorApp', 'concat:backbonePaginatorApp', 'uglify:backbonePaginatorApp', 'clean']);

    grunt.registerTask('build-all', ['transport', 'concat', 'uglify', 'clean']);



}