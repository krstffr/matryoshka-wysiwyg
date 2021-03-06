Package.describe({
  summary: 'Wysiwyg support for Matryoshka.',
  name: 'krstffr:matryoshka-wysiwyg',
  git: "https://github.com/krstffr/meteor-matryoshka-wysiwyg.git",
  version: '0.2.2'
});

Package.onUse(function ( api ) {
  
  api.versionsFrom("METEOR@0.9.0");

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
  api.use(['markdown@1.0.2', 'krstffr:matryoshka@1.0.2', 'templating', 'underscore'], 'client');

  api.export('MatryoshkaWysiwyg', 'client');

});

Package.on_test(function ( api ) {

  api.use('krstffr:matryoshka');
  api.use('krstffr:matryoshka-wysiwyg');

  api.use('tinytest');
  api.use('test-helpers');

  api.add_files('tests/matryoshka-wysiwyg-tests.js', 'client');

});