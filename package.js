Package.describe({
    summary: "Wysiwyg support for Matryoshka.",
});

Package.onUse(function (api) {
  

  // EXTERNAL THINGS
    // medium-editor, from: https://github.com/daviferreira/medium-editor/
    api.add_files('medium-editor/medium-editor.min.js', 'client');
    api.add_files('medium-editor/medium-editor.min.css', 'client');
    api.add_files('medium-editor/themes/default.min.css', 'client');

    // to-markdown, from: https://github.com/domchristie/to-markdown/
    api.add_files('to-markdown/to-markdown.js', 'client');


  // The HTML + JS
  api.add_files(['views/matryoshka__customField__wysiwyg.html', 'views/matryoshka__customField__wysiwyg.js'], 'client');
  // The Main stuff
  api.add_files(['matryoshka-wysiwyg.js'], 'client');
  // The CSS
  api.add_files(['css/matroyshka-wysiwyg.css'], 'client');


  // We need to use Matryoshka and Template-stuff on the client
  api.use(['showdown', 'matryoshka', 'templating'], 'client');


});