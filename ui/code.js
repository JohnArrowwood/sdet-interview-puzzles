var test_cases = [];
var feedback_timers = {};
var editor;

// initialize coverage for all acceptance criteria
for ( ac in acceptance_criteria ) {
    acceptance_criteria[ac].covered = false;
}

/*
 * Render the UI
 */

function renderProblemName(x) {
    $('#problem-name').html(x.name);
    $('#problem-icon').attr('class','fa fa-'+x.icon);
}
function listItems(a) {
    return a.map( (s) => '<li>' + s + '</li>' ).join('');
}
function renderUserStory(x) {
    $('#story-text').html(
            x.text
             .map( (s) => s.replace( /^(as a|I want|so that|and)/i, 
                                     (t) => '<strong>' + t.toUpperCase() + '</strong>' ) )
             .join( '<br/>' )
        );
    $('#problem-list').html( listItems( x.problem ) );
    $('#need-list').html( listItems( x.need ) );
    $('#ask-list').html( listItems( x.ask ) );
    if ( x.hint ) {
        $('#hint-list').html( listItems( x.hint ) );
        $('#hint').removeClass( 'hidden' );
    }
}

function renderAcceptanceCriteria(ac) {
    $('#ac-list').html(
            Object.keys(ac).map( (k) => 
                '<div class="ac'+(ac[k].hidden?' hidden':'')+'" id="'+k+'">' + 
                    '<h2>'+k+'</h2>'+
                    '<div class=ac-text>'+
                        ac[k].text.map( (s) => 
                            s.replace(/^(given|when|then|and)/i, (w) => 
                                '<strong>' + w.toUpperCase() + '</strong>' )
                        ).join('<br/>') +
                    '</div>'+
                '</div>'
            )
        );
}

function renderTestCaseForm(x) {
    $('#tc-input').html(
            '<table class=form>'+
                x.input.map( (p) => 
                '<tr>'+
		    (p.name !== 'input' ? '<td class="label">'+p.name+'</td>' : '' )+
                    '<td class="input">'+
                        ( p.type === "boolean" ?
                            '<label>'+
                                '<input type="radio" name="input-'+p.name+'" value="true">'+
                                'true'+
                            '</label>'+
                            '<label>'+
                                '<input type="radio" name="input-'+p.name+'" value="false">'+
                                'false'+
                            '</label>'
                        : '<input'+
                            ' id=input-'+p.name+
                            ' type=text'+
                            ' placeholder="'+p.help+'"'+
                            '>'
                        )+
                    '</td>'+
                '</tr>' ).join('')+
            '</table>'
        );
    $('#tc-output').html(
            ( x.output.type === "boolean" ?
                '<label><input type="radio" name="output" value="true">true</label>'+
                '<label><input type="radio" name="output" value="false">false</label>'
            : '<input'+
                ' id="output"'+
                ' type="text"'+
                ' placeholder="'+x.output.help+'"'+
                '>' )
        );
    var columns = [];
    x.input.forEach( (p) => columns.push(p.name) );
    columns.push(x.output.name);
    columns.push( 'actual' );
    columns.push('<i class="fa fa-check"></i>');
    $('#tc-list').html(
            columns.map( (s) => '<col>' ).join('') +
            '<tr>'+
                columns.map( (s) => '<th>'+s+'</th>' )+
            '</tr>'
        );
}

function htmlEncode(s) {
    return $('<div/>').text(s).html();
}

// display a message for 5 seconds, then remove it
function feedback( where, type, message ) {
    if ( feedback_timers[where] ) { 
        clearTimeout(feedback_timers[where]);
        feedback_timers[where] = undefined;
    }
    $(where).attr("class",type).html(message);
    feedback_timers[where] = setTimeout( () => $(where).attr("class",'').html(''), 5000 );
    return ( type === "error" ? false : true );
}
function testCaseFeedback( c, m ) {
    return feedback("#tc-feedback",c,m);
}
function testResults( c, m ) {
    return feedback("#test-results",c,m);
}

function outputMatches( a, b ) {
    switch( problem.output.type ) {
        case "boolean": 
        case "string":  
        case "number": return a === b;
        default:       return deepEqual( a, b );
    }
}

