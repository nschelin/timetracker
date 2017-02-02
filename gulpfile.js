'use strict';
const del = require('del');
const merge = require('merge2');
const config = require('./gulp.config')();

const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });
const tsProject = $.typescript.createProject('tsconfig.json', { declaration: true });

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('serve:dev', ['copy', 'ts'], function(){

})

gulp.task('copy', ['clean', 'copyServer', 'copyIndex', 'copyJs', 'copyResources'])

gulp.task('copyServer', function() {
	return gulp.src(config.server.path + '/**')
				.pipe(gulp.dest(config.dest.path));
});

gulp.task('copyIndex', function() {
	return gulp.src(config.client.index)
				.pipe(gulp.dest(config.dest.index));
})

gulp.task('copyResources', function(){
	return gulp.src([config.client.path + '/**', '!**/*.ts', '!**/*.js'])
				.pipe(gulp.dest(config.dest.path));
})

gulp.task('copyJs', function() {
	return gulp.src([config.client.sysJs])
				.pipe(gulp.dest(config.dest.js));
})

gulp.task('ts', function() {
	var tsResult = tsProject.src()
							.pipe($.sourcemaps.init())
							.pipe(tsProject());
	log(config.dest.path + '/app')
	return tsResult.js.pipe(gulp.dest(config.dest.path + '/app'));
});

gulp.task('clean', function(){
	log('Cleaning...');
	return clean(config.cleanPath);
});


// Helper functions
// 

function log(message) {
	if(typeof(message) === 'object') {
		for(let item in message) {
			if(mesage.hasOwnProperty(item)) {
				$.util.log($.util.colors.cyan(message[item]));
			}
		}
	}
	else {
		$.util.log($.util.colors.cyan(message));
	}
}


function clean(path) {
	return del.sync(path);
}