'use strict';

// Import all of the libraries
// - These are specified by the package.json file, so you don't need to download them manually
const gulp = require('gulp');
const useref = require('gulp-useref'); // Parses HTML and concatenates CSS / JS files
const babel = require('gulp-babel'); // Converts ES6 to ES5
const autoprefixer = require('gulp-autoprefixer'); // Automatically adds browser prefixes to CSS
const runsequence = require('run-sequence'); // Allows you to run tasks in parallel / series
const del = require('del'); // Deletes stuff
const replace = require('gulp-replace'); // Replaces strings in files

gulp.task('test', () => {
	console.log('hi'); // Test function. You can call "gulp test" in the terminal and it will print 'hi'
});

gulp.task('clean:dist', () => {
	return del.sync('dist'); // Deletes the dist/ folder and rebuilds the entire thing (this insures you won't have any unused files in your production site)
});

gulp.task('useref', () => {
	return gulp.src('site/*.html') // Use all .html file in site/ as source files
		.pipe(useref()) // Combines CSS files into a single CSS file, and JS files into a single JS file.
		.pipe(replace(/http:\/\/localhost:3000/g, 'https://tjdev.club')) // Replace instances of localhost with tjdevclub
		.pipe(gulp.dest('dist')); // Put the resulting files into the dist/ directory
});

gulp.task('js', () => {
	return gulp.src('dist/**/*.js') // Parse any .js files in dist/ or any of its subdirectories
		.pipe(babel({
			presets: ['es2015'] // Converts the JS to ES2015
		}))
		.pipe(gulp.dest('dist')); // Put resulting files into the dist/ directory
});

gulp.task('css', () => {
	return gulp.src('dist/**/*.css')
		.pipe(autoprefixer())
		.pipe(gulp.dest('dist'));
});

gulp.task('fonts', () => {
	return gulp.src('site/assets/fonts/**/*')
		.pipe(gulp.dest('dist/assets/fonts')); // This just copies the fonts into dist/assets/fonts
});

gulp.task('favicon', () => {
	return gulp.src('site/favicon.ico')
		.pipe(gulp.dest('dist')); // Copies over the favicon
});

gulp.task('build', () => {
	runsequence('clean:dist', 'useref', ['js', 'css', 'fonts', 'favicon']); // Runs everything
});
