var minify = (function (undefined) {

    var exec = require('child_process').exec,
	    _fs = require('fs');

    var minify = function (options) {
        this.type = options.type;
        this.language = options.language || null;
        this.tempFile = (options.tempPath || '') + new Date().getTime().toString();

        /**
         * Manage public folder option
         */
        if (typeof options.fileIn === 'object' && options.fileIn instanceof Array && typeof options.publicFolder === 'string') {
            for (var x in options.fileIn) {
                options.fileIn[x] = options.publicFolder + options.fileIn[x];
            }
        } else if (typeof options.publicFolder === 'string') {
            options.fileIn = options.publicFolder + options.fileIn;
        }

        // GCC need an array
        if (options.type === 'gcc' && typeof options.fileIn === 'string') {
            this.fileIn = [options.fileIn];
        } else if (typeof options.fileIn === 'string') {
            this.fileIn = options.fileIn;
        }

        if (typeof options.fileIn === 'object' && options.fileIn instanceof Array && options.type !== 'gcc') {
            var out = options.fileIn.map(function(path) {
                return _fs.readFileSync(path, 'utf8');
            });

            _fs.writeFileSync(this.tempFile, out.join('\n'), 'utf8');

            this.fileIn = this.tempFile;
        } else if (typeof options.fileIn === 'object' && options.fileIn instanceof Array && options.type === 'gcc') {
            this.fileIn = options.fileIn;
        }

        this.fileOut = options.fileOut;
        this.options = options.options || [];
        this.buffer = options.buffer || 1000 * 1024;
        this.copyright = options.copyright || false;

        if (typeof options.callback !== 'undefined') {
            this.callback = options.callback;
        }

        this.compress();
    };

    minify.prototype = minify.fn = {
        type: null,
        fileIn: null,
        fileOut: null,
        copyright: false,
        callback: null,
        buffer: null, // with larger files you will need a bigger buffer for closure compiler
        compress: function () {
            var self = this, command;
            var platform = require('os').platform();
            var prefix = (platform === 'win32') ? 'node ' : '';

            switch (this.type) {
                case 'yui':
                case 'yui-css':
                    command = 'java -jar -Xss2048k "' + __dirname + '/yuicompressor-2.4.8.jar" "' + this.fileIn + '" -o "' + this.fileOut + '" --type css ' + this.options.join(' ');
                    break;
                case 'yui-js':
                    command = 'java -jar -Xss2048k "' + __dirname + '/yuicompressor-2.4.8.jar" "' + this.fileIn + '" -o "' + this.fileOut + '" --type js ' + this.options.join(' ');
                    break;
                case 'gcc':
                    var fileInCommand = this.fileIn.map(function (file) {
                        return '--js="' + file + '"';
                    });
                    command = 'java -jar "' + __dirname + '/google_closure_compiler-v20130411.jar" ' + fileInCommand.join(' ') + ' --language_in=' + (this.language || 'ECMASCRIPT3') + ' --js_output_file="' + this.fileOut + '" ' + this.options.join(' ');
                    break;
                case 'uglifyjs':
                    command = prefix + '"' + __dirname + '/../node_modules/uglify-js/bin/uglifyjs" --output "' + this.fileOut + '" ' + ' "' + this.fileIn + '" ' + this.options.join(' ') + (this.copyright ? '--comments' : '') ;
                    break;
                case 'sqwish':
                    command = prefix + '"' + __dirname + '/../node_modules/sqwish/bin/sqwish" "' + this.fileIn + '" -o "' + this.fileOut + '" ' + this.options.join(' ');
                    break;
                // Useful when wanting only to concatenate the files and not to compress them     
                case 'no-compress':
                    var os = _fs.createWriteStream(this.fileOut);
                    var is = _fs.createReadStream(this.fileIn);
                    is.pipe(os);
                    command = ''; //set command to nothing so it doesn't error on undefined
                    break;
            }

            exec(command, { maxBuffer: this.buffer }, function (err, stdout, stderr) {
                if (self.fileIn === self.tempFile) {
                    // remove the temp concat file here
                    _fs.unlinkSync(self.tempFile);
                }

                if (self.callback) {
                    if (err) {
                        self.callback(err);
                    } else {
                        self.callback(null, _fs.readFileSync(self.fileOut, 'utf8'));
                    }
                }
            });
        }
    };

    return minify;

})();

exports.version = '0.8.1';
exports.minify = minify;
