Template.matryoshka__customField__wysiwyg.rendered = function () {
	
	var editor = this.find('.matryoshka-wysiwyg-editor');

	if ($(editor).length) {

		// Init the actual editor
		var newEditor = new MediumEditor(editor, MatryoshkaWysiwyg.editorOptions);

		// Make sure the browser adds <p> tags for new lines.
		document.execCommand('defaultParagraphSeparator', false, 'p');

		// Clean UP html just in case.
		MatryoshkaWysiwyg.htmlCleanup( $(editor) );

	}

};

Template.matryoshka__customField__wysiwyg.helpers({
	browserIsSupported: function () {
		return MatryoshkaWysiwyg.isBrowserCompatible();
	},
	browserIsSupportedAndEditorIsActivated: function () {
		// Make sure we're on chrome or safari.
		// Well, in theroy at least.
		return MatryoshkaWysiwyg.isBrowserCompatible() && MatryoshkaWysiwyg.isEditorActive();
	}
});

Template.matryoshka__customField__wysiwyg.events({
	'click .matryoshka-wysiwyg-button-toggle': function () {
		// First update the doc!
		var currentNestable = Matryoshka.currentNestable.get();
		var updatedNestable = MatryoshkaWysiwyg.fieldTypeObject.saveMethod( currentNestable );
		Matryoshka.currentNestable.set( updatedNestable );
		// Then set the button to inactive.
		Session.set('matryoshka__wysiwyg__is-active', !Session.get('matryoshka__wysiwyg__is-active') );
	},
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