Package.describe({
    summary: "Pen-editor support for Matryoshka.",
});

Package.on_use(function (api) {
  

  // Main Pen stuff
    // The icon font
    api.add_files(['lib/src/font/fontello.eot', 'lib/src/font/fontello.svg', 'lib/src/font/fontello.ttf', 'lib/src/font/fontello.woff'], 'client');
    // CSS and JS
    api.add_files('lib/src/pen.css', 'client');
    api.add_files('lib/src/pen.js', 'client');


  // Matryoshka Pen stuff
    // The HTML, JS and CSS.
    api.add_files(['matroyshka-pen.css', 'matryoshka-pen.js', 'matryoshka__customField__pen.html', 'matryoshka__customField__pen.js'], 'client');


  // We need to use Matryoshka and Template-stuff on the client
  api.use(['matryoshka', 'templating'], 'client');


});
