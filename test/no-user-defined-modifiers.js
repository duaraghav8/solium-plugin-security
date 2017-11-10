/**
 * @fileoverview Tests for no-user-defined-modifiers rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

var Solium = require("solium");
var wrappers = require("./utils/wrappers");
var toContract = wrappers.toContract;

var userConfig = {
	rules: {
		"security/no-user-defined-modifiers": "error"
	}
};

describe("[RULE] no-user-defined-modifiers", function() {
	it("should reject contracts that defined modifiers", function(done) {
		var code = toContract("modifier foo () { require(1 == 1); }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(1);

		Solium.reset();

		done();
	});
});
