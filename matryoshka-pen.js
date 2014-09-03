function MatryoshkaPenHandler() {

	var that = this;

	// This is for setting up the field type in Matryoshka.
	// Else Matryoshka will think the "pen" type is invalid.
	that.fieldTypeObject = {
		name: 'pen',
		templateFileName: 'matryoshka__customField__pen',
		getContentJqueryMethod: 'html'
	};

	// Here all changes are stored, and will be saved when we choose to
	that.nestablesToSaveLater = {};

	// The custom method for storing the data from the pen editor.
	// Is needed because of weird current-HTML-content-vs-the-session-contents bug.
	// Probably something with contenteditable vs. Meteor.js
	that.storeNestable = function ( value, key, matryoshkaId ) {
		var updatedSession = Matryoshka.addValueInObjectBasedOnId( Session.get('matryoshkaCurrentNestable'), matryoshkaId, 'put', key, value);
		Session.set('matryoshkaCurrentNestable', updatedSession );
	};

	// This method adds events to the Matroshka save button, so that all content will
	// be saved to the Session before the DB save.
	that.addSaveBehaviour = function () {
		$('.matroyska-nestable-go-live')
		// Remove all currently bound click events
		.off('click')
		.on('click', function () {
			$('.matryoshka-pen-editor').height( $('.matryoshka-pen-editor').height() ).html(' ');
			_.each(that.nestablesToSaveLater, function( toSave, key ){
				// Prepare the stuff to be saved, remove all space chars.
				toSave.value = toSave.value.replace(/\s+/g, " ").trim();
				MatryoshkaPen.storeNestable( toSave.value, toSave.key, key );
			});
		});
	};

	// This method will be run on blur on all pen editor fields.
	that.storePenContentOnBlur = function ( e, tmpl, context ) {

		var input = $(tmpl.find('.matryoshka-pen-editor'));
		var matryoshkaId = input.data('parent-id');

		// Add the id, key and value to be saved later
		MatryoshkaPen.nestablesToSaveLater[ matryoshkaId ] = {
			key: context.name,
			value: input.html()
		};
	};

	// Method for cleaning up the generated HTML
	that.htmlCleanup = function ( editorElement ) {

		// For Firefox...
		editorElement.find('[type=_moz]').remove();

		var editorHtml = editorElement.html();
		var htmlLen = editorHtml.replace(/ /g, '').replace(/\n/g, '').length;
		// var textLen = editorElement.text().replace(/(\r\n|\n|\r)/gm,'').replace(/ /g, '').length;
		
		if (htmlLen < 1) {
			console.log('adding <p> since content is all empty...');
			editorElement.html('<p>&nbsp;</p>').blur();
			Meteor.setTimeout(function () {
				editorElement.focus();
			}, 1);
		}

		that.htmlMakeSureThereIsABlockElement( editorElement );

		editorElement.find('span').replaceWith( editorElement.find('span').contents() );

	};

	that.htmlMakeSureThereIsABlockElement = function ( editorElement ) {
		// Is there no child element?
		// Meaning: there should be at least a p!
		// BUG: There should be a block level element, <i> or <b> are not gonna do it!
		var blockLvlChildren = editorElement.children().filter(function() {
			return $(this).css("display") === "block";
		});

		if ( blockLvlChildren.length < 1 ) {
			console.log('wrapping inner with a <p> cause there are no inner elements...');
			editorElement.wrapInner('<p />');
		}
	};


	that.init = function () {
		// Add support for the "pen" field type
		Matryoshka.userDefinedFields.add( that.fieldTypeObject );
	};

	that.init();

}

MatryoshkaPen = new MatryoshkaPenHandler();