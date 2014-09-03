Template.matryoshka__customField__pen.rendered = function () {

	// MOVE OVER THIS STUFF TO THE MAIN OBJECT AS WELL!

	MatryoshkaPen.addSaveBehaviour();

	var penOptions = {
		class: 'pen',
		list: ['bold', 'italic', 'h1', 'h2', 'h3', 'createlink'],
		stay: false
	};

	var editor = this.find('.matryoshka-pen-editor');
	var editorJQ = $(editor);
	if (editorJQ.length) {
		MatryoshkaPen.htmlMakeSureThereIsABlockElement( editorJQ );
		penOptions.editor = editor;
		var newEditor = new Pen(penOptions);
		document.execCommand('defaultParagraphSeparator', false, 'p');
	}

};

Template.matryoshka__customField__pen.helpers({
	browserIsSupported: function () {
		return true;
	}
});

Template.matryoshka__customField__pen.events({
	'blur .matryoshka-pen-editor': function ( e, tmpl ) {

		MatryoshkaPen.storePenContentOnBlur( e, tmpl, this );

	},
	'keyup .matryoshka-pen-editor': function ( e, tmpl ) {
		var editorElement = $(e.currentTarget);
		MatryoshkaPen.htmlCleanup( editorElement );
	}
});