# gulp-replace-image-src-from-data-attr [![Build Status](https://travis-ci.org/[ACCOUNT NAME]/gulp-replace-image-src-from-data-attr.svg?branch=master)](https://travis-ci.org/[ACCOUNT NAME]/gulp-replace-image-src-from-data-attr)

> Replace the \"src\" attribute of \<img\> tags with specific path from the \"data-local-src\" attribute in HTML files. 

It is very easy to replace the test IMG "src" with an alternative "src".

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-replace-image-src-from-data-attr`

## Usage

```javascript
var rep = require('gulp-replace-image-src-from-data-attr');
var gulp = require('gulp');

gulp.task('replace', function() {
  gulp.src('*.html')
    .pipe(rep({
      keepOrigin : false
    }))
    .pipe(gulp.dest('dist'));
});
```
The original HTML is like:
```html
<body>
  <div class="icon1">
    <img src="/public/icon4.png" data-local-src="images/icon4.png" />
  </div>
  <div class="icon1_1">
    <img src="../icon4-1.png" data-local-src="images/icon4-1.png" />
  </div>
</body>
```
After replaced, it will be like:
```html
<body>
  <div class="icon1">
    <img src="images/icon4.png" />
  </div>
  <div class="icon1_1">
    <img src="images/icon4-1.png" />
  </div>
</body>
```

If the "src" starts with **"http:|ftp:|https:|//"**, then it will **NOT** be replaced.
## API

### replace(options)

Options, Type: `Object`.

#### options.keepOrigin

Type:`Boolean`

Default:`false`

If the value is `true`, then the new "src" is prepended to the origin "src".