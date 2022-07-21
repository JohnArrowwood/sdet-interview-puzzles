var problem = {
    name: "Anagrams",
    icon: "random",
    fn: "areAnagrams",
    input: [
            {
                name: "A",
                type: "string",
                help: "word or phrase"
            },
            {
                name: "B",
                type: "string",
                help: "word or phrase"
            }
        ],
    output: {
            name: 'expected',
            type: "boolean",
            help: "are or are not anagrams"
        },
    template: "function areAnagrams( A, B ){\n  var result = false;\n\n  // your code goes here\n\n  return result;\n}"
};

