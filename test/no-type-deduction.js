/**
 * @fileoverview Tests for no-type-deduction rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/no-type-deduction": "error"
	}
};

describe("[RULE] no-type-deduction", function() {
	it("should reject contracts using fixed point declarations", function(done) {
		var code = toContract("function foo () { var a = 8; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});
