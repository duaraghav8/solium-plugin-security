/**
 * @fileoverview Test for end-return rule
 * @author Mitchell Van Der Hoeff <mitchellvanderhoeff@gmail.com>
 */

'use strict';

var Solium = require ('solium');

var userConfig = {
    rules: {
        "security/enforce-single-end-return": "error"
    }
};

describe ('[RULE] enforce-single-end-return: Acceptances', function () {

    it ('should accept functions that have a single return statement at the end', function (done) {
        var code = 'contract Foo { function foo () {uint256 x = 3; return;} }';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.be.equal (0);

        Solium.reset ();
        done ();
    });
});

describe ('[RULE] enforce-single-end-return: Rejections', function () {

    it ('should reject functions that have a return statement not at the end', function (done) {
        var code = 'contract Foo { function foo () {uint256 x = 3; if (x == 3) {return;} return;} }';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.be.size (1);

        Solium.reset ();
        done ();
    });

    it ('should reject functions that don\'t have a return statement at the end', function (done) {
        var code = 'contract Foo { function foo () {uint256 x = 3;} }';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.be.size (1);

        Solium.reset ();
        done ();
    });

    it ('should reject functions that don\'t have a return statement at the end', function (done) {
        var code = 'contract Foo { function foo () { do { return 100; } while(true); } }';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.be.size (1);

        Solium.reset ();
        done ();
    });
});
