"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); //Transforms React JSX to JS
var source = require('vinyl-source-stream');    //Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
    port: 9006,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start a local dev server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//Task to open the file
gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open('', {url: config.devBaseUrl + ':' + config.port + '/'}));
});

//Task to put all html from src into dist
gulp.task('html', function() {
    gulp.src(config.paths.html)           //grab all html files
    .pipe(gulp.dest(config.paths.dist))     //put the in the dist destination path
    .pipe(connect.reload());                //reload after the tast is done
});

//TAsk to deal with javascript. Transform to JSX to JS, bundle al lJS files in to one, 
//throw error if there is a problem and pipe the result to the bundle file called bundle.js and point it to the bundle destination
gulp.task('js', function() {
    browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts/'))
    .pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

//Default task for ease. Takes array of tasks to run by default
gulp.task('default', ['html', 'js', 'lint', 'css', 'open', 'watch']);