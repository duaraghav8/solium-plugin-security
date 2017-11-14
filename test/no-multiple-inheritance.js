/**
 * @fileoverview Tests for no-multiple-inheritance rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

var Solium = require ('solium');

var userConfig = {
    rules: {
        "security/no-multiple-inheritance": "error"
    }
};

describe ('[RULE] no-multiple-inheritance: Acceptances', function () {

    it ('should accept programs that don\'t use multiple inheritance', function (done) {
        var code = 'contract Parent {}\ncontract Child is Parent{}';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.equal (0);

        Solium.reset ();
        done ();
    });
});

describe ('[RULE] no-multiple-inheritance: Rejections', function () {

    it ('should reject programs that use multiple inheritance', function (done) {
        var code = 'contract Parent {}\ncontract Uncle {}\ncontract Child is Parent,Uncle {}';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.equal (1);

        Solium.reset ();
        done ();
    });
});
