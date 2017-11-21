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
		"security/no-var": "error"
	}
};

describe("[RULE] no-var: Rejections", function() {
	it("should reject contracts using type deduction through 'var'", function(done) {
		var code = toContract("function foo () { var a = 8; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});
