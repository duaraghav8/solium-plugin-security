/**
 * @fileoverview Flags any loops which contain two or more break statements
 * @author Artem Litchmanov <artem.litchmanov@gmail.com>
 */

'use strict';

module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: 'error',
            description: 'Flag all loops which contain two or more break statements'
        },

        schema: []

    },

    create: function (context) {

        // loop stack will keep track of break counts inside each loop
        var loopStack = [];
        function inspectBreakStatement(emitted) {
            if (!emitted.exit) {
                loopStack[loopStack.length-1] += 1;
            }
        }

        //While exiting for loop Node, Report if the current top of stack is more than 1
        function inspectLoopStatement(emitted) {
            var node = emitted.node;
            if (emitted.exit) {
                var breakCount = loopStack.pop();
                if (breakCount > 1) {
                    context.report({
                        node: node,
                        message: 'Loop contains too many breaks.'
                    });
                }
            } else {
                // push new counter onto stack when entering loop
                loopStack.push(0);
            }
        }

        return {
            ForStatement: inspectLoopStatement,
            WhileStatement: inspectLoopStatement,
            DoWhileStatement: inspectLoopStatement,
            BreakStatement: inspectBreakStatement
        };
    }
};
