Package.describe({
    summary: "Pen-editor support for Matryoshka.",
});

Package.on_use(function (api) {
  
  // Pen stuff
  api.add_files(['lib/src/font/fontello.eot', 'lib/src/font/fontello.svg', 'lib/src/font/fontello.ttf', 'lib/src/font/fontello.woff'], 'client');
  api.add_files('lib/src/pen.css', 'client');
  api.add_files('lib/src/pen.js', 'client');
  api.add_files('override.css', 'client');

  // Matryoshka Pen stuff
  api.add_files(['matroyshka-pen.css', 'matryoshka-pen.js', 'matryoshka__customField__pen.html', 'matryoshka__customField__pen.js'], 'client');

  // We need to use Matryoshka and Templat-stuff on the client
  api.use(['matryoshka', 'templating'], 'client');

});
