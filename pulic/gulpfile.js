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

gulp.task('trasnpiler', ()=>{
	return browserify(entryPoint, {debug: true})
	.transform(babelify, {presets: ['es2015']})
	.bundle()
	.pipe(source('index.js'))
	.pipe(buffer())
	.pipe(gulp.dest('./dist/js'));
});

gulp.task('jshint', ()=>{
	return gulp.src('pulic/js/**/*.js')
	.pipe(jshint({ esversion: 6 }))
	.pipe(jshint.reporter('default'));
});


gulp.task('default', ['trasnpiler', 'jshint']);