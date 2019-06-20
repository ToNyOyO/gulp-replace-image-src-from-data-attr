var gutil = require('gulp-util');
var mocha = require('mocha');
var assert = require('assert');
var fs = require('fs');
var path = require('path');


var replace = require('../index');

var read = function(name) {
	return fs.readFileSync(path.join(__dirname, name));
};

mocha.describe('prepends src in "img" tag of html from preceding comment tag', function() {
	it('reads preceding comment tag and adds to "src" of "img"', function() {
		var stream = replace({
            keepOrigin: false
		});

		stream.write(new gutil.File({
			contents: read('index.html')
		}));

		stream.once('data', function (file) {
			var value1 = file.contents.toString('utf8').trim();
			var value2 = read('expected.html').toString('utf8').trim();
			assert.strictEqual(value1, value2);
		});
		stream.end();
	});
});

mocha.describe('prepends src in "img" tag of html from preceding comment tag', function() {
    it('reads preceding comment tag and adds to "src" of "img"', function() {
        var stream = replace({
            keepOrigin: true
        });

        stream.write(new gutil.File({
            contents: read('index.html')
        }));

        stream.once('data', function (file) {
            var value1 = file.contents.toString('utf8').trim();
            var value2 = read('expected-origin.html').toString('utf8').trim();
            assert.strictEqual(value1, value2);
        });
        stream.end();
    });
});