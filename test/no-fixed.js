/**
 * @fileoverview Tests for no-fixed rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

let Solium = require("solium");
let wrappers = require("./utils/wrappers");
let toContract = wrappers.toContract;

let userConfig = {
	rules: {
		"security/no-fixed": "error"
	}
};

describe("[RULE] no-fixed: Rejections", function() {
	it("should reject contracts using fixed point declarations", function(done) {
		let code = toContract(`
			fixed x;
			ufixed y;

			function foo () {
				fixed a; ufixed b;
			}
		`),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(4);

		Solium.reset();

		done();
	});

	it("should reject contracts using fixed point assignments", function(done) {
		let code = toContract(`
			fixed x = 100.89;
			ufixed y = 1.2;
			uint z = 3;
			uint[] a;

			function foo () {
				fixed a = 2.0; ufixed b = 90.2;
			}
		`);
		let errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(4);

		Solium.reset();

		done();
	});
});
