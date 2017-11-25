/**
 * @fileoverview Test for no-function-overriding rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

var Solium = require ('solium');

var userConfig = {
    rules: {
        "security/no-function-overriding": "error"
    }
};

describe ('[RULE] no-function-overriding: Acceptances', function () {

    it ('should accept contracts that don\'t override their inherited functions', function (done) {
        var code = [
            `
                contract A {
                    function foo();
                    function ();
                }
                contract B is A {
                    function bar();
                    function ();
                }
            `,
            `
                contract A {
                    function foo();
                }
                contract B is A {
                    function bar();
                    function();
                }
                contract C {
                    function foo();
                }
            `,
            `
                contract A {
                    function foo();
                }
                contract B is A {
                    function bar();
                    function foo(uint);
                }
            `,
            `
                contract A {
                    function foo();
                }
                contract B is A {
                    function foo(uint, string);
                }
                contract C is B {
                    function foo(uint);
                }
            `,
            `
                contract A {
                    function foo() returns (string);
                }
                contract B is A {
                    function foo(uint, string) payable public;
                }
                contract C is B {
                    function foo(uint);
                }
            `
        ];
        var errors;

        for (let expr of code) {
            errors = Solium.lint (expr, userConfig);
            errors.length.should.equal (0);
        }

        Solium.reset ();
        done ();
    });
});

describe ('[RULE] no-function-overriding: Rejections', function () {

    it ('should reject contracts that override their inherited functions', function (done) {
        var code = [
            `
                contract A {
                    function foo();
                }
                contract B is A {
                    function foo() { return; }
                }
            `,
            `
                contract A {
                    function foo();
                    function bar(uint, string);
                    function();
                }
                contract B is A {
                    function bar(uint, string);
                }
                contract C is B {
                    function foo(uint);
                }
                contract D is C {
                    function foo(uint);
                }
            `,
            `
                contract A {
                    function foo() returns (string);
                    function();
                }
                contract B is A {
                }
                contract C is B {
                    function foo() returns (string);
                }
            `,
            `
                contract A {
                    function bar(string s, uint u) public;
                }
                contract B is A {
                    function bar(string s, uint u) public;
                }
            `,
            `
                contract A {
                    function bar(string s, uint u) public;
                }
                contract B  {
                }
                contract C is A,B {
                    function bar(string s, uint u) public;
                }
            `,
            `
                contract A {
                    function bar(string s, uint u) public;
                }
                contract B  {
                    function bar(string, uint) public;
                }
                contract C is A,B {
                    function bar(string s, uint u) public;
                }
            `
        ];
        var errors;

        errors = Solium.lint (code[0], userConfig);
        errors.length.should.equal (1);
        errors = Solium.lint (code[1], userConfig);
        errors.length.should.equal (2);
        errors = Solium.lint (code[2], userConfig);
        errors.length.should.equal (1);
        errors = Solium.lint (code[3], userConfig);
        errors.length.should.equal (1);
        errors = Solium.lint (code[4], userConfig);
        errors.length.should.equal (1);
        errors = Solium.lint (code[5], userConfig);
        errors.length.should.equal (2);

        Solium.reset ();
        done ();
    });
});