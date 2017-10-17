const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');

const entryPoint = 'js/index.js';

gulp.task('trasnpiler', () => {
  return browserify(entryPoint, { debug: true })
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .pipe(source('index.js', 'components.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('jshint', () => {
  return gulp.src('js/**/*.js')
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', () => {
  return gulp.src(['scss/**/*.scss'])
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('htmlmin', () => {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));

});


gulp.task('default', ['trasnpiler', 'jshint', 'sass', 'htmlmin']);