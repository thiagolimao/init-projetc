module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

     pkg: grunt.file.readJSON('package.json'),

      // Define our source and build folders
      build:        '_public',
      css_build:    '_public/css',
      js_build:     '_public/js',
      vendor_build: '_public/vendors',

      css_src:      '_source/css',
      js_src:       '_source/js',
      vendor_src:   '_source/vendors',

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


      // Sass Config
      sass: {

        dist: {
          files: {
            '<%= css_build %>/app.css': '<%= css_src %>/application.scss',
          }
        }

      },


      watch: {
          options: {
              livereload: true
          },
          css: {
            files: ['<%= css_src %>/*.scss','<%= css_src %>/**/*'],
            tasks: ['css'],
          },

          js: {
            files: ['<%= js_src %>/*.js', '<%= js_src %>/**/*.js', '<%= vendor_src %>/*.js', '<%= vendor_src %>/**/*.js'],
            tasks: ['jshint', 'concat:basic_and_extras', 'uglify:build'],
          },

          html: {
            files: ['<%= build %>/*.html', '<%= build %>/**/*.html'],
            // tasks: ['html'],
          },

          build: {
            files: ['Gruntfile.js'],
            tasks: ['concat','uglify'],
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
             '<%= js_build %>/vendor.min.js': ['<%= js_build %>/vendor.js'],
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
              '<%= js_src %>/*.js'
            ],
            dest: '<%= js_build %>/app.js',
          },

          vendor: {
            src: [
              // Vendor Plugins
              '<%= vendor_src %>/js/jquery.min.js', //jQuery
              '<%= vendor_src %>/js/jquery.scrolly.min.js', //jQuery scrolly
              '<%= vendor_src %>/js/browser.min.js', //browser
              '<%= vendor_src %>/js/breakpoints.min.js', //breakpoints
              '<%= vendor_src %>/js/slick.min.js', //Slick SLider
              '<%= vendor_src %>/js/util.js', //util
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
              // '<%= css_build %>/vendor.min.css': [ '<%= css_build %>/vendor.css' ],
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

      connect: {
          server: {
              options: {
                  port: 9000,
                  hostname: "localhost",
                  base: {
                    path: '_public',
                    options: {
                      index: 'index.html',
                      maxAge: 300000
                    }
                  },
                  livereload: true,
                  open: true
              }
          }
      }

    });

    // Carregando os plugins
    // ---------------------------------------
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask( 'w', ['connect','watch'] );
    grunt.registerTask('css', ['sass','cmq','cssmin']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);

    grunt.registerTask('default', ['connect', 'watch', 'sass', 'cmq', 'cssmin', 'jshint', 'concat', 'uglify']);


};