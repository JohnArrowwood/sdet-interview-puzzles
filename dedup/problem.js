var problem = {
    name: "De-Duplicate List",
    icon: "filter",
    fn: "dedup",
    input: [
            {
                name: "input",
                type: "list",
                help: "[1,2,3] or ['a','b','c']"
            }
        ],
    output: {
            name: 'expected',
            type: "list",
            help: "input with duplicates removed"
        },
    template: "function dedup( input ){\n  var result = [];\n\n  // your code goes here\n\n  return result;\n}"
};

