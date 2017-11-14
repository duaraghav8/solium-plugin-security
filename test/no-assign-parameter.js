/**
 * @fileoverview Tests for no-assign-parameter rule
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

'use strict';

var Solium = require('solium');

var config = {
        "rules": {
                "no-assign-parameter": "error"
        }
};

describe('[RULE] no-assign-parameter: Acceptances', function () {
        it('shouldn\'t raise an error for a non-assigned parameter', function(done) {
                var code = 'contract Blah { function abc(uint256 a, uint256 b) { } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(0);

                Solium.reset();
                done();
        });

        it('shouldn\'t raise an error for an assigned local variable', function(done) {
                var code = 'contract Blah { function abc(uint256 a) { uint256 b = 2; } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(0);

                Solium.reset();
                done();
        });

        it('shouldn\'t raise an error for an abstract function', function(done) {
                var code = 'contract Blah { function my_func() returns (bytes32); }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(0);

                Solium.reset();
                done();
        });
});

describe('[RULE] no-assign-parameter: Rejections', function () {
        it('should raise an error for an assigned parameter', function(done) {
                var code = 'contract Blah { function abc(uint256 a, uint256 b) { a = 12; } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for a later assigned parameter', function(done) {
                var code = 'contract Blah { function abc(uint256 a, uint256 b) { b = 12; } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for an assigned variable in a loop', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { for(uint i = 0; i<10; i++) { abc = 2; } } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for an assigned variable in an if statement', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { if (true) { abc = 2; } } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });


        it('should raise an error for an assigned variable in an else statement', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { if (false) { } else { abc = 2; } } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for an assigned variable in a while statement', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { while (true) { abc = 2; } } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for an assigned variable in a do-while statement', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { do { abc = 2; } while(true); } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for a incrementing', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { abc++; } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for a decrementing', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { abc--; } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });

        it('should raise an error for a decrementing', function(done) {
                var code = 'contract Blah { function foo(uint256 abc) { abc += 1; } }',
                        errors = Solium.lint(code, config);

                errors.constructor.name.should.equal ('Array');
                errors.should.be.size(1);

                Solium.reset();
                done();
        });
});
