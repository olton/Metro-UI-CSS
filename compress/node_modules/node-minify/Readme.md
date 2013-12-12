# Node-minify

  A very light minifier NodeJS module.

  Support:

  - YUI Compressor --version 2.4.8

  - Google Closure Compiler --version v20130411

  - UglifyJS2

  - Sqwish

  It allow you to compress JavaScript and CSS files.

  I recommend to execute it at boot time for production use.

  See `server.js` in `examples/`.

## Installation

```bash
npm install node-minify
```

## Quick Start

```js
var compressor = require('node-minify');

// Using Google Closure with jQuery 2.0
new compressor.minify({
	type: 'gcc',
	language: 'ECMASCRIPT5',
	fileIn: 'public/js/jquery-2.0.0.js',
	fileOut: 'public/js/jquery-2.0.0-gcc.js',
	callback: function(err, min){
		console.log('GCC jquery 2.0');
		console.log(err);
//        console.log(min);
	}
});

// Using Google Closure
new compressor.minify({
	type: 'gcc',
	fileIn: 'public/js/base.js',
	fileOut: 'public/js/base-min-gcc.js',
	callback: function(err, min){
		console.log(err);
//        console.log(min);
	}
});

// Array
new compressor.minify({
	type: 'gcc',
	fileIn: ['public/js/base.js', 'public/js/base2.js'],
	fileOut: 'public/js/base-onefile-gcc.js',
	callback: function(err, min){
		console.log(err);
//        console.log(min);
	}
});

// Only concatenation of files (no compression)
new compressor.minify({
    type: 'no-compress',
    fileIn: ['public/js/base.js', 'public/js/base2.js'],
    fileOut: 'public/js/base-onefile-gcc.js',
    callback: function(err, min){
		console.log(err);
//        console.log(min);
    }
});

// Using YUI Compressor for CSS
new compressor.minify({
	type: 'yui-css',
	fileIn: 'public/css/base.css',
	fileOut: 'public/css/base-min-yui.css',
	callback: function(err, min){
		console.log(err);
//        console.log(min);
	}
});

// Using YUI Compressor for JS
new compressor.minify({
	type: 'yui-js',
	fileIn: 'public/js/base.js',
	fileOut: 'public/js/base-min-yui.js',
	callback: function(err, min){
		console.log(err);
//        console.log(min);
	}
});

// Using UglifyJS for JS
new compressor.minify({
	type: 'uglifyjs',
	fileIn: 'public/js/base.js',
	fileOut: 'public/js/base-onefile-uglify.js',
	callback: function(err, min){
		console.log(err);
//        console.log(min);
	}
});

// Using Sqwish for CSS
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
```

## Concatenate Files

In order to concatenate files, simply pass in an array with the file paths to `fileIn`.

```js
fileIn: ['public/js/base.js', 'public/js/base2.js', ...]
```

## Max Buffer Size

In some cases you might need a bigger max buffer size (for example when minifying really large files).
By default the buffer is `1000 * 1024` which should be enough. If you however need more buffer, you can simply pass in the desired buffer size as an argument to `compressor.minify` like so:

```js
new compressor.minify({
	type: 'uglifyjs',
	fileIn: './public/css/base.css',
	fileOut: './public/css/base-min-uglifyjs.css',
	buffer: 1000 * 1024,
	callback: function(err){
		console.log(err);
	}
});
```

## Temp Path

You can define a temporary folder where temporary files will be generated :

```js
new compressor.minify({
	type: 'yui-js',
	fileIn: 'public/js/base.js',
	fileOut: 'public/js/base-min-yui.js',
	tempPath: '/tmp',
	callback: function(err){
		console.log(err);
	}
});
```

## YUI Compressor

  Yahoo Compressor can compress both JavaScript and CSS files.

  http://developer.yahoo.com/yui/compressor/

## Google Closure Compiler

  Google Closure Compiler can compress only JavaScript files.

  It will throw an error if you try with CSS files.

  http://code.google.com/closure/compiler

## UglifyJS

  UglifyJS can compress only JavaScript files.

  It will throw an error if you try with CSS files.

  https://github.com/mishoo/UglifyJS

## Sqwish

  Sqwish can compress only CSS files.

  https://github.com/ded/sqwish

## Warning

  It assumes you have Java installed on your environment for both GCC and YUI Compressor. To check, run:

```bash
java -version
```

## Windows support

  Since v0.5.0, a windows support is available for the no-compress option and uglify-js (thanks to pieces029 and benpusherhq)

## MIT License

Copyright (c) 2013 Rodolphe Stoclin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.