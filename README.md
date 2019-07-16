# gulp-replace-image-src-from-data-attr [![Build Status](https://travis-ci.org/ToNyOyO/gulp-replace-image-src-from-data-attr.svg?branch=master)](https://travis-ci.org/ToNyOyO/gulp-replace-image-src-from-data-attr)


> Replace the \"src\" attribute of \<img\> tags with specific path from the \"data-local-src\" attribute in HTML files. 

It is very easy to replace the IMG "src" with an alternative "src" throughout your project HTML file.

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-replace-image-src-from-data-attr`

## Usage

#### Example 1:
Replace images and copy the new file to a folder in the root called `dist`. 
```javascript
var rep = require('gulp-replace-image-src-from-data-attr');
const gulp = require('gulp');

function replace() {

    return gulp
        .src('**/*.html')
        .pipe(rep({
            keepOrigin : false
        }))
        .pipe(gulp.dest('dist/'));

}

exports.replace = replace;
exports.default = replace;
```
#### Example 2:
Using the [gulp-rename](https://www.npmjs.com/package/gulp-rename) package to create the file in the _exising directory_ and adding `-dist` to the end of the filename:
```javascript
var rep = require('gulp-replace-image-src-from-data-attr');
const gulp = require('gulp');
const rename = require('gulp-rename');

function replace() {

    return gulp
        .src('gtm_*/*.html')
        .pipe(rep({
            keepOrigin : false
        }))
        .pipe(rename(function(path){
            path.basename += '-dist';
        }))
        .pipe(gulp.dest('.'));
}

exports.replace = replace;
exports.default = replace;
```
If the original HTML is like this:
```html
<body>
  <div class="anIconClass">
    <img src="/public/iconA.png" data-local-src="images/icon1.png" />
  </div>
  <div class="anotherClass">
    <img src="../iconB.png" data-local-src="images/icon1-1.png" />
  </div>
  <div>
    <img src="http://a.cdn.com/iconC.png" data-local-src="images/icon1-2.png" />
  </div>
</body>
```
After running it will be like this:
```html
<body>
  <div class="anIconClass">
    <img src="images/icon1.png" />
  </div>
  <div class="anotherClass">
    <img src="images/icon1-1.png" />
  </div>
  <div>
    <img src="http://a.cdn.com/icon1-2.png" />
  </div>
</body>
```

## API

### replace(options)

Options, Type: `Object`.

#### options.keepOrigin

Type:`Boolean`

Default:`false`

If the value is `true`, and the the "src" starts with **"http:|ftp:|https:|//"**, then the new "src" is prepended to the origin "src".

#### (Shout out to the maker of "gulp-replace-image-src" which was the basis for this tool) 
