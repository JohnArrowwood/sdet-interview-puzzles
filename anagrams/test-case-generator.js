function shuffle(a) {
    var b = a.split('');
    var i,n,t;
    i = b.length - 1;
    while ( i > 0 ) {
        n = Math.floor( Math.random() * i );
        t = b[i];
        b[i] = b[n];
        b[n] = t;
        i--;
    }
    return b.join('');
}

function randomTestCase() {

    var base = shuffle(
            "abcdefghijklmnopqrstuvwxyz"+
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
            "01234567890"+
            "-_=+`~!@#$%^&*()[]{}\\|;:'\",.<>/?"
        );
    var c1 = base.charAt( Math.round( Math.random() * base.length ) );
    var c2 = base.charAt( Math.round( Math.random() * base.length ) );

    var rand = Math.random();
         if ( rand < 0.25 ) c2 = '';
    else if ( rand < 0.5 )  c1 = ''; 
    else if ( rand < 0.75 ) c2 = c1;
    var output = ( c1 === c2 );

    var a = shuffle( base + c1 + ' '.repeat( Math.round(Math.random()*10) ) );
    var b = shuffle( base + c2 + ' '.repeat( Math.round(Math.random()*10) ) );

    return [ { A: a, B: b }, output ];
}
