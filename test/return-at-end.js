/**
 * @fileoverview Test for enforce-single-end-return rule
 * @author Mitchell Van Der Hoeff <mitchellvanderhoeff@gmail.com>
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

"use strict";

var Solium = require ("solium");

var userConfig = {
	rules: {
		"security/return-at-end": "error"
	}
};

describe ("[RULE] return-at-end: Acceptances", function () {

	it ("should accept functions that have a single return statement at the end", function (done) {
		var errors, code = "contract Foo { function foo () {uint256 x = 3; return;} }";

		errors = Solium.lint (code, userConfig);
		errors.should.be.size (0);

		code = "contract Foo { function foo () {return;} }";
		errors = Solium.lint (code, userConfig);
		errors.should.be.size (0);

		code = "contract Foo { function foo () {hello('world'); boo(); if (true) {} return;} }";
		errors = Solium.lint (code, userConfig);
		errors.should.be.size (0);

		code = "contract Foo { function foo () { return callMyFunc(100, 'hello'); } }";
		errors = Solium.lint (code, userConfig);
		errors.should.be.size (0);

		Solium.reset ();
		done ();
	});
});

describe ("[RULE] return-at-end: Rejections", function () {

	it ("should reject functions that have a return statement not at the end", function (done) {
		var code = "contract Foo { function foo () {return; return;} }";
		var errors;

		errors = Solium.lint (code, userConfig);
		errors.should.be.size (1);

		Solium.reset ();
		done ();
	});

	it ("should reject functions that don't have a return statement", function (done) {
		var code = "contract Foo { function foo () {uint256 x = 3;} }";
		var errors;

		errors = Solium.lint (code, userConfig);
		errors.should.be.size (1);

		Solium.reset ();
		done ();
	});

	it ("should reject return statements whose parent isn't a function, ie, that is not top-level", function (done) {
		var code = "contract Foo { function foo () { do { return 100; } while(true); return; } }";
		var errors;

		errors = Solium.lint (code, userConfig);
		errors.should.be.size (1);

		code = "contract Foo { function foo () { if (true) { return; } else { return; } } }";
		errors = Solium.lint (code, userConfig);
		errors.should.be.size (3);

		Solium.reset ();
		done ();
	});
});
