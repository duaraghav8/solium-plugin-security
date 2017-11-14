/**
 * @fileoverview Tests for else-after-else-if rule
 * @author Michelle Pokrass <michellepokrass@gmail.com>
 */

'use strict';

var Solium = require("solium");

var userConfig = {
        "rules": {
                "security/enforce-else-after-else-if": "error"
        }
};

describe('[RULE] enforce-else-after-else-if: Rejections', function () {
        it('should raise an error for an else if with no else after it', function(done) {
                var code = [
                        'contract Foo { function bar(n) { if (n > 10) { return n; } else if (n < 10) { return -n; } } }',
                        'contract Foo { function bar(n) { if (n > 10) { return n; } else if (n < 10) { return -n; } else if (n == 0) { return 1; } } }',
                ]
                var errors;
                errors = Solium.lint(code[0], userConfig);
                errors.length.should.equal (1);
                errors = Solium.lint(code[1], userConfig);
                errors.length.should.equal (1);

                Solium.reset();
                done();
        });
});

describe('[RULE] enforce-else-after-else-if: Acceptances', function () {
        it('should not raise any errors for an "else if" block followed by an "else" block', function(done) {
                var code = [
                        'contract Foo { function bar(n) { if (n > 10) { return n; } else if (n < 10) { return -n; } else { return 100; } } }',
                        'contract Foo { function bar(n) { if (n > 10) { return n; } else if (n < 10) { return -n; } else if (n == 0) { return 1; } else { return 2; } } }'
                ]
                var errors;
                errors = Solium.lint(code[0], userConfig);
                errors.length.should.equal (0);
                errors = Solium.lint(code[1], userConfig);
                errors.length.should.equal (0);

                Solium.reset();
                done();
        });
});
