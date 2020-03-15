'use strict';

import gulp from 'gulp';
import watch from 'gulp-watch';
import concat from 'gulp-concat';
import concatCss from 'gulp-concat-css';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import autoprefixer from 'gulp-autoprefixer';
import optimizejs from 'gulp-optimize-js';

/*
 * Define our tasks using plain functions
 */

let handleError = (error) => {
	console.log("Babel" + error);
}

gulp.task('sass', () => {
	return gulp.src(['src/scss/*.scss', 'src/scss/*/*.scss'])
	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(concat('src/main.css'))
	.pipe(gulp.dest('src/'));
});


gulp.task('styles', () => {
	return gulp.src(['src/main.css'])
	.pipe(concatCss("src/main.min.css"))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cleanCSS({ compatibility: 'ie8' }))
	.pipe(gulp.dest('src/'));
});


gulp.task('watch', () => {
	gulp.watch(['src/scss/*.scss', 'src/scss/*/*.scss'], ['sass']);

	gulp.watch(['main.css'], ['styles']);
});

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
gulp.task('default', ['sass', 'styles', 'watch']);