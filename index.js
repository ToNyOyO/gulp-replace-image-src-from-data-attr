'use strict';
var PluginError = require('plugin-error');
var through = require('through2');
var cheerio = require('cheerio');
var uriRegex = new RegExp("(http:|ftp:|https:)?//.+");

module.exports = function(opts) {
    var keepOrigin = false,
        sourceAttr = 'data-local-src';

    if (opts) {
        keepOrigin = opts.keepOrigin || false;
        sourceAttr = opts.sourceAttr || 'data-local-src';
    }

    return through.obj(function(file, enc, callback) {

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError('replace', 'Streaming not supported', { showStack: true }));
            return callback();
        }

        if (file.isBuffer()) {
            var $ = cheerio.load(file.contents.toString('UTF-8'), { decodeEntities: false } );
            var images = $('img');
            var changeCounter = 0;
            images.each(function() {
                if (this.attribs['src'] && this.attribs[sourceAttr]) {
                    var imageSrc = this.attribs['src'];
                    var localImageSrc = this.attribs[sourceAttr];
                    if(imageSrc && localImageSrc) {
                        var prependSrc = '';
                        if (keepOrigin && imageSrc.match(uriRegex)) {
                            prependSrc = imageSrc.substring(0, imageSrc.lastIndexOf('/') + 1);
                        }
                        this.attribs['src'] = prependSrc + localImageSrc;
                    }
                    changeCounter++;
                }
            });

            images.removeAttr(sourceAttr).html();

            if (changeCounter > 0) {
                var output = $.html();
                file.contents = new Buffer.from(output);
            }

            return callback(null, file);
        }
    });
};
