/**
 * @fileoverview Tests for no-fixed rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	plugins: ["security"],
	rules: {
		"security/no-non-256-bit-ints": true
	}
};

xdescribe("[RULE] no-fixed", function() {
	it("should reject contracts using non-256 bit ints", function(done) {
		var code = toContract("function foo () { int8 a; uint8 b; int16 c; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(3);

		Solium.reset();

		done();
	});
});
