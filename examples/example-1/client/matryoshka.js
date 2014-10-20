Matryoshka.nestables.addType({
	name: 'page',
	createable: true
});

Matryoshka.nestables.add({
	nestableName: 'webPage',
	nestableNameReadable: 'An ordinary web page.',
	type: 'page',
	fields: [{
		name: 'something',
		type: 'wysiwyg'
	}]
});