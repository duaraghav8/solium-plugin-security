/**
 * @fileoverview Tests for no-mod-iter-var-for-loop rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

var Solium = require ("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/no-mod-iter-var-for-loop": "error"
	}
};

describe ("[RULE] no-mod-iter-var-for-loop: Acceptances", function () {

	it ("should accept for loops that don't modifify their iteration variable", function (done) {
		var code = [
			"function foo() { for(i = 0; i < 10; i++) { i + 1; } }",
			"function foo() { for(;;) {} }",
			"function foo() { for(a;;) { a++; } }",
		];
		var errors;

		for (let e of code) {
			errors = Solium.lint (toContract(e), userConfig);
			errors.length.should.equal (0);
		}

		Solium.reset ();
		done ();
	});
});


describe ("[RULE] no-mod-iter-var-for-loop: Rejections", function () {

	it ("should reject for loops that modify their iteration variable", function (done) {
		var code = [
			"function foo () { for(i = 0; i < 10; i++) { i = 5; } }",
			"function foo () { for(i = 0; i < 10; i++) { i++; } }",
			"function foo () { for(i = 0; i < 10; i++) { i += 1; } }",
			"uint i = 2093; function foo() { for(uint i = 0; i < 3; i++) { i+= 10; } }"
		];
		var errors;

		for (let e of code) {
			errors = Solium.lint (toContract(e), userConfig);
			errors.length.should.equal (1);
		}

		Solium.reset ();
		done ();
	});
});
