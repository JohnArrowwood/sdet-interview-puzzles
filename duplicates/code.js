function identical( a, b ) {
    if ( a.length !== b.length ) return false;
    for ( i in a ) {
      if ( a[i] !== b[i] ) return false;
    }
    return true;
}
function asText( a ) {
    return '[ ' + a.join(', ') + ' ]';
}
function testIt( f, input, expected ) {
    var original = input.slice();
    var result = f( input );
    if ( ! identical( result, expected ) ) {
        $("#results").html(
                '<pre>' +
		'<div class=given   >GIVEN   : ' + asText(input) + '</div>' +
		'<div class=expected>EXPECTED: ' + asText(expected) + '</div>' +
		'<div class=actual  >ACTUAL  : ' + asText(result) + '</div>' +
		'</pre>'
	);
        return false;
    }
    if ( ! identical( original, input ) ) {
        $("#results").html('Your algorithm seems to work, but it modifies the input array.  Bad Mojo');
        return false;
    }
    return true;
}
function shuffle(a) {
    var b = a.slice();
    var i,n,t,l;
    i = b.length - 1;
    while ( i ) {
	n = Math.round(Math.random()*i);
        t = b[i];
	b[i] = b[n];
	b[n] = t;
        i--;
    }
    return b;
}
function testSolution() {
    var f;
    try {
        f = new Function( 'A', $("#code").val() );
    } catch (e) { 
        $("#results").text( e.message );
	return false;
    }

    var passed = true;
    var tries = 100;
    while ( passed && tries > 0 ) {
        var expected = shuffle( Array.from(new Array(Math.round(Math.random()*100)+20), function(x,i){return i+1;}) );
	var input = expected.slice();
	var changes = Math.round(Math.random() * input.length);
	while ( changes ) {
	    var n = Math.round(Math.random() * (input.length - 1));
	    var p = n + Math.round(Math.random() * (input.length-(n+1)) ) + 1;
/*
	    var new_input =input.slice(0,p).push( input[n] );
	    if ( p < input.length - 1 ) {
                input = new_input.concat( input.slice(p) );
	    } else {
                input = new_input;
	    }
*/
	    input = input.slice(0,p).concat( [ input[n] ], input.slice( p, input.length ) );
            changes -= 1;
        }
	if ( ! testIt( f, input, expected ) ) passed = false;
        tries -= 1; 
    }
    if ( passed ) {
        $("#results").text( "Awesome!  Your implementation works!" );
    }
    return false;
}

function autosize() {
    var el = this;
    setTimeout( function() {
        el.style.cssText = 'height:auto;';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0 );
}

$(document).ready(function(){
//    $("#test").click(testSolution);
    $("form").submit(function(e){ e.preventDefault(); testSolution(); });
    $("textarea.autoExpand")
      .one('focus', autosize )
      .on('keydown', autosize );
});
