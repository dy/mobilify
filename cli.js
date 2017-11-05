#! /usr/bin/env node

'use strict';

var mobilify = require('./');
var minimist = require('minimist');

if (process.stdin.isTTY) {
  printUsageAndExit();
}

var opts = minimist(process.argv.slice(2));

function printUsageAndExit () {
  console.error('Usage: mobilify < input.html > output.html');
  console.error('\n  Sample usage:');
  console.error('    $ browserify index.js | indexhtmlify | mobilify > index.html');
  process.exit(1);
}

if (opts.help) {
  printUsageAndExit();
}

process.stdin
  .pipe(mobilify(opts))
  .pipe(process.stdout);
