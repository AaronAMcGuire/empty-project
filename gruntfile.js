module.exports = function(grunt){
var mozjpeg = require('imagemin-mozjpeg');
grunt.initConfig({
  // load your configs here


//basic watch task
  watch: {
  scripts: {
    files: ['src/styles/*'],
    tasks: ['browserSync','sass','pug'],
  },
},

// Automatically imports sass files into main.scss
sass_globbing: {
    your_target: {
      files: {
        'src/styles/main.scss': 'src/styles/sass/**/*.scss',
      },
      options: {
        useSingleQuotes: false,
        signature: '// do not touch this file if you wish to update it run the sass_globbing grunt task and it will auto-import your newly added files.'
      }
    }
  },



  //Sass compiler
  sass: {
    dist: {
      options: {
        style: 'expanded'
      },
      files: {
        'src/styles/main.css': 'src/styles/main.scss'

      }
    }
  },

  pug: {
    compile: {
      options: {
        data: {
          debug: false
        }
      },
      files: {
        'src/index.html': ['src/pug/*.pug']
      }
    }
  },



//loads browsersync live reload version of current website
  browserSync: {
      bsFiles: {
          src : 'src/styles/*.css'
      },
      options: {
          watchTask: true,
          proxy:'empty-project.dev'
      }
  },

  cssmin: {
  options: {
    mergeIntoShorthands: false,
    roundingPrecision: -1
  },
  target: {
    files: {
      'dist/styles/main.css': 'src/styles/main.css'
    }
  }
},

htmlmin: {
   dist: {
     options: {
       removeComments: true,
       collapseWhitespace: true
     },
     files: {
       'dist/index.html': 'src/index.html'
     }
   }
 },

 imagemin: {                          // Task
    static: {                          // Target
      options: {                       // Target options
        optimizationLevel: 7,
        svgoPlugins: [{ removeViewBox: false }],
        use: [mozjpeg()]
      }
    },
    dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion
        cwd: 'src/images/',                   // Src matches are relative to this path
        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'dist/images/'                  // Destination path prefix
      }]
    }
  },
  csscomb: {
       optimisation: {
           files: {
               'dist/main.css': ['dist/main.css']
           }
       }
   }










});
grunt.registerTask('dist', function() {
  grunt.task.run('cssmin','imagemin','htmlmin');
  grunt.log.writeln('You are currently running the dist task - minifying all files and outputting in the dist folder. Dont forget to also run the optimise task for micro-optimisation tasks');
});


// need to add more optimisation tasks
grunt.registerTask('optimise', function() {
  grunt.task.run('cssmin','imagemin','htmlmin');
  grunt.log.writeln('You are currently running the optimise tasks - this task is for micro-optimisation e.g. alphabetising css class names');
});


  // load your tasks here
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-pug');

  //build tasks
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  //micro-optimisation tasks

  grunt.loadNpmTasks('grunt-csscomb');







};
