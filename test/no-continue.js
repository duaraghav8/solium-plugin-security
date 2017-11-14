/**
 * @fileoverview Tests for no-continue rule
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

'use strict';

var Solium = require("solium");

var userConfig = {
        "rules": {
                "security/no-continue": "error"
        }
};

describe('[RULE] no-continue: Rejections', function () {
        it('should raise an error for a continue statement', function(done) {
                var code = 'contract Blah { function bleh() { continue; } }',
                        errors = Solium.lint(code, userConfig);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });
});
