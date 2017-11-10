/**
 * @fileoverview Tests for maximum-statements-in-function rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/maximum-statements-in-function": ["error", 1]
	}
};

describe("[RULE] maximum-statements-in-function", function() {
	it("should reject contracts with functions with many lines", function(done) {
		var code = toContract("function foo () { uint8 a;\n  uint8 b;\n  uint8 c; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});
