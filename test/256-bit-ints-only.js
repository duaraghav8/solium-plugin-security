/**
 * @fileoverview Tests for no-non-256-bit-ints rule
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

let Solium = require("solium");
let wrappers = require("./utils/wrappers");
let toContract = wrappers.toContract;

let userConfig = {
	rules: {
		"security/256-bit-ints-only": "error"
	}
};

describe("[RULE] 256-bit-ints-only: Rejections", function() {
	it("should reject contracts using non-256 bit ints", function(done) {
		let code = toContract("function foo () { int8 a; uint8 b; int16 c; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(3);

		code = toContract(`
			enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
			uint16[] num = [1,2,3];
			int8 constant a = 100;

			function foo() {
				string bb;
				string cc = "blah";

				bytes bb;
				bytes32 axa = "hello world";

				bool x = true;
				bool y = false;

				address mine = 0x00;

				int128[] numbers;
				int64[] numbers;

				ActionChoices f = ActionChoices.GoRight;

				var focus = 90189;
			}
		`);

		errors = Solium.lint(code, userConfig);
		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(4);

		Solium.reset();

		done();
	});
});


describe("[RULE] 256-bit-ints-only: Acceptances", function() {
	it("should accept contracts using 256 bit ints", function(done) {
		let code = toContract("function foo () { int a; uint b; int256 c; uint256d; }"),
			errors = Solium.lint(code, userConfig);

		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(0);

		code = toContract(`
			enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
			uint256[] num = [1,2,3];
			int constant a = 100;

			function foo() {
				string bb;
				string cc = "blah";

				bytes bb;
				bytes32 axa = "hello world";

				bool x = true;
				bool y = false;

				address mine = 0x00;

				int[] numbers;
				int256[] numbers;

				ActionChoices f = ActionChoices.GoRight;

				var focus = 90189;
			}
		`);

		errors = Solium.lint(code, userConfig);
		errors.constructor.name.should.equal("Array");
		errors.length.should.equal(0);

		Solium.reset();

		done();
	});
});
