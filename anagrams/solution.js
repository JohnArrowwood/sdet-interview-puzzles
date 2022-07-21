function solution(p) {
  function standardized(s) {
    return s.replace(/ /g,'').split('').sort().join('');
  }
  if ( p.A === p.B ) return false;
  var aa = standardized(p.A);
  var bb = standardized(p.B);
  return ( aa === bb && aa.length > 0 );
}
