/**
 * @fileoverview Tests for no-non-256-bit-ints rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/no-non-256-bit-ints": "error"
	}
};

describe("[RULE] no-non-256-bit-ints: Rejections", function() {
	it("should reject contracts using non-256 bit ints", function(done) {
		var code = toContract("function foo () { int8 a; uint8 b; int16 c; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(3);

		Solium.reset();

		done();
	});
});
