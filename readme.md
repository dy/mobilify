# mobilify [![Build Status](https://travis-ci.org/dfcreative/mobilify.svg?branch=master)](https://travis-ci.org/dfcreative/mobilify) [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges)

> Make stream of HTML mobile-friendly

## Usage

[![npm install mobilify](https://nodei.co/npm/mobilify.png?mini=true)](https://npmjs.org/package/mobilify/)

This tool works great with [indexhtmlify](https://github.com/dominictarr/indexhtmlify), [html-inject-meta](https://github.com/rreusser/html-inject-meta) and [html-inject-github-corner](https://github.com/rreusser/html-inject-github-corner). For example:

```sh
$ browserify index.js | indexhtmlify | html-inject-meta | html-inject-github-corner | mobilify > index.html
```

Or from js:

```js
var mobilify = require('mobilify')

fs.createReadStream('index.html')
  .pipe(mobilify())
  .pipe(fs.createWriteStream('output.html'))
```

It takes a stream of html and includes mobile meta tags, [`normalize.css`](https://www.npmjs.com/package/normalize.css), polyfills typed arrays and `Array.fill`.

### See Also

- [enable-mobile](https://github.com/dfreative/enable-mobile)
- [indexhtmlify](https://github.com/dominictarr/indexhtmlify)
- [html-inject-meta](https://github.com/rreusser/html-inject-meta)
- [html-inject-github-corner](https://github.com/rreusser/html-inject-github-corner)

### License

&copy; 2017 Dmitry Ivanov. MIT License.
