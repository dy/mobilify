'use strict';

var hyperstream = require('hyperstream')
var fs = require('fs')
var path = require('path')
var uglifycss = require('uglifycss').processString
var pkgUp = require('pkg-up')
var extend = require('object-assign')
var defined = require('defined')
var toStream = require('string-to-stream')
var wrap = require('wrap-stream')
var add = require('add-stream')
var minify = require('minify-stream')

module.exports = mobilify;

function assetStream (name) {
  return fs.createReadStream(path.join(__dirname, 'assets', name))
}

function depStream (name) {
  return fs.createReadStream(require.resolve(name))
}

function getPkg () {
  var pkgPath = pkgUp.sync();
  return pkgPath ? JSON.parse(fs.readFileSync(pkgPath).toString()) : undefined;
}

function mobilify (opts) {
  var pkg = getPkg()
  opts = extend(pkg['mobilify'] || {}, opts || {})

  opts.normalize = defined(opts.normalize, true)
  opts.meta = defined(opts.meta, true)
  opts.audio = defined(opts.audio, true)
  opts.array = defined(opts.array, true)

  var jsStream = assetStream('array.js')
    .pipe(add(depStream('typedarray-methods')))
    .pipe(add(depStream('get-float-time-domain-data')))
    .pipe(minify({ sourceMap: false }))
    .pipe(wrap('<script>', '</script>'))

  var cssStream = toStream(
      uglifycss(fs.readFileSync(require.resolve('normalize.css'), 'utf-8').toString())
    )
    .pipe(add(assetStream('style.css')))
    .pipe(wrap('<style type="text/css">', '</style>'))

  return hyperstream({
    head: {_appendHtml: cssStream},
    body: {_prependHtml: jsStream}
  })
}
