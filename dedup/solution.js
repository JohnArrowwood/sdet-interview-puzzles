function solution(p) {
    var output = [];
    var seen = {};
    var i,v,k;
    for ( i = 0 ; i < p.input.length ; i++ ) {
        v = p.input[i];
        k = ( typeof v ) + v.toString();
        if ( ! seen.hasOwnProperty(k) ) {
            output.push(v);
            seen[k] = undefined;
        }
    }
    return output;
}
