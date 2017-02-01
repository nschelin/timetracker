'use strict';

let config = function() {
	var src = './src';
	var serverPath = src + '/server';
	var clientPath = src + '/client';
	var destPath = './dest';

	return {
		client: {
			path: clientPath,
			index: clientPath + '/index.html',
			sysJs: clientPath + '/systemjs.config.js',
			app: clientPath + '/app'
		},
		server: {
			path: serverPath
		},
		dest: {
			path: destPath,
			index: destPath,
			js: destPath + '/js'
		},
		cleanPath: destPath + '/**/*'
	};

};



module.exports = config;