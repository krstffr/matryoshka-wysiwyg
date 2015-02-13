# matryoshka-wysiwyg [![Build Status](https://travis-ci.org/krstffr/matryoshka-wysiwyg.svg?branch=master)](https://travis-ci.org/krstffr/matryoshka-wysiwyg)

So you're using [matryoshka](https://github.com/krstffr/matryoshka) for your meteor.js project and want to use a fancy Medium-like-editor instead of your ordinary <textarea>'s? Sure, no problem! Just `mrt add matryoshka-wysiwyg` and set the type of the field to 'wysiwyg' instead of 'textarea'. Now you'll get some Medium-like stuff. And even though you're writing actual HTML the content will be saved as markdown (smaller and more portable in my opinion).

The package is using [medium-editor](https://github.com/daviferreira/medium-editor) for the actual interface and [to-markdown](https://github.com/domchristie/to-markdown/) for converting HTML to markdown. Also uses the showdown meteor package for conversion form markdown to HTML. (Would be sweet if there was one package which did both ways, maybe there is?)

## Custom editorOptions

You can set your own [Toolbar options](https://github.com/daviferreira/medium-editor#toolbar-options) in your Meteor.settings. Set your options in the Meteor.settings.public["matryoshka-wysiwyg-editorOptions"] key. This is not super clean or intuitive but works.

## Buggy

This will contain bugs. Please be careful.

## Browser support

Currently only supported in Chrome and Safari. Other browsers will display a textarea with ordinary markdown.

## Todo

* Setting of options is not super clean from Meteor.settings.