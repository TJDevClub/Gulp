# Gulp

Gulp is an automation toolkit that lets you do a *lot* of cool things super
easily.

## Why would I use Gulp?

Gulp is used a lot in web development as an asset pipeline: often the assets
that you develop (sass files, javascript files, raw images, etc) are not what
you want to be serving in production environments. It's likely that you'll want
to compile files (like Sass files or ES6 files that aren't supported by the
browser), or minify files and images to improve loading time.

## How tho?

It's really easy. First, you need to install Gulp. In the terminal, run:

```bash
npm install -g gulp-cli # This installs the command line interface globally: you only need to run this once.
npm install -D gulp # This installs gulp for your project; you run this for every project you make. 
```

Now that you have Gulp installed, you can run `touch gulpfile.js` in the
terminal to create the file `gulpfile.js`. Gulp automatically looks for and runs
the Gulpfile.

Now look inside the example gulpfile (`gulpfile.example.js`).

There are a couple of things that you may find foreign, even if you know
Javascript. First off, Gulp uses Node.js to run. That's why there are the
require statements at the top:

```js
const gulp = require('gulp');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const runsequence = require('run-sequence');
const del = require('del');
const replace = require('gulp-replace');
```

Gulp doesn't actually know how to do anything at first - it just pipes all of
the data through whatever functions you specify. That's why it's called a "task
runner". It just runs whatever tasks you run. Fortunately for us, people who
know more than I do have written libraries that do things like convert ES6 to
ES5 (`gulp-babel`) or minify CSS (`gulp-cssnano`).

These libraries are packages on the Node Package Manager (`npm`), and you
install these the same way you installed gulp (`npm install -D <package-name>`).

Underneath is a lot of **Gulp task** declarations. Each task can be called
directly in the command line using `gulp <taskname>`, and they are just ways for
you to organize your different functions.

For example, all of the Javascript-related functions are in the `js` task. 
```js
gulp.task('js', () => {
	return gulp.src('dist/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});
```

You can also make a task chaining multiple tasks together, like in the `build`
task.

```js
gulp.task('build', () => {
	runsequence('clean:dist', 'useref', ['js', 'css', 'fonts', 'favicon']);
});
```

`runsequence` is a library that runs the tasks specified in the parameters in
series, and the tasks specified in arrays in parallel.

## Exercise

I've removed all of the libraries that minimize files from the example gulpfile.

**Write a new gulpfile that also minimizes that various CSS and Javascript files.**

See how fast you can get the page to load. For a benchmark, on my computer,
served locally, the unminified version loads in about 200ms, while the minified
version loads in less than 150ms. Of course, with larger sites that have more
content and more assets, the difference would be even larger.
