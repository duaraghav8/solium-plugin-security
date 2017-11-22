/**
 * @fileoverview Tests for no-unreachable-code rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

let Solium = require("solium");
let wrappers = require("./utils/wrappers");
let toContract = wrappers.toContract;

let userConfig = {
	rules: {
		"security/no-unreachable-code": "error"
	}
};

describe("[RULE] no-unreachable-code: Rejections", function() {
	it("should reject contracts with unreachable code", function(done) {
		let code = toContract("function foo () { return; fixed a; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});

describe("[RULE] no-unreachable-code: Acceptances", function() {
	it("should accept contracts without a return", function(done) {
		let code = toContract("function foo () { fixed a = 2.0; }");
		let errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(0);

		Solium.reset();

		done();
	});
});