function addTest( input, output ) {

    // make sure the test case matches our requirements
    if ( ! outputMatches( solution(input), output ) ) {
        return testCaseFeedback( "error", "Wrong output for that input" );
    }

    // see which requirement it covers
    var addsValue = false;
    var redundant = false;
    var covered_by = [];
    var covers = [];
    for ( tc in acceptance_criteria ) {
        var applies = acceptance_criteria[tc].applies;
        if ( applies( input ) ) {
            if ( acceptance_criteria[tc].covered === true ) {
                redundant = true;
                covered_by.push(tc);
            } else {
                redundant = false;
                addsValue = true;
                covers.push(tc);
                acceptance_criteria[tc].covered = true;
                $("#"+tc).addClass("covered");
            }
        }
    }

    if ( ! addsValue ) {
        if ( redundant ) {
            return testCaseFeedback( "error", "Requirement already covered by: " + covered_by );
        } else {
            testCaseFeedback( "error", "Congratulations! You found a requirements gap!" );
        }
    }

    var data = [];
    problem.input.forEach( function(p){
        switch (p.type) {
            case "boolean":
                data.push( input[p.name] ? 'true' : 'false' );
                break;
            default:
                data.push( htmlEncode( JSON.stringify( input[p.name] ) ) );
        }
    });
    switch ( problem.output.type ) {
        case "boolean": 
            data.push( output ? 'true' : 'false' );
            break;
        default: data.push( htmlEncode( JSON.stringify( output ) ) );
    }
    var row = $(
            '<tr>'+
                data.map( (s) => 
                    '<td'+(/^<i/.test(s) ? ' align=center' : '' )+'>'+
                        ( /^\s+$/.test(s)
                        ? '"'+s.split('').map((c)=>'&nbsp;').join('')+'"'
                        : s )+
                    '</td>' ).join('')+
                '<td class=actual><i class=""></i></td>'+
                '<td class=result><i class=""></i></td>'+
            '</tr>'
        );
    $('#tc-list').append(row);

    test_cases.push({ input: input, output: output, covers: covers, el: row });

    updateTestCounts();

    return testCaseFeedback( "success", "Test case added" );

}

function updateTestCounts() {
    var ac,c=0,n=0,t=0;
    for ( ac in acceptance_criteria ) {
        t++;
        if ( acceptance_criteria[ac].covered ) {
            c++;
            n++;
        } else {
            if ( ! acceptance_criteria[ac].hidden ) n++;
        }
    }
    $('#ac-covered').text(c);
    $('#ac-identified').text(n);
    $('#ac-total').text(t);
}
function addTestCase() {
    var input = {};
    var output;
    problem.input.forEach( function(p){
            switch (p.type) {
                case "boolean": 
                    input[p.name] = $("input[name=input-"+p.name+"]:checked").val() === "true"; 
                    break;
                case "string":
                    input[p.name] = $("#input-"+p.name).val(); 
                    break;
                default:
                    input[p.name] = JSON.parse( $("#input-"+p.name).val() ); 
                    break;
            }
    });
    switch (problem.output.type) {
        case "boolean": 
            output = $("input[name=output]:checked").val() === "true"; 
            break;
        case "string":
            output = $("#output").val(); 
            break;
        default:
            output = JSON.parse( $("#output").val() ); 
            break;
    }
    addTest( input, output );
    saveTestCases();
}

