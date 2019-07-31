var gutil = require('gulp-util');
var mocha = require('mocha');
var assert = require('assert');
var fs = require('fs');
var path = require('path');


var replace = require('../index');

var read = function(name) {
	return fs.readFileSync(path.join(__dirname, name));
};

mocha.describe('changes src in "img" tag of html from "data-local-src" attribute while deleting "img" origin', function() {
	it('reads "data-local-src" of img tag and adds to "src" of "img"', function() {
		var stream = replace({
            keepOrigin: false,
            sourceAttr: 'data-local-src'
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

mocha.describe('changes src in "img" tag of html from "data-local-src" attribute while keeping "img" origin', function() {
    it('reads "data-local-src" of img tag and adds to "src" of "img"', function() {
        var stream = replace({
            keepOrigin: true,
            sourceAttr: 'data-local-src'
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

mocha.describe('changes src in "img" tag of html from "alt" attribute while deleting "img" origin', function() {
    it('reads "alt" of img tag and adds to "src" of "img"', function() {
        var stream = replace({
            keepOrigin: false,
            sourceAttr: 'alt'
        });

        stream.write(new gutil.File({
            contents: read('index-attr.html')
        }));

        stream.once('data', function (file) {
            var value1 = file.contents.toString('utf8').trim();
            var value2 = read('expected.html').toString('utf8').trim();
            assert.strictEqual(value1, value2);
        });
        stream.end();
    });
});
