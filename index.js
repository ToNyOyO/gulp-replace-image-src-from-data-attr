'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var cheerio = require('cheerio');
var uriRegex = new RegExp("(http:|ftp:|https:)?//.+");

module.exports = function(opts) {
    var keepOrigin = false;
    if (opts) {
        keepOrigin = opts.keepOrigin || false;
    }

    return through.obj(function(file, enc, callback) {

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('Streaming not supported'));
            return callback();
        }

        if (file.isBuffer()) {
            var $ = cheerio.load(file.contents.toString('UTF-8'), { decodeEntities: false } );
            var images = $('img');
            images.each(function() {
                if (this.attribs['src'] && this.attribs['data-local-src']) {
                    var imageSrc = this.attribs['src'];
                    var localImageSrc = this.attribs['data-local-src'];
                    if(imageSrc && localImageSrc) {
                        var prependSrc = '';
                        if (keepOrigin && imageSrc.match(uriRegex)) {
                            prependSrc = imageSrc.substring(0, imageSrc.lastIndexOf('/') + 1);
                        }
                        this.attribs['src'] = prependSrc + localImageSrc;
                    }
                }
            });

            images.removeAttr('data-local-src').html();

            var output = $.html();

            file.contents = new Buffer(output);

            return callback(null, file);
        }
    });
};