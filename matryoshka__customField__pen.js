Template.matryoshka__customField__pen.rendered = function () {
	// Get the editor in this template (if the is one)
	// There might not be one if the user is on a uncool browser.
	var editor = this.find('.matryoshka-pen-editor');
	if ($(editor).length) {
		// Prepare the HTML inside the input div.
		MatryoshkaPen.htmlMakeSureThereIsABlockElement( $(editor) );
		// Init the actual editor
		var newEditor = new Pen(
			_.extend(MatryoshkaPen.editorOptions, { editor: editor })
			);
		// Make sure the browser adds <p> tags for new lines.
		document.execCommand('defaultParagraphSeparator', false, 'p');
	}
};

Template.matryoshka__customField__pen.helpers({
	browserIsSupported: function () {
		// Make sure we're on chrome or safari.
		// Well, in theroy at least.
		return navigator.userAgent.toLowerCase().match(/chrome|safari/g);
	}
});

Template.matryoshka__customField__pen.events({
	'blur .matryoshka-pen-editor': function ( e, tmpl ) {
		// On blur we should store a cached version of the content.
		var editorElement = $( e.currentTarget );
		editorElement.addClass('matryoshka-pen-editor--to-be-saved');
		MatryoshkaPen.storePenContentOnBlur( e, tmpl, this );
	},
	'keyup .matryoshka-pen-editor': function ( e, tmpl ) {
		// On keyup we should make sure the HTML is as clean and nice as we want it to be.
		var editorElement = $( e.currentTarget );
		MatryoshkaPen.htmlCleanup( editorElement );
	}
});