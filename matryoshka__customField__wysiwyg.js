Template.matryoshka__customField__wysiwyg.rendered = function () {
	
	var editor = this.find('.matryoshka-wysiwyg-editor');

	if ($(editor).length) {

		// Init the actual editor
		var newEditor = new MediumEditor(editor, MatryoshkaWysiwyg.editorOptions);

		// Make sure the browser adds <p> tags for new lines.
		document.execCommand('defaultParagraphSeparator', false, 'p');
	}

};

Template.matryoshka__customField__wysiwyg.helpers({
	browserIsSupported: function () {
		// Make sure we're on chrome or safari.
		// Well, in theroy at least.
		return MatryoshkaWysiwyg.isBrowserCompatible();
	}
});

Template.matryoshka__customField__wysiwyg.events({
	'blur .matryoshka-wysiwyg-editor': function ( e, tmpl ) {
		// On blur we should store a cached version of the content.
		var editorElement = $( e.currentTarget );
		editorElement.addClass('matryoshka-wysiwyg-editor--to-be-saved');
		MatryoshkaWysiwyg.storeWysiwygContentOnBlur( e, tmpl, this );
	},
	'input .matryoshka-wysiwyg-editor': function ( e, tmpl ) {
		// On keyup we should make sure the HTML is as clean and nice as we want it to be.
		var editorElement = $( e.currentTarget );
		MatryoshkaWysiwyg.htmlCleanup( editorElement );
	}
});