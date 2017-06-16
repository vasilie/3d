// /////////////////////////////////////////////////
// Required
// /////////////////////////////////////////////////

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    order = require("gulp-order"),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    browserSync = require("browser-sync"),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    reload = browserSync.reload;

// /////////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////////

gulp.task("scripts",function(){
    gulp.src("app/js/*.js")
    .pipe(order([
        "app/js/jquery.min.js",
        "app/js/videojs-contrib-hls.js",
//        "app/js/Vimeo.js",
//        "app/js/video.min.js",
    ]))
    .pipe(concat('script.js'))
    .pipe(rename({suffix:'.min'}))
//    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js/'))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Styles Task
// /////////////////////////////////////////////////

gulp.task("styles",function(){
    gulp.src("app/sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      style:"compressed"
    }))
    .pipe(cleanCSS({compatibility: 'ie8'})) // Minify css 
    .pipe(concat('main.css'))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("app/assets/css/"))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////////

gulp.task("html", function(){
    gulp.src("app/**/*.html")
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////////////

gulp.task("watch",function(){
  gulp.watch("app/js/*.js",['scripts']);
  gulp.watch("app/sass/**/*.scss",['styles']);
  gulp.watch("app/**/*.html",['html']);
});

// /////////////////////////////////////////////////
// Browser-Sync Task/Default
// /////////////////////////////////////////////////
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir:"./app/"
    }
  })
});

// /////////////////////////////////////////////////
// Browser-Sync Task/Build
// /////////////////////////////////////////////////
gulp.task('build:server', function(){
  browserSync({
    server:{
      baseDir:"./build/"
    }
  })
});

// /////////////////////////////////////////////////
// BUILD Task *************************************
// /////////////////////////////////////////////////

// clear out all files and folders from build folder
gulp.task('build:cleanfolder', function(cb) {
   return del([
       'build/**'
   ], cb); 
});

//task to create build directory for all files
gulp.task('build:copy', ['build:cleanfolder'], function() {
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

//task to remove unwanted build files
//list all files and directories here that don't wont to include
gulp.task('build:remove', ['build:copy'], function(cb) {
   del ([
       'build/sass/',
       'build/js/',
       'build/bower_components/',
       'build/bower.json'
   ], cb);
});

// /////////////////////////////////////////////////
// Script Minify
// /////////////////////////////////////////////////

gulp.task('scriptmin', ['build:copy'], function() {
  return gulp.src('app/assets/js/*.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/assets/js/'))
});
// /////////////////////////////////////////////////
// HTML Minify
// /////////////////////////////////////////////////

gulp.task('htmlmin', ['build:copy'], function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'))
});

// /////////////////////////////////////////////////
// Image Minify
// /////////////////////////////////////////////////

gulp.task('imagemin', ['build:copy'], () =>
	gulp.src('app/assets/images/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('build/assets/images/'))
);

// /////////////////////////////////////////////////
// Default Task
// /////////////////////////////////////////////////
gulp.task("default",['styles', 'watch', 'browser-sync', 'scripts']);
gulp.task('build', ['build:copy', 'build:remove', 'build:server', 'htmlmin', 'imagemin', 'scriptmin']);