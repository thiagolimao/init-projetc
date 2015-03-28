module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

     pkg: grunt.file.readJSON('package.json'),


      // Define our source and build folders
      base_path: '',

      proxy_url:    'local.site_novo',

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


      // Less Config
      less: {
        '<%= css_build %>/app.css': '<%= css_src %>/application.less'
      },


      watch: {

          css: {
            files: ['<%= css_src %>/*.less','<%= css_src %>/**/*'],
            tasks: ['css'],
          },

          js: {
            files: ['<%= js_src %>/*.js', '<%= js_src %>/**/*.js', '<%= vendor_src %>/*.js', '<%= vendor_src %>/**/*.js'],
            tasks: ['js'],
          },

          php: {
            files: ['<%= build %>/*.php', '<%= build %>/**/*.php'],
            tasks: ['php'],
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
            files: {
              '<%= js_build %>/app.js' : ['<%= js_src %>/*.js'],
              //'<%= vendor_build %>/vendor.js' : ['<%= vendor_src %>/*.js', '<%= vendor_src %>/**/*.js'],
            },
          },

          vendor: {
            src: [
              // Vendor Plugins
              'bower_components/jquery/dist/jquery.js', // jQuery
              // 'bower_components/vide/dist/jquery.vide.js',
              // 'bower_components/jquery-tubular/dist/js/jquery-tubular.min.js',
              // 'bower_components/modernizr/modernizr.js',
              // 'bower_components/fastclick/lib/fastclick.js',
              // 'bower_components/jquery.countdown/dist/jquery.countdown.js',
              // 'bower_components/featherlight/release/featherlight.min.js',
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


      // Task: BrowserSync
      // ---------------------------------
      browserSync: {
        dev: {
            options: {
                proxy: '<%= proxy_url %>',
                files: [
                  '<%= build %>/css/*.css',
                  '<%= build %>/js/*.js',
                  '<%= build %>/**/*.jpg',
                  '<%= build %>/**/*.png',
                  '<%= build %>/**/*.svg',
                  '<%= build %>/*.php',
                  '<%= build %>/**/*.php',
                ],
                watchTask: true,
                ghostMode: {
                  clicks: true,
                  scroll: true,
                  links: true,
                  forms: true
                }
            }
        }
    }

    });

    grunt.registerTask( 'w', ['browserSync','watch'] );
    grunt.registerTask('css', ['less','cmq','cssmin']);
    grunt.registerTask('js', ['jshint', 'concat', 'uglify']);

    grunt.registerTask('default', ['less', 'cmq', 'cssmin', 'jshint', 'concat', 'uglify']);


};