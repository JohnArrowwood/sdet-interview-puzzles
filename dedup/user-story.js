var user_story = {
    text: [
	'as a developer',
	'I want a way to clean up my data by removing duplicates',
	'So that I can safely assume that no element appears more than once in the list'
    ],
    problem: [
	'when processing a list of inputs, it can sometimes be a bad thing if the same element appears more than once in the list',
	'I perfer to solve the problem once and use it everywhere, as opposed to having to add duplication checks into every list processor that requires it',
    ],
    need: [
        'a way of filtering a list to remove duplicates'
    ],
    ask: [
        'a function which takes a list',
	'returns a COPY of the list, with duplicate values removed',
        'the order of items in the list should be preserved',
	'the first instance of each value is preserved',
	'subsequent instances of the same value are omitted',
	'items may be numbers or strings, it should make no difference',
    'strings that look like numbers are treated differently than the number they look like (e.g. "1" != 1)'
    ]
};
