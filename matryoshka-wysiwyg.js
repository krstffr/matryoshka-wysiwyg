function MatryoshkaWysiwygHandler() {

	var that = this;

	// This is for setting up the field type in Matryoshka.
	// Else Matryoshka will think the "wysiwyg" type is invalid.
	that.fieldTypeObject = {
		name: 'wysiwyg',
		templateFileName: 'matryoshka__customField__wysiwyg',
		initMethod: function () {
			Session.setDefault('matryoshka__wysiwyg__is-active', true );
		},
		saveMethod: function ( doc ) {

			// Iterate over each "cached" field content and store it.
			_.each(that.nestablesToSaveLater, function( toSave, key ){
				that.debugger.log('a doc to save!');

				// Change all extra spaces to "ordinary" spaces
				toSave.value = toSave.value.replace(/&nbsp;/g, ' ');
				
				// Remove all extra space chars
				toSave.value = toSave.value.replace(/\s+/g, " ").trim();
				
				// Change all <br> to a temp string which after the conversion gets
				// replace to markdown breaks.
				toSave.value = toSave.value.replace(/<br>/g, "BREAKHERE");

				// Replace all spaces before closing tags
				toSave.value = toSave.value.replace(/ <\//g, '</');

				// Convert to markdown
				toSave.value = toMarkdown( toSave.value );

				// Add the line breaks from the temp values 
				toSave.value = toSave.value.replace(/BREAKHERE/g, "  \n");

				doc = that.storeNestable( doc, toSave.value, toSave.key, key );

			});

			if ( _(that.nestablesToSaveLater).keys().length )
				throw new Error('Not all keys of MatryoshkaWysiwygHandler.nestablesToSaveLater were deleted!', that.nestablesToSaveLater);
			else
				that.nestablesToSaveLater = {};

			// Return the doc to Matryoshka.
			return doc;

		}
	};

	// These are the default options for the editor.
	// Maybe these should include more stuff?
	that.editorOptions = {
		anchorInputPlaceholder: 'Type a link',
		firstHeader: 'h3',
		secondHeader: 'h4',
		buttons: ['bold',	'italic',	'underline',	'anchor',	'header1', 'header2', 'unorderedlist', 'orderedlist', 'image']
	};

	that.debugger = {};

	that.debugger.debugMode = false;

	that.debugger.log = function ( msg ) {
		if (!that.debugger.debugMode)
			return ;
		console.log( msg );
	};

	// Here all changes are stored, and will be saved when we choose to
	that.nestablesToSaveLater = {};

	// The custom method for storing the data from the wysiwyg editor.
	// Is needed because of weird current-HTML-content-vs-the-session-contents bug.
	// Probably something with contenteditable vs. Meteor.js
	that.storeNestable = function ( doc, value, key, matryoshkaId ) {
		
		// Reset the cached nestable!
		delete that.nestablesToSaveLater[matryoshkaId];

		return Matryoshka.nestables.modifyNestableBasedOnId( doc, matryoshkaId, 'put', key, value);

	};

	// This method will be run on blur on all wysiwyg editor fields.
	that.storeWysiwygContentOnBlur = function ( e, tmpl, context ) {

		var input = $(tmpl.find('.matryoshka-wysiwyg-editor'));
		var matryoshkaId = input.data('parent-id');

		// Add the id, key and value to be saved later
		MatryoshkaWysiwyg.nestablesToSaveLater[ matryoshkaId ] = {
			key: context.name,
			value: input.html()
		};

	};

	// Method for cleaning up the generated HTML
	that.htmlCleanup = function ( editorElement ) {

		// For Firefox...
		editorElement.find('[type=_moz]').remove();

		// Let's get the length of the html inside the editor
		var htmlLen = editorElement.html().replace(/ /g, '').replace(/\n/g, '').length;

		// If there is none, we don't even have a <p>, and that's not cool!
		// Let's add one if so, blur() the input and the focus on it again
		// (placing the cursor back inside the new <p>[users cursor is here!]</p>)
		if (htmlLen < 1) {
			editorElement.html('<p>&nbsp;</p>').blur();
			Meteor.setTimeout(function () {
				editorElement.focus();
			}, 1);
		}

		// Remove all spans, replace them with their inner content
		editorElement.find('span').each(function () {
			that.debugger.log('removing span: ', $(this) );
			$(this).replaceWith( $(this).contents() );
		});

		// No weird nesting!!
		editorElement.find('p > ol, p > ul, p > p, p > div, li > p, p > h1, p > h2, p > h3, p > h4').each(function () {
			// Make sure we're not unwrapping the editor!
			if ( !$(this).parent().hasClass('matryoshka-wysiwyg-editor') ) {
				that.debugger.log('unwrapping: ', $(this) );
				$(this).unwrap().focus();
			}
		});

		editorElement.find('br').each(function () {
			if (!$(this).parent().is("p") || ( $(this).prev().is("img") && $(this).parent().is("p")) ) {
				that.debugger.log('removing <br>: ', $(this) );
				$(this).remove();
			}
		});

		// Wrap everything which is unwrapped!
		editorElement.contents().map(function () {
			// If it's just an empty string, don't do nothing.
			if ( $(this).text().replace(/\s+/g, " ").trim() === '' )
				return false;
			// If nodetype is 3, it's an unwrapped string! Wrap that in a <p>
			if (this.nodeType === 3) {
				that.debugger.log('wrapping with <p>: ', $(this) );
				return $(this).wrap('<p></p>');
			}
		});

	};

	that.isBrowserCompatible = function () {
		return navigator.userAgent.toLowerCase().match(/chrome|safari/g);
	};

	that.isEditorActive = function () {
		return Session.get('matryoshka__wysiwyg__is-active');
	};


	that.init = function () {
		// Add support for the "wysiwyg" field type
		Matryoshka.userDefinedFields.add( that.fieldTypeObject );
	};

	that.init();

}

MatryoshkaWysiwyg = new MatryoshkaWysiwygHandler();