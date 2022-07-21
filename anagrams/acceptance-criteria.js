var acceptance_criteria = {

    "ab-ba": {

        "text": [
				'given a non-empty string containing two or more letters',
				'and a second string with the same letters in a different order',
				'when the function is called',
				'then the function returns <strong>TRUE</strong>'
            ],

		"example": {
				input: { A: "ab", B: "ba" },
				output: true
			},

        "applies": 
			function(p){
				if ( p.A === p.B ) return false;
				if ( ! p.A.match(/^[a-zA-Z]{2,}$/) ) return false;
				if ( ! p.B.match(/^[a-zA-Z]{2,}$/) ) return false;
				return solution(p) === true;
			}

		},

    "ab-ab": {

        "text": [
				'given a non-empty string with two or more letters',
				'and a second string with the same letters in the same order',
				'when the function is called',
				'then the function returns <strong>FALSE</strong>'
			],

		"example": {
				input: { A: "ab", B: "ab" },
				output: true
			},

		"applies": 
			function(p){
				if ( ! p.A.match(/^[a-zA-Z]{2,}$/) ) return false;
				return ( p.A === p.B );
			}

		},

    "ab-cd": { 

		"text": [
				'given a typical word or phrase in lower case',
				'and a second word or phrase with different letters',
				'when the function is called',
				'then the function returns <strong>FALSE</strong>'
			],

		"example": {
				input: { A: "dog", B: "cat" },
				output: false 
			},

		"applies": 
			function(p) {
				if ( p.A.match(/[^a-z ]/) ) return false;
				if ( p.B.match(/[^a-z ]/) ) return false;
				if ( p.A === p.B ) return false;
				return solution(p) === false;
			}

		},

    "word-to-phrase": {

		"text": [
				'given a word (string contains letters only)',
				'and a phrase that is an anagram of the word (with spaces)',
				'when the function is called',
				'then the function returns <strong>TRUE</strong>'
			],

		"example": {
				input: { A: "anagram", B: "nag a ram" },
				output: true
			},

		"applies":
			function(p){
				if ( p.A.match(/[^a-zA-Z]/) )  return false;
				if ( p.B.match(/[^a-zA-Z ]/) ) return false;
                if ( p.A.match(/ /) )          return false;
				if ( ! p.B.match(/ /) )        return false;
				return solution(p) === true;
			}

		},

	"phrase-to-word": {

		"text": [
				'given a phrase (two or more words)',
				'and a single-word anagram (string contains only letters)',
				'when the function is called',
				'then the function returns <strong>TRUE</strong>'
			],

        "hidden": true,

		"example": {
				input: { A: "nag a ram", B: "anagram" },
				output: true
			},

		"applies":	
			function(p){
				if ( p.A.match(/[^a-zA-Z ]/) ) return false;
				if ( p.B.match(/[^a-zA-Z]/) )  return false;
				if ( ! p.A.match(/[ ]/) )      return false;
				return solution(p) === true;
			}
		},

	"phrase-to-phrase": {

		"text": [
				'given a phrase (two or more words)',
				'and an anagram phrase with a different number of words',
				'when the function is called',
				'then the function returns <strong>TRUE</strong>'
			],

        "hidden": true,

		"example": {
				input: { A: "nag a ram", B: "rama nag" },
				output: true
			},

		"applies":	
			function(p){
				if ( p.A.match(/[^a-zA-Z ]/) ) return false;
				if ( p.B.match(/[^a-zA-Z ]/) ) return false;
				if ( ! p.A.match(/[ ]/) )      return false;
				if ( ! p.B.match(/[ ]/) )      return false;
				return solution(p) === true;
			}

		},

    "spaces-only": {

		"text": [
				'given a string containing only some number of spaces',
				'and another with a different number of spaces',
				'when the function is called',
				'then the function returns <strong>FALSE</strong>'
			],

		"example": {
				input: { A: "   ", B: "     " },
				output: false
			},

		"applies":
			function(p){
				if ( p.A.match(/[^ ]/) ) return false;
				if ( p.B.match(/[^ ]/) ) return false;
				if ( p.A.length < 1 )    return false;
				if ( p.B.length < 1 )    return false;
				return ( p.A.length !== p.B.length );
			}

        },

    "extra-chars": {

		"text": [
				'given a string containing letters, digits, etc.',
				'and another with the same characters in a different order',
				'when the function is called',
				'then the function returns <strong>TRUE</strong>'
			],

        "hidden": true,

		"example": {
				input: { A: "abc123!@#", B: "a1! b2@ c3#" },
				output: true
			},

		"applies":
			function(p){
				if ( ! p.A.match(/[a-zA-Z]/) )      return false;
				if ( ! p.A.match(/[0-9]/) )         return false;
				if ( ! p.A.match(/[^a-zA-Z0-9 ]/) ) return false;
				if ( ! p.B.match(/[a-zA-Z]/) )      return false;
				if ( ! p.B.match(/[0-9]/) )         return false;
				if ( ! p.B.match(/[^a-zA-Z0-9 ]/) ) return false;
				return solution(p) === true;
			}
		},

    "case-sensitive": {

		"text": [
				'given a string containing all lower-case letters',
				'and an anagram, but in all upper-case letters',
				'when the function is called',
				'then the function returns <strong>FALSE</strong>',
			],

        "hidden": true,

		"example": {
				input: { A: "cat", B: "ACT" },
				output: false
			},

		"applies":
			function(p){
				if ( ! p.A.match(/^[a-z ]+$/) ) return false;
				if ( ! p.A.match(/[a-z]/) )     return false;
				if ( ! p.B.match(/^[A-Z ]+$/) ) return false;
				if ( ! p.B.match(/[A-Z]/) )     return false;
				return solution({
					A: p.A.toLowerCase(),
					B: p.B.toLowerCase()
				}) === true;
			}

		},

};

