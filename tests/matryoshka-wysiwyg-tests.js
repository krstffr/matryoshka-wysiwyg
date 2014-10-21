// Define a nestable for the tests
var nestedNestableOne = {
	matrysohkaId: '1'
};
var nestedNestableTwo = {
	matrysohkaId: '2'
};

var keyToUpdate = 'someField';
nestedNestableOne[keyToUpdate] = 'first value';
nestedNestableTwo[keyToUpdate] = 'first value';

var rootMatryoshkaId = 'root';

var nestableToUseForTests = {
	matrysohkaId: rootMatryoshkaId,
	nestedNestables: [ nestedNestableOne, nestedNestableTwo ]
};

Tinytest.add('Matryoshka - set() get() the nestable for testing', function (test) {

	// Add the nestable
	Matryoshka.currentNestable.set(nestableToUseForTests);

	test.equal(Matryoshka.currentNestable.get().matrysohkaId, rootMatryoshkaId );
	test.equal(Matryoshka.currentNestable.get().nestedNestables[0].matrysohkaId, '1' );

});

Tinytest.add('Matryoshka WYSIWYG - .storeWysiwygContentInCache( key, value, matrysohkaId )', function (test) {

	var newValue = 'updated value';
	var matrysohkaIdToUpdate = '1';

	test.isUndefined(MatryoshkaWysiwyg.nestablesToSaveLater[matrysohkaIdToUpdate]);

	MatryoshkaWysiwyg.storeWysiwygContentInCache( keyToUpdate, newValue, matrysohkaIdToUpdate );

	test.equal(MatryoshkaWysiwyg.nestablesToSaveLater[matrysohkaIdToUpdate].key, keyToUpdate);
	test.equal(MatryoshkaWysiwyg.nestablesToSaveLater[matrysohkaIdToUpdate].value, newValue);

});

Tinytest.add('Matryoshka WYSIWYG - .convertHtmlToMarkdown( htmlToConvert )', function (test) {
	
	// Test some basic paragraphs
	var htmlToConvert = '<p>Hej!</p><p>Hej hej!</p>';
	var targetHtml = 'Hej!\n\nHej hej!';
	
	var preparedDoc = MatryoshkaWysiwyg.convertHtmlToMarkdown( htmlToConvert );

	test.equal( preparedDoc, targetHtml );

	// Test some headlines 
	htmlToConvert = '<h1>En överrubrik \n \n </h1>\n\n\n\n<h2>En \n underrubrik</h2>\n\n<h3>Headline \n      h3</h3>';
	targetHtml = '# En överrubrik\n\n## En underrubrik\n\n### Headline h3';

	preparedDoc = MatryoshkaWysiwyg.convertHtmlToMarkdown( htmlToConvert );

	test.equal( preparedDoc, targetHtml );
	
	// Test some lists
	htmlToConvert = '<ol><li>List item 1</li><li>List \nitem 2</li></ol><ul><li>Item 1\n</li></ul><p>A     paragraph</p>';
	targetHtml = '1.  List item 1\n2.  List item 2\n\n*   Item 1\n\nA paragraph';

	preparedDoc = MatryoshkaWysiwyg.convertHtmlToMarkdown( htmlToConvert );

	test.equal( preparedDoc, targetHtml );

	// Test some links
	htmlToConvert = '<p>This       is <a href="http://www.google.com/">a \n link</a></p>';
	targetHtml = 'This is [a link](http://www.google.com/)';

	preparedDoc = MatryoshkaWysiwyg.convertHtmlToMarkdown( htmlToConvert );

	test.equal( preparedDoc, targetHtml );

});
