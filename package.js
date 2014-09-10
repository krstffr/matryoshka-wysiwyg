Package.describe({
    summary: "Wysiwyg support for Matryoshka.",
});

Package.onUse(function (api) {
  
  // Main Medium-Editor stuff
  api.add_files('medium-editor/medium-editor.min.js', 'client');
  api.add_files('medium-editor/medium-editor.min.css', 'client');
  api.add_files('medium-editor/themes/default.min.css', 'client');

  // to-markdown, from: https://github.com/domchristie/to-markdown/
  // This way of including it does NOT feel great, but since it's a NPM
  // module there is no easy way to use it on the client other than
  // this (that I know of).
  // Also: the 'var' in the beginning of 'var toMarkdown =' is removed by me.
  // Cause else that var is hidden. And we don't want that.
  // JS
  api.add_files('to-markdown/to-markdown.js', 'client');

  // Matryoshka Wysiwyg stuff
  // The HTML, JS and CSS.
  api.add_files(['matroyshka-wysiwyg.css', 'matryoshka-wysiwyg.js', 'matryoshka__customField__wysiwyg.html', 'matryoshka__customField__wysiwyg.js'], 'client');

  // We need to use Matryoshka and Template-stuff on the client
  api.use(['showdown', 'matryoshka', 'templating'], 'client');

});