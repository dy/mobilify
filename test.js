'use strict';

var mobilify = require('./')
var assert = require('assert')
var toString = require('stream-to-string')
var fs = require('fs')
var path = require('path')
var toStream = require('string-to-stream')


toString(toStream(
`<!doctype html>
<html>
<head>
<title>test</title>
</head>
<body>
</body>
</html>
`
).pipe(mobilify())).then(data => {
  assert(data.length > 1000)
  assert(!/global/.test(data))
})
