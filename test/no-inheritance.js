/**
 * @fileoverview Tests for no-inheritance rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

var Solium = require ("solium");

var userConfig = {
	rules: {
		"security/no-inheritance": "error"
	}
};

var userConfigNoInterface = {
	rules: {
		"security/no-inheritance": ["error", { "no-interface": true }]
	}
};

describe ("[RULE] no-inheritance: Acceptances", function () {

	it ("should accept programs that don't use inheritance and don't allow interfaces", function (done) {
		var code = "contract Foo {}";
		var errors;

		errors = Solium.lint (code, userConfigNoInterface);
		errors.length.should.equal (0);

		Solium.reset ();
		done ();
	});

	it ("should accept programs that use inheritance with interfaces", function (done) {
		var code = [
			"interface Foo {}\ncontract Bar is Foo {}",
			"interface Foo {}\ninterface Bar {}\ncontract FooBar is Foo,Bar {}"
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

describe ("[RULE] no-inheritance: Rejections", function () {

	it ("should reject programs that use inheritance and don't allow interfaces", function (done) {
		var code = [
			"contract Parent {}\ncontract Child is Parent {}",
			"interface Foo {}\ncontract Bar is Foo {}"
		];
		var errors;

		for (let expr of code) {
			errors = Solium.lint (expr, userConfigNoInterface);
			errors.length.should.equal (1);
		}

		Solium.reset ();
		done ();
	});

	it ("should reject programs that use inheritance without interfaces", function (done) {
		var code = [
			"contract Foo {}\ncontract Bar is Foo {}",
			"contract Foo {}\ncontract Bar {}\ncontract FooBar is Foo,Bar {}"
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

describe ("[RULE] no-inheritance: Handling options", function () {

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
					"security/no-inheritance": option
				}
			};

			Solium.lint.bind (Solium, code, config).
				should.throw("Invalid options were passed to rule \"security/no-inheritance\".");
		}

		Solium.reset ();
		done ();
	});
});
