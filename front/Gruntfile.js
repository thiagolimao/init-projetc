module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

     pkg: grunt.file.readJSON('package.json'),


      // Define our source and build folders
      base_path: '',

      build:        '_public',
      css_build:    '_public/css',
      js_build:     '_public/js',
      vendor_build: '_public/vendors',

      css_src:      '_source/css',
      js_src:       '_source/js',
      vendor_src:   '_source/vendors',
      bower_src:    'bower_components',



      meta: {
        css : {
            banner:
            '/*========================================================================================!\n' +
            ' * app.css <%= pkg.name %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * E-mail: <%= pkg.email %>\n' +
            ' * Site: <%= pkg.site %>\n' +
            ' ========================================================================================*/'
        },

        js : {

            banner:
            '/*========================================================================================!\n' +
            ' * app.js <%= pkg.name %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
            ' * Author: <%= pkg.author %>\n' +
            ' * E-mail: <%= pkg.email %>\n' +
            ' * Site: <%= pkg.site %>\n' +
            ' ========================================================================================*/'

        }

      },


      // Less Config
      less: {
        '<%= css_build %>/app.css': '<%= css_src %>/application.less'
      },


      watch: {
          options: {
            livereload: true
          },

          css: {
            files: ['<%= css_src %>/*.less','<%= css_src %>/**/*'],
            tasks: ['css'],
          },

          js: {
            files: ['<%= js_src %>/*.js', '<%= js_src %>/**/*.js', '<%= vendor_src %>/*.js', '<%= vendor_src %>/**/*.js'],
            tasks: ['js'],
          },

          php: {
            files: ['<%= build %>/*.html', '<%= build %>/**/*.html'],
            //tasks: ['php'],
          },

          build: {
            files: ['Gruntfile.js'],
            tasks: ['concat', 'uglify'],
          }

      },


      jshint: {

        ignore_warning: {
          options: {
            '-W033': true,
            '-W099': true,
          },
          src: ['<%= js_src %>/*.js'],
        },

      },


      uglify: {
          options: {
            banner: '<%= meta.js.banner %>\n',
            mangle: false
          },
           build: {
            files: {
               '<%= js_build %>/app.min.js': ['<%= js_build %>/app.js'],
               '<%= js_build %>/vendor.js': ['<%= js_build %>/vendor.js'],
            },
          },
        },

      concat: {
          options:{
            separator: ';'
          },

          basic_and_extras: {
            src: [
              // JS
              //'<%= js_src %>/controllers/*.js',
              '<%= js_src %>/*.js'
            ],
            dest: '<%= js_build %>/app.js',
          },

          vendor: {
            src: [
              // Vendor Plugins
              //'<%= bower_src %>/jquery/dist/jquery.js', // jQuery
              // '<%= bower_src %>/vide/dist/jquery.vide.js',
              // '<%= bower_src %>/jquery-tubular/dist/js/jquery-tubular.min.js',
              // '<%= bower_src %>/modernizr/modernizr.js',
              // '<%= bower_src %>/fastclick/lib/fastclick.js',
              // '<%= bower_src %>/jquery.countdown/dist/jquery.countdown.js',
              // '<%= bower_src %>/featherlight/release/featherlight.min.js',
              // 'custom_components/ghost/ghost.js',
            ],
            dest: '<%= js_build %>/vendor.js',
          },
      },

      // CSSmin Config
      cssmin: {
          options: {
              banner: '<%= meta.css.banner %>\n',
              keepSpecialComments: 0
          },
          compress: {
            files: {
              '<%= css_build %>/app.min.css': [ '<%= css_build %>/app.css' ],
            }
          }
      },

      cmq: {
        GroupMediaQuerys: {
           files: {
            '<%= css_build %>': ['<%= css_build %>/*.css']
          }
        }
      },


      // Tarefa connect
      connect: {
          server: {
              options: {
                  port: 9000,
                  base: "_public/",
                  hostname: "localhost",
                  livereload: true,
                  open: true
              }
          }
      }

    });

    grunt.registerTask( 'w', ['connect','watch'] );
    grunt.registerTask('css', ['less','cmq','cssmin']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);

    grunt.registerTask('default', ['less', 'cmq', 'cssmin', 'jshint', 'concat', 'uglify']);


};