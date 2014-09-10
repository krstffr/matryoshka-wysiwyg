# matryoshka-wysiwyg

So you're using [matryoshka](https://github.com/krstffr/matryoshka) for your meteor.js project and want to use a fancy Medium-like-editor instead of your ordinary <textarea>'s? Sure, no problem! Just `mrt add matryoshka-wysiwyg` and set the type of the field to 'wysiwyg' instead of 'textarea'. Now you'll get some Medium-like stuff. And even though you're writing actual HTML the content will be saved as markdown (smaller and more portable in my opinion).

The package is using [wysiwyg](https://github.com/sofish/wysiwyg) for the actual interface and [to-markdown](https://github.com/domchristie/to-markdown/) for converting HTML to markdown. Also uses the showdown meteor package for conversion form markdown to HTML. (Would be sweet if there was one package which did both ways, maybe there is?)

## Buggy

This will contain bugs. Please be careful.

## Browser support

Currently only supported in Chrome, Safari and Firefox. Other browsers will display a textarea with ordinart markdown.

## Future

Maybe use this [project](https://github.com/daviferreira/medium-editor) instead for the UI? Is probably more like Medium and maybe more maintained?