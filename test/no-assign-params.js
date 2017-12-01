/**
 * @fileoverview Tests for no-assign-parameter rule
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

"use strict";

let Solium = require("solium");

let config = {
    "rules": {
        "security/no-assign-params": "error"
    }
};

describe("[RULE] no-assign-params: Acceptances", function() {
    it("shouldn't raise an error for a non-assigned parameter", function(done) {
        let code = "contract Blah { function abc(uint a, uint b) { } }",
            errors = Solium.lint(code, config);

        errors.constructor.name.should.equal("Array");
        errors.should.be.size(0);

        Solium.reset();
        done();
    });

    it("shouldn't raise an error for an assigned local variable", function(done) {
        let code = "contract Blah { function abc(uint a) { uint b = 2; } }",
            errors = Solium.lint(code, config);

        errors.constructor.name.should.equal("Array");
        errors.should.be.size(0);

        Solium.reset();
        done();
    });

    it("shouldn't raise an error for an abstract function", function(done) {
        let code = "contract Blah { function my_func() returns (bytes32); }",
            errors = Solium.lint(code, config);

        errors.constructor.name.should.equal("Array");
        errors.should.be.size(0);

        Solium.reset();
        done();
    });
});

describe("[RULE] no-assign-params: Rejections", function() {
    it("should raise an error for an assigned parameter", function(done) {
        let codes = ["contract Blah { function abc(uint a, uint b) { a = 12; } }",
            "contract Blah { function abc(uint a, uint b) { b = 12; } }",
            "contract Blah { function foo(uint abc) { for(uint i = 0; i<10; i++) { abc = 2; } } }",
            "contract Blah { function foo(uint abc) { if (true) { abc = 2; } } }",
            "contract Blah { function foo(uint abc) { if (false) { } else { abc = 2; } } }",
            "contract Blah { function foo(uint abc) { while (true) { abc = 2; } } }",
            "contract Blah { function foo(uint abc) { do { abc = 2; } while(true); } }",
            "contract Blah { function foo(uint abc) { abc++; } }",
            "contract Blah { function foo(uint abc) { abc--; } }",
            "contract Blah { function foo(uint abc) { abc += 1; } }",
            "contract Blah { function foo(uint abc) { if(true) abc = 12; } }",
            "contract Blah { function foo(uint abc) { if(true) {} else abc = 12; } }",
            "contract Blah { function foo(uint abc) { if(true) if (true) abc = 12; } }",
            "contract Blah { function foo(uint abc) { while(true) abc = 12; } }",
            "contract Blah { function foo(uint abc) { while(true) while(true) abc = 12; } }",
            "contract Blah { function foo(uint x) { if (true) { do { x += 1; } while (x < 10); } } }"
        ];

        for (let code of codes) {
            let errors = Solium.lint(code, config);
            errors.constructor.name.should.equal("Array");
            errors.should.be.size(1);
        }

        Solium.reset();
        done();
    });
});
