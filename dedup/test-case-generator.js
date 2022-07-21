function shuffle(a) {
    var b = a.slice();
    var i,n,t;
    i = b.length - 1;
    while ( i > 0 ) {
        n = Math.floor( Math.random() * i );
        t = b[i];
        b[i] = b[n];
        b[n] = t;
        i--;
    }
    return b;
}

function randomTestCase() {
    var size = Math.floor( Math.random() * 100 ) + 20;
    var output = shuffle( Array.from( new Array( size ), (x,i) => i+1 ) );
    var input = output.slice();
    var changes = Math.floor( Math.random() * ( size * 3 ) );
    var n,p;
    while ( changes ) {
        n = Math.floor( Math.random() * input.length ); 
        p = n + Math.floor( Math.random() * (input.length-(n+1)) ) + 1;
        input = input.slice( 0,p ).concat( [input[n]], input.slice(p) );
        changes -= 1;
    }
    return [ { input: input }, output ];
}
