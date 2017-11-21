/**
 * @fileoverview Test for no-abstract-functions rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

var Solium = require ("solium");

var userConfig = {
	rules: {
		"security/no-abstract-func": "error"
	}
};

describe ("[RULE] no-abstract-func: Rejections", function () {

	it ("should reject contracts that use abstract functions", function (done) {
		var code = [
			"contract Foo { function foo (); }",
			"contract Foo { function foo (uint x, string y); }",
			"contract Foo { function foo (uint x) returns (uint); }",
			"contract Foo { function foo () payable public; }",
			"contract Foo { function foo (uint x, string y) MyOwnModifier; }",
			"contract Foo { function (); }",
		];
		var errors;

		for (let expr of code) {
			errors = Solium.lint (expr, userConfig);
			errors.length.should.equal (1);
		}

		Solium.reset ();
		done ();
	});
});
