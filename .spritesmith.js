'use strict';

var util = require('util');

module.exports = [
  {
    src: './assets/penguin/*.png',
    destImage: './assets/penguin.png',
    destCSS: './assets/penguin.json',
    cssTemplate: require('spritesmith-texturepacker'),
    padding: 4,
    algorithmOpts: { sort: false }
  }
];
