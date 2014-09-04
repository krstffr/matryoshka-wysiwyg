Package.describe({
    summary: "Pen-editor support for Matryoshka.",
});

Package.on_use(function (api) {
  
  // Main Pen stuff
    // The icon font
    api.add_files(['lib/src/font/fontello.eot', 'lib/src/font/fontello.svg', 'lib/src/font/fontello.ttf', 'lib/src/font/fontello.woff'], 'client');
    // CSS
    api.add_files('lib/src/pen.css', 'client');
    // JS
    api.add_files('lib/src/pen.js', 'client');

  // to-markdown, from: https://github.com/domchristie/to-markdown/
  // This way of including it does NOT feel great, but since it's a NPM
  // module there is no easy way to use it on the client other than
  // this (that I know of).
  // Also: the 'var' in the beginning of 'var toMarkdown =' is removed by me.
  // Cause else that var is hidden. And we don't want that.
    // JS
    api.add_files('to-markdown/to-markdown.js', 'client');

  // Matryoshka Pen stuff
    // The HTML, JS and CSS.
    api.add_files(['matroyshka-pen.css', 'matryoshka-pen.js', 'matryoshka__customField__pen.html', 'matryoshka__customField__pen.js'], 'client');

  // We need to use Matryoshka and Template-stuff on the client
  api.use(['showdown', 'matryoshka', 'templating'], 'client');

});