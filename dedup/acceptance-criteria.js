var acceptance_criteria = (function(){

    function dups(a) {
        var i,v,k,s={},out={};
        for ( i = 0 ; i < a.length ; i++ ) {
            v = a[i];
            k = ( typeof v ) + v.toString();
            if ( ! s.hasOwnProperty(k) ) s[k] = 0;
            s[k]++;
        }
        for ( k in s ) {
            if ( s[k] > 1 ) out[k] = s[k];
        }
        out.includes = function(v){
            var k = ( typeof v ) + v.toString();
            return this.hasOwnProperty(k);
        };
        return out;
    }

    function containsDups(a) {
        var i,v,k,r = true,s = {};
        for ( i = 0 ; i < a.length ; i++ ) {
            v = a[i];
            k = ( typeof v ) + v.toString();
            if ( s.hasOwnProperty(k) ) {
                return true;
            }
            s[k] = undefined;
        }
        return false;
    }
    function isAscending(a) {
        for ( var i = 1 ; i < a.length ; i++ ) {
            if ( ( typeof a[i] === "string" && 
                   typeof a[i-1] === "string" ) ||
                 ( typeof a[i] === "number" &&
                   typeof a[i-1] === "number" ) ) {
                if ( a[i] <= a[i-1] ) return false;
            } else {
                if ( a[i].toString() <= a[i-1].toString() ) return false;
            }
        }
        return true;
    }
    function isDescending(a) {
        for ( var i = 1 ; i < a.length ; i++ ) {
            if ( ( typeof a[i] === "string" && 
                   typeof a[i-1] === "string" ) ||
                 ( typeof a[i] === "number" &&
                   typeof a[i-1] === "number" ) ) {
                if ( a[i] >= a[i-1] ) return false;
            } else {
                if ( a[i].toString() >= a[i-1].toString() ) return false;
            }
        }
        return true;
    }
    
    // the acceptance criteria will use the above functions without polluting the name space
    return {

    "ascending": {

        "text": [
                'given a list of two or more elements in ascending order',
                'and there are no duplicates in the list',
                'when the function is called',
                'then the output is the same as the input'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','banana','coconut'] },
                output: ['apple','banana','coconut']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 2 &&
                    isAscending( p.input ) &&
                    ! containsDups( p.input )
                );
            }

        },

    "descending": {

        "text": [
                'given a list of two or more elements in descending order',
                'and there are no duplicates in the list',
                'when the function is called',
                'then the output is the same as the input'
            ],

        "hidden": true,

        "example": {
                input: { input: ['coconut','banana','apple'] },
                output: ['coconut','banana','apple']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 2 &&
                    isDescending( p.input ) &&
                    ! containsDups( p.input )
                );
            }

        },

    "random-order": {

        "text": [
                'given a list of three or more elements',
                'and the elements are not all in ascending order',
                'and they are not all in descending order',
                'and there are no duplicates',
                'when the function is called',
                'then the output is the same as the input'
            ],

        "example": {
                input: { input: ['apple','coconut','banana'] },
                output: ['apple','coconut','banana']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 3 &&
                    ! isAscending( p.input ) &&
                    ! isDescending( p.input ) &&
                    ! containsDups( p.input )
                );
            }

        },

    "random-order-with-first-dup": {

        "text": [
                'given a list of three or more elements',
                'and the elements are not all in ascending order',
                'and they are not all in descending order',
                'and the first value (A) appears again elsewhere in the list',
                'when the function is called',
                'then the output includes all the values except the second (A)',
                'and the values are in their original order'
            ],
               
        "example": {
                input: { input: ['apple','coconut','apple','banana'] },
                output: ['apple','coconut','banana']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 3 &&
                    ! isAscending( p.input ) &&
                    ! isDescending( p.input ) &&
                    containsDups( p.input ) &&
                    dups( p.input ).includes( p.input[0] )
                );
            }

        },

    "random-order-with-other-dup": {

        "text": [
                'given a list of four or more elements',
                'and the elements are not all in ascending order',
                'and they are not all in descending order',
                'and some value other than the first (X) appears again elsewhere in the list',
                'when the function is called',
                'then the output includes all the values except the second (X)',
                'and the values are in their original order'
            ],

        "hidden": true,
               
        "example": {
                input: { input: ['apple','coconut','banana','apple','date'] },
                output: ['apple','coconut','banana','date']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 4 &&
                    ! isAscending( p.input ) &&
                    ! isDescending( p.input ) &&
                    containsDups( p.input ) &&
                    ! dups( p.input ).includes( p.input[0] )
                );
            }

        },

    "first-and-second-match": {

        "text": [
                'given a list of two or more elements',
                'and the first and second elements have the same value',
                'when the function is called',
                'then the output excludes the second element'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','apple','banana','coconut'] },
                output: ['apple','banana','coconut']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 2 &&
                    p.input[0] === p.input[1]
                );
            }

        },

    "first-and-third-match": {

        "text": [
                'given a list of four or more elements',
                'and the first and third elements have the same value',
                'when the function is called',
                'then the output excludes the third element'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','banana','apple','coconut'] },
                output: ['apple','banana','coconut']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 4 &&
                    p.input[0] === p.input[2]
                );
            }

        },

    "first-and-last-match": {

        "text": [
                'given a list of three or more elements',
                'and the first and last elements have the same value',
                'when the function is called',
                'then the output excludes the last element'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','banana','coconut','apple'] },
                output: ['apple','banana','coconut']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 3 &&
                    p.input[0] === p.input[p.input.length-1]
                );
            }

        },

    "second-and-third-match": {

        "text": [
                'given a list of four or more elements',
                'and the second and third elements have the same value',
                'when the function is called',
                'then the output excludes the third element'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','banana','banana','coconut'] },
                output: ['apple','banana','coconut']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 4 &&
                    p.input[1] === p.input[2]
                );
            }

        },

    "second-and-fourth-match": {

        "text": [
                'given a list of five or more elements',
                'and the second and fourth elements have the same value',
                'when the function is called',
                'then the output excludes the fourth element'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','banana','coconut','banana','date'] },
                output: ['apple','banana','coconut','date']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 5 &&
                    p.input[1] === p.input[3]
                );
            }

        },

    "second-and-last-match": {

        "text": [
                'given a list of four or more elements',
                'and the second and last elements have the same value',
                'when the function is called',
                'then the output excludes the last element'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','banana','coconut','banana'] },
                output: ['apple','banana','coconut']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 4 &&
                    p.input[1] === p.input[p.input.length-1]
                );
            }

        },

    "last-two-match": {

        "text": [
                'given a list of three or more elements',
                'and the last and second-to-last elements have the same value',
                'when the function is called',
                'then the output excludes the last element'
            ],

        "hidden": true,

        "example": {
                input: { input: ['apple','banana','coconut','coconut'] },
                output: ['apple','banana','coconut']
            },

        "applies":
            function(p) {
                return ( 
                    p.input.length >= 3 &&
                    p.input[p.input.length-2] === p.input[p.input.length-1]
                );
            }

        },

    "strings-are-not-numbers": {

        "text": [
                'given a list where the first item is a number',
                'and the second item is the same number, as a string',
                'when the function is called',
                'then the output sees the two elements as distinctly different'
            ],

        "example": {
                input: { input: [1,"1"] },
                output: [1,"1"]
            },

        "applies":
            function(p) {
                return (
                    ( typeof p.input[0] === "number" ) &&
                    ( typeof p.input[1] === "string" ) &&
                    p.input[0].toString() === p.input[1].toString()
                );
            }

        }
    };

})();

