/**
 * @fileoverview Tests for no-multiple-inheritance rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

var Solium = require ("solium");

var userConfig = {
	rules: {
		"security/no-multiple-inheritance": "error"
	}
};

var userConfigNoInterface = {
	rules: {
		"security/no-multiple-inheritance": ["error", { "no-interface": true }]
	}
};

describe ("[RULE] no-multiple-inheritance: Acceptances", function () {

	it ("should accept programs that don't use multiple inheritance and don't allow interfaces", function (done) {
		var code = "contract Parent {}\ncontract Child is Parent{}";
		var errors;

		errors = Solium.lint (code, userConfigNoInterface);
		errors.length.should.equal (0);

		Solium.reset ();
		done ();
	});

	it ("should accept programs that use multiple inheritance with interfaces", function (done) {
		var code = [
			"interface Foo {}\ninterface Bar {}\ncontract FooBar is Foo,Bar {}",
			"interface One {}\ninterface Two {}\ninterface Three {}\ncontract Foo is One,Two,Three {}"
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

describe ("[RULE] no-multiple-inheritance: Rejections", function () {

	it ("should reject programs that use multiple inheritance and don't allow interfaces", function (done) {
		var code = [
			"interface Parent {}\ninterface Uncle {}\ncontract Child is Parent,Uncle {}",
			"contract Parent {}\ncontract Uncle {}\ncontract Child is Parent,Uncle {}"
		];
		var errors;

		for (let expr of code) {
			errors = Solium.lint (expr, userConfigNoInterface);
			errors.length.should.equal (1);
		}

		Solium.reset ();
		done ();
	});

	it ("should reject programs that use multiple inheritance without interfaces", function (done) {
		var code = [
			"contract Foo {}\ncontract Bar {}\ncontract FooBar is Foo,Bar {}",
			"interface Foo {}\ncontract Bar {}\ncontract FooBar is Foo,Bar {}"
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

describe ("[RULE] no-multiple-inheritance: Handling options", function () {

	it ("should reject rules with invalid user options", function (done) {
		var code = "contract Foo {}";
		var options = [
			["error", { "no-interffff": true }],
			["error", { 1: 2 }],
			["error", { "no-interface": null }],
			["error", [true]],
			["error", { "no-interface": [true] }],
			["error", { "": false }],
			["error", { "no-interface": true, "extraRandomProperty": "blah" }]
		];

		for (let option of options) {
			let config = {
				rules: {
					"security/no-multiple-inheritance": option
				}
			};

			Solium.lint.bind (Solium, code, config).
				should.throw("Invalid options were passed to rule \"security/no-multiple-inheritance\".");
		}

		Solium.reset ();
		done ();
	});
});
