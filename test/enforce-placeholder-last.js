/**
 * @fileoverview Tests for enforce-placeholder-last rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/enforce-placeholder-last": "error"
	}
};

describe("[RULE] enforce-placeholder-last: Rejections", function() {
	it("should reject contracts with placeholder that is not the last statement ", function(done) {
		var code = toContract("modifier foo() { _; require(true); }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		code = toContract("modifier foo() {_; _;}");
		errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});

	it("should reject contracts with no placeholder", function(done) {
		var code = toContract("modifier foo() { require(true); }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		code = toContract("modifier foo() {}");
		errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		code = toContract("modifier foo() { boo(); hola('hello world'); }");
		errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});

	it("should reject contracts with a placeholder with no semicolon", function(done) {
		var code = toContract("modifier foo() { _ }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		code = toContract("modifier foo() { hello(); var x = 100; _ }");
		errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		code = toContract("modifier foo() { hello(); var x = 100; _\nbar(); }");
		errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(2);

		Solium.reset();

		done();
	});
});

describe("[RULE] enforce-placeholder-last: Acceptances", function() {
	it("should accept contracts with a placeholder that is the last statement", function(done) {
		var code = toContract("modifier foo() { require(true); _; }");
		var errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(0);

		Solium.reset();

		done();
	});

	it("should accept contracts with bad placeholder style", function(done) {
		const badStyles = ["_ ;", "_\n;", "_\t;", "_   ;"];

		badStyles.forEach(badStyle => {
			var code = toContract(`modifier foo() { require(true); ${badStyle} }`);
			var errors = Solium.lint(code, userConfig);

			errors.constructor.name.should.equal("Array");
			errors.length.should.equal(0);
		});

		Solium.reset();

		done();
	});
});
