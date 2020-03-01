let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

let config = {
  paths : {
    baseDir : "app/",
    src : {
      html : 'app/index.html',
      scss : 'app/scss/style.scss',
      js : 'app/js/**/*.js'
    },
    dest : {
      css : 'app/css',
      js : 'app/js'
    },
    watch : {
      html : 'app/*.html',
      scss : 'app/scss/**/*.scss',
      js : 'app/js/**/*.js'
    }
  },
  
  libs_name : 'libs'
}

gulp.task('scss', function(){
  return gulp.src(config.paths.src.scss)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 4 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.paths.dest.css))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css:libs', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css'
  ])
    .pipe(concat(config.libs_name + ".min.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.paths.dest.css))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src(config.paths.src.html)
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src(config.paths.src.js)
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js:libs', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(concat(config.libs_name + ".min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dest.js))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server : {
      baseDir : config.paths.baseDir
    }
  });
});

gulp.task('watch', function(){
  gulp.watch(config.paths.watch.scss, gulp.parallel('scss'));
  gulp.watch(config.paths.watch.html, gulp.parallel('html'))
  gulp.watch(config.paths.watch.js, gulp.parallel('js'))
});

gulp.task('default', gulp.series('js:libs', 'css:libs', gulp.parallel('scss', 'browser-sync', 'watch')));