var http = require('http'),
	compressor = require('../lib/node-minify');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, "127.0.0.1");

new compressor.minify({
	type: 'gcc',
	language: 'ECMASCRIPT5',
	fileIn: 'public/js/jquery-2.0.0.js',
	fileOut: 'public/js/jquery-2.0.0-gcc.js',
	callback: function(err, min){
		console.log('GCC jquery 2.0');
		console.log(err);
//		console.log(min);
	}
});

new compressor.minify({
	type: 'gcc',
	fileIn: 'public/js/base.js',
	fileOut: 'public/js/base-onefile-gcc.js',
	callback: function(err, min){
		console.log('GCC one file');
		console.log(err);
//		console.log(min);
	}
});

new compressor.minify({
	type: 'gcc',
	fileIn: ['public/js/base.js', 'public/js/base2.js'],
	fileOut: 'public/js/base-concat-gcc.js',
	callback: function(err, min){
		console.log('GCC multi files');
		console.log(err);
//        console.log(min);
	}
});

// Using YUI Compressor
new compressor.minify({
    type: 'yui',
    fileIn: 'public/css/base.css',
    fileOut: 'public/css/base-min-yui.css',
    callback: function(err, min){
		console.log('YUI CSS');
        console.log(err);
//        console.log(min);
    }
});

new compressor.minify({
    type: 'yui-js',
    fileIn: 'public/js/base.js',
    fileOut: 'public/js/base-min-yui.js',
    callback: function(err, min){
		console.log('YUI JS');
        console.log(err);
//        console.log(min);
    }
});

// Using UglifyJS
new compressor.minify({
    type: 'uglifyjs',
	fileIn: 'public/js/base.js',
	fileOut: 'public/js/base-onefile-uglify.js',
    callback: function(err, min){
		console.log('Uglifyjs');
        console.log(err);
//        console.log(min);
    }
});

new compressor.minify({
	type: 'no-compress',
	fileIn: ['public/js/base.js', 'public/js/base2.js'],
	fileOut: 'public/js/base-concat-no-compress.js',
	callback: function(err, min){
		console.log('No compress');
		console.log(err);
//        console.log(min);
	}
});

// Using Sqwish
new compressor.minify({
    type: 'sqwish',
	fileIn: ['public/css/base.css', 'public/css/base2.css'],
	fileOut: 'public/css/base-min-sqwish.css',
    callback: function(err, min){
		console.log('Sqwish');
        console.log(err);
//        console.log(min);
    }
});

// Using public folder option
new compressor.minify({
    type: 'yui-js',
    publicFolder: 'public/js/',
    fileIn: 'base.js',
    fileOut: 'public/js/base-min-yui-publicfolder.js',
    callback: function(err, min){
		console.log('YUI JS with publicFolder option');
        console.log(err);
//        console.log(min);
    }
});

new compressor.minify({
    type: 'yui-js',
    publicFolder: 'public/js/',
    fileIn: ['base.js', 'base2.js'],
    fileOut: 'public/js/base-min-yui-publicfolder-array.js',
    callback: function(err, min){
		console.log('YUI JS with publicFolder option and array');
        console.log(err);
//        console.log(min);
    }
});

console.log('Server running at http://127.0.0.1:1337/');