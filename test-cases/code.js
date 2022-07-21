function toggleError() {
    if ( this.checked ) {
        $("#C").val("error").prop( "disabled", true );
    } else {
        $("#C").val("").prop( "disabled", false );
    }
}
function dataType( x ) {
    var type;
    if ( isNaN(x) ) {
        x = x.toLowerCase();
        if ( x === '' )                         return 'error.empty';
        if ( x === 'null' )                     return 'error.null';
        if ( x === 'true' || x === 'false' )    return 'error.boolean';
                                                return 'error.nan';
    } else {
        var n = +x;
        if ( n != Math.floor( n ) ) return 'error.float';
        if ( x.match(/\./) )        return 'error.float';
        if ( n > 127 )              return 'error.overflow';
        if ( n < -128 )             return 'error.underflow';
        if ( n > 0 )  return 'pos';
        if ( n == 0 ) return 'zero'; 
        if ( n < 0 )  return 'neg'; 
    }
}

function sumOf( a, b ) {
    if ( a == '' || b == '' ) return 'error';
    if ( isNaN(a) || isNaN(b) ) return 'error';
    if ( a.match(/\./) || b.match(/\./) ) return 'error';
    a = +a; if ( a != Math.floor(a) ) return 'error';
    b = +b; if ( b != Math.floor(b) ) return 'error';
    var c = a + b;
    if ( c > 127 ) return 'error';
    if ( c < -128 ) return 'error';
    return c;
}

var seen = {};

function isError( t ) {
    return t.match(/^error/);
}
function testClass( a, b, c ) {
    var aa = dataType( a ); if ( isError( aa ) ) return 'A=' + aa;
    var bb = dataType( b ); if ( isError( bb ) ) return 'B=' + bb;
    var cc = dataType( c ); 
    return aa + '+' + bb + '=' + cc;
}
function score( a, b, c ) {
    var tc = testClass( a, b, c );
    cc = sumOf( a, b );
    if ( c != cc ) {
        return -10;
    }
    if ( seen.hasOwnProperty( tc ) ) {
        return -1;
    }
    seen[tc] = null;
    return +5;
}
function htmlEncode(s) {
    return $('<div/>').text(s).html();
}
function addTestCase() {
    var a = $("#A").val();
    var b = $("#B").val();
    var c = $("#C").val();
    var text = $("#comment").val();
    console.log( a+' + '+b+' = '+c+' // ' + text );

    var code;
    if ( c === 'error' ) {
        code = 'sumOf('+a+','+b+') is an error';
    } else {
        code = 'sumOf('+a+','+b+') == '+c;
    }
    console.log( code );

    var s = score( a, b, c );
    console.log( 'score = ' + s );

    var ss = +$("#total").text() + s;
    $("#total").text( ss );
    console.log( 'running total = ' + ss );

    var direction = s > 0 ? 'positive' : 'negative';

    $('#tests').append(
            '<tr class='+direction+'>'+
            '<td>'+htmlEncode(code)+'</td>'+
            '<td>// '+htmlEncode(text)+'</td>'+
            '<td>'+s+'</td>'+
            '</tr>');

    return false;
}

$(document).ready(function(){
    $("#add").click(addTestCase);

    $("#error").click(toggleError);
});
