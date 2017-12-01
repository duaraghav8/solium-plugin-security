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


// Generate all fixedMxN and ufixedMxN declarations for testing.
// http://solidity.readthedocs.io/en/develop/types.html#fixed-point-numbers
const N = Array.from(Array(81).keys()),
    M = Array.from(Array(32).keys()).map(i => { return 8 * (i+1); });
const fixedWithMNSuffix = [], ufixedWithMNSuffix = [];


M.forEach(m => {
    N.forEach(n => {
        fixedWithMNSuffix.push(`fixed${m}x${n} foo;`);
        ufixedWithMNSuffix.push(`ufixed${m}x${n} bar;`);
    });
});

const fixedDeclarations = fixedWithMNSuffix.join("\n"), ufixedDeclarations = ufixedWithMNSuffix.join("\n");



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


        code = toContract(`
            fixed128x8 x;
            ufixed128x8 x;

            function foo () {
                fixed128x8 x;
                ufixed128x8 x;
            }
        `);

        errors = Solium.lint(code, userConfig);
        errors.should.be.Array();
        errors.should.have.size(4);


        const codeExhaustive = toContract(`
            ${fixedDeclarations}
            ${ufixedDeclarations}

            function foo () {
                ${fixedDeclarations}
                ${ufixedDeclarations}
            }
        `);

        // TODO: Uncomment below test once we move to a fast (antlr) parser.
        // Since we're generating too many statements, below test will take a lot of time.
        /*
        errors = Solium.lint(codeExhaustive, userConfig);
        errors.should.be.Array();
        errors.should.have.size(2 * (fixedWithMNSuffix.length + ufixedWithMNSuffix.length));
        */

        Solium.reset();

        done();
    });

    it("should reject contracts using fixed point assignments", function(done) {
        let code = toContract(`
			fixed x = 100.89;
			ufixed y = 1.2;
            fixed128x8 x = 0.0;
            ufixed128x8 y = 0.0;
			uint z = 3;
			uint[] a;

			function foo () {
				fixed a = 2.0; ufixed b = 90.2;
                fixed128x8 x = 0.0; ufixed128x8 y = 0.0;
			}
		`);
        let errors = Solium.lint(code, userConfig);

        errors.constructor.name.should.equal("Array");
        errors.length.should.equal(8);

        Solium.reset();

        done();
    });
});