function testIt( f, input, expected, actual ) {
    var args = problem.input.map( (p) => input[ p.name ] );
    var before = JSON.stringify( args );
    try {
        var result = f.apply( {}, args );
    } catch(e) {
        return testResults( "error", e.message );
    }
    if ( actual ) {
        actual.text( JSON.stringify( result ) );
    }
    var after = JSON.stringify( args );
    return ( outputMatches( result, expected ) && before === after );
}
function testSolution() {
    var f;
    var code = editor.getValue();
    if ( ! code.match(/^\s*function [a-zA-Z][a-zA-Z0-9]*\s*\(.*?\)\s*{/m) ) {
        return testResults( "error", "Please define a single function called <b>areAnagrams</b>" );
    }

    // modify the code for execution
    code = code.replace(/^\s*function\s*[a-zA-Z][a-zA-Z0-9]*\s*\(.*?\)\s*{\s*$/m,'');
    code = code.replace(/\s*}\s*$/,'');

    // Parse the implementation
    var args = problem.input.map( (p) => p.name );
    args.push( code );
    try {
        f = Function.apply( this, args );
    } catch (e) { 
        return testResults( "error", e.message );
    }

    // Test it first on the user's test cases
    var pass = true;
    var tc,i;
    for ( i = 0 ; i < test_cases.length ; i++ ) {
        tc = test_cases[i];
        if ( ! testIt( f, tc.input, tc.output, $(tc.el).find('.actual') ) ) {
            pass = false;
            $(tc.el).find('.result i').attr('class','fa fa-times red');
            tc.covers.forEach( (c) => $("#"+c).removeClass('passed').addClass('failed') );
        } else {
            $(tc.el).find('.result i').attr('class','fa fa-check green');
            tc.covers.forEach( (c) => $("#"+c).removeClass('failed').addClass('passed') );
        }
    }

    // see if we have complete coverage or not
    var visible_untested = 0,
        hidden_untested = 0;
    var covered = true;
    for ( var tc_name in acceptance_criteria ) {
        var tc = acceptance_criteria[tc_name];
        if ( ! tc.covered ) {
            if ( tc.hidden ) hidden_untested++;
            else             visible_untested++;
        }
    }
    if ( visible_untested > 0 ) covered = false;

    if ( ! pass ) {
        return testResults( 'error', "Does not pass all tests" );
    }
    if ( pass && ! covered ) {
        return testResults( 'error', "So far so good, now add some test cases" );
    }

    if ( pass ) {
        if ( hidden_untested ) {
            // first, test the hidden tests to make sure they pass
            for ( var name in acceptance_criteria ) {
                var ac = acceptance_criteria[name];
                if ( ! ac.covered && ac.hidden ) {
                    if ( ! testIt( f, ac.example.input, ac.example.output ) ) {
                        return testResults( 'error', "You code does not meet all of the requirements.  You need to add some more test cases.  Consider: "+ JSON.stringify( ac.example.input ) );
                    }
                }
            }
        }

        // do some more thorough testing
        // to avoid cheaters

        var tries = 100;
        while ( pass && tries > 0 ) {
            var [ input, output ] = randomTestCase();
            if ( ! testIt( f, input, output ) ) pass = false;
            tries--;
        }
        if ( ! pass ) {
            return testResults("error","Something wrong here!  Missing criteria?");
        }
    }
    if ( pass ) {
        if ( hidden_untested > 0 ) 
            return testResults( "success", "Looking good!<br/>Wanna add some more test cases?" );
        else 
            return testResults( "success", "Awesome!  You nailed it!" );
    }
    return false;
}

function goTo( id ) {
    return function() {
        $("#sliding-panes").scrollTo( "#" + id, { duration: 500 } );
        return false;
    };
}

function saveTestCases() {
    var tc = test_cases.map( function(t){ return { input: t.input, output: t.output }; } );
    localStorage.setItem(problem.fn+':test-cases',JSON.stringify(tc));
}
function saveImplementation() {
    localStorage.setItem(problem.fn+':implementation',JSON.stringify(editor.getValue()));
}
function saveData() {
    saveTestCases();
    saveImplementation();
}

function restoreSaved() {
    var tests = localStorage.getItem(problem.fn+':test-cases');
    if ( tests ) {
        var list = JSON.parse( tests );
        for ( var i = 0 ; i < list.length ; i++ ) {
            var x = list[i];
            if ( x.hasOwnProperty("input") )
                addTest( x.input, x.output );
        }
    }
    // becaue the load is conditional, 
    // things may have changed
    saveTestCases();

    var source = localStorage.getItem(problem.fn+':implementation');
    if ( source ) {
        editor.setValue( JSON.parse(source) );
    }

}

function reset() {
    test_cases = [];
    editor.setValue( problem.template );
    saveData();
    window.location.reload(false); 
}

function implementationChanged() {
    Object.keys(acceptance_criteria).forEach( (ac) =>
            $('#'+ac).removeClass('passed').removeClass('failed')
        );
    saveImplementation();
}

$(document).ready(function(){
    renderProblemName( problem );
    renderUserStory( user_story );
    renderAcceptanceCriteria( acceptance_criteria );
    updateTestCounts();
    renderTestCaseForm( problem );

    editor = ace.edit("editor");
    editor.setTheme("ace/theme/crimson_editor");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setValue( problem.template );

    restoreSaved();

    editor.gotoLine(1,0,true);
    editor.on("change",implementationChanged);

    $("#go-story")   .click( goTo("user-story") );
    $("#go-criteria").click( goTo("acceptance-criteria") );
    $("#go-tests")   .click( goTo("test-cases") );
    $("#go-code")    .click( goTo("implementation") );
    $("#go-help")    .click( goTo("help") );
    $("#reset")      .click( reset );

    $("#add-test").click(addTestCase);
    $("#test-it").click(testSolution);

});
