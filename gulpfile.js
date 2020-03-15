const gulp = require('gulp');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

function watch_files() {
	watch(['src/stylesheets/*.scss', 'src/stylesheets/*/*.scss'], function () {
		return gulp.src(['src/stylesheets/*.scss', 'src/stylesheets/*/*.scss'])
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('src/stylesheets/'))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('src/stylesheets/'));
	});

}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
exports.watch = watch_files;
exports.default = watch_files;
