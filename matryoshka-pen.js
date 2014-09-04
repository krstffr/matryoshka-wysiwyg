function MatryoshkaPenHandler() {

	var that = this;

	// This is for setting up the field type in Matryoshka.
	// Else Matryoshka will think the "pen" type is invalid.
	that.fieldTypeObject = {
		name: 'pen',
		templateFileName: 'matryoshka__customField__pen',
		saveMethod: function () {
			// Iterate over each "cached" field content and store it.
			_.each(that.nestablesToSaveLater, function( toSave, key ){
				// Prepare the stuff to be saved, remove all space chars.
				// And also convert it to markdown!
				toSave.value = toMarkdown( toSave.value.replace(/\s+/g, " ").trim() );
				MatryoshkaPen.storeNestable( toSave.value, toSave.key, key );
			});
			return Session.get('matryoshkaCurrentNestable');
		}
	};

	// These are the default options for the editor.
	// Maybe these should include more stuff?
	that.editorOptions = {
		class: 'pen',
		list: ['bold', 'italic', 'h1', 'h2', 'h3', 'createlink'],
		stay: false
	};

	// Here all changes are stored, and will be saved when we choose to
	that.nestablesToSaveLater = {};

	// The custom method for storing the data from the pen editor.
	// Is needed because of weird current-HTML-content-vs-the-session-contents bug.
	// Probably something with contenteditable vs. Meteor.js
	that.storeNestable = function ( value, key, matryoshkaId ) {
		$('.matryoshka-pen-editor--to-be-saved').each(function () {
			$(this).height( $(this).height() ).html(' ');
		});
		var updatedSession = Matryoshka.addValueInObjectBasedOnId( Session.get('matryoshkaCurrentNestable'), matryoshkaId, 'put', key, value);
		Session.set('matryoshkaCurrentNestable', updatedSession );
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

		// Let's get the length of the html inside the editor
		var htmlLen = editorElement.html().replace(/ /g, '').replace(/\n/g, '').length;
			
		// If there is none, we don't even have a <p>, and that's not cool!
		// Let's add one if so, blur() the input and the focus on it again
		// (placing the cursor back inside the new <p>[users cursor is here!]</p>)
		if (htmlLen < 1) {
			console.log('adding <p> since content is all empty...');
			editorElement.html('<p>&nbsp;</p>').blur();
			Meteor.setTimeout(function () {
				editorElement.focus();
			}, 1);
		}

		// Let's make real sure there is at least on block level element in the editor!
		that.htmlMakeSureThereIsABlockElement( editorElement );

		// If there are any span elements, replace them with only their content.
		// So the following HTML:
		// <p>Hi this is <span style="border: 1px;">Something cOoL!</span></p>
		// becomes just:
		// <p>Hi this is Something cOoL!</p>
		editorElement.find('span').replaceWith( editorElement.find('span').contents() );

	};

	that.htmlMakeSureThereIsABlockElement = function ( editorElement ) {
		// Get all elements which have display: block;
		var blockLvlChildren = editorElement.children().filter(function() {
			return $(this).css("display") === "block";
		});

		// If there is none, add a <p>!
		if ( blockLvlChildren.length < 1 )
			editorElement.wrapInner('<p />');

	};


	that.init = function () {
		// Add support for the "pen" field type
		Matryoshka.userDefinedFields.add( that.fieldTypeObject );
	};

	that.init();

}

MatryoshkaPen = new MatryoshkaPenHandler();