/**
 * @fileoverview Tests for no-unreachable-code rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/no-unreachable-code": "error"
	}
};

describe("[RULE] no-unreachable-code: Rejections", function() {
	it("should reject contracts with unreachable code", function(done) {
		var code = toContract("function foo () { return; fixed a; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});

describe("[RULE] no-unreachable-code: Acceptances", function() {
	it("should accept contracts without a return", function(done) {
		var code = toContract("function foo () { fixed a = 2.0; }");
		var errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(0);

		Solium.reset();

		done();
	});
});
