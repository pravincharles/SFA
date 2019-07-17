'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();

function handleError(err) { console.log(err.toString()); }

gulp.task('build-sass', () => {
  return gulp.src('./*.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.notify('Compile Sass File: <%= file.relative %>...'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      style: 'compressed'
    })).on('error', handleError)
    .pipe(plugins.autoprefixer('last 10 versions'))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('./'));
});

// ############################################################################################
// ############################################################################################

gulp.task('watch-sass', () => {
  plugins.notify('Sass Stream is Active...');
  gulp.watch('./**/*.scss', ['build-sass']);
});

// ############################################################################################
// ############################################################################################

gulp.task('default', ['build-sass']);
gulp.task('watch', ['watch-sass']);
