/**
 * @fileoverview Tests for no-inheritance rule
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

var Solium = require ('solium');

var userConfig = {
    rules: {
        "security/no-inheritance": "error"
    }
};

describe ('[RULE] no-inheritance: Acceptances', function () {

    it ('should accept programs that don\'t use inheritance', function (done) {
        var code = 'contract Foo {}';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.equal (0);

        Solium.reset ();
        done ();
    });
});

describe ('[RULE] no-inheritance: Rejections', function () {

    it ('should reject programs that use inheritance', function (done) {
        var code = 'contract Parent {}\ncontract Child is Parent {}';
        var errors;

        errors = Solium.lint (code, userConfig);
        errors.length.should.equal (1);

        Solium.reset ();
        done ();
    });
});
