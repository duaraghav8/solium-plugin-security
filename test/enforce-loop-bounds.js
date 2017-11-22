/**
 * @fileoverview Tests for enforce-loop-bounds rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

"use strict";

let Solium = require ("solium");
let wrappers = require("./utils/wrappers");
let toContract = wrappers.toContract;

let userConfig = {
	rules: {
		"security/enforce-loop-bounds": "error"
	}
};

describe ("[RULE] enforce-loop-bounds: Acceptances", function () {

	it ("should accept all loops that have fixed bounds", function (done) {
		let code = [
			"function foo () { for(int i=0; i<10; i++) {} }",
			"function foo () { for(;0;) {} }",
			"function foo () { while(0 > 1) {} }",
			"function foo () { while(x > 10) {} }",
			"function foo () { do {} while(0); }",
			"function foo () { for (;;) { break; } }",
			"function foo () { while (true) { if (true) { break; } } }",
			"function foo () { while (true) { if (true) {} else { break; } } }",
			"function foo () { while (true) { if (true) {} else if (0) { break; } } }",
			"function foo () { while (true) { if (true) {} else if (1) {} else { break; } } }",
			"function foo () { while (true) { if (true) {} else if (1) {} else if (1) {} else { break; } } }",
			"function foo () { do { if (1) {} else if (true) { break; } } while(true); }"
		];
		let errors;

		for (let expr of code) {
			errors = Solium.lint (toContract(expr), userConfig);
			errors.length.should.equal (0);
		}

		Solium.reset ();
		done ();
	});
});


describe ("[RULE] enforce-loop-bounds: Rejections", function () {

	it ("should reject all loops that don't have fixed bounds", function (done) {
		let code = [
			"function foo () { for(;;) {} }",
			"function foo () { while(true) {} }",
			"function foo () { for(;;) {} }",
			"function foo () { do {} while(1); }",
			"function foo () { do { do { break; } while (true); } while(true); }"
		];
		let errors;

		for (let expr of code) {
			errors = Solium.lint (toContract(expr), userConfig);
			errors.length.should.equal (1);
		}

		Solium.reset ();
		done ();
	});
});
