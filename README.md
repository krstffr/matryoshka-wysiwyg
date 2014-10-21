# matryoshka-wysiwyg [![Build Status](https://travis-ci.org/krstffr/matryoshka-wysiwyg.svg?branch=master)](https://travis-ci.org/krstffr/matryoshka-wysiwyg)

So you're using [matryoshka](https://github.com/krstffr/matryoshka) for your meteor.js project and want to use a fancy Medium-like-editor instead of your ordinary <textarea>'s? Sure, no problem! Just `mrt add matryoshka-wysiwyg` and set the type of the field to 'wysiwyg' instead of 'textarea'. Now you'll get some Medium-like stuff. And even though you're writing actual HTML the content will be saved as markdown (smaller and more portable in my opinion).

The package is using [medium-editor](https://github.com/daviferreira/medium-editor) for the actual interface and [to-markdown](https://github.com/domchristie/to-markdown/) for converting HTML to markdown. Also uses the showdown meteor package for conversion form markdown to HTML. (Would be sweet if there was one package which did both ways, maybe there is?)

## Buggy

This will contain bugs. Please be careful.

## Browser support

Currently only supported in Chrome and Safari. Other browsers will display a textarea with ordinary markdown.