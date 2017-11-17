/**
 * @fileoverview Flag all loops which don't have fixed bounds
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

var utils = require('./utils.js');

module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: 'error',
            description: 'Flag all loops which don\'t have fixed bounds'
        },

        schema: []

    },

    create: function (context) {

        function hasBreakStatement(expr, index, array) {
            return utils.isBreakStatement(expr);
        }

        function inspectIfStatement(node) {
            // This returns true if it finds a 'break' statement in the 'if' block
            if (node.alternate && utils.isIfStatement(node.alternate)) {
                return inspectIfStatement(node.alternate)
            } else if (node.alternate && utils.isBlockStatement(node.alternate)) {
                if (node.alternate.body.some(hasBreakStatement)) { return true; }
            }

            return node.consequent.body.some(hasBreakStatement);
        }

        function inspectLoopStatement(emitted) {
            if (emitted.exit) { return; }
            var node = emitted.node;
            var hasBreak = false;

            for (let expr of node.body.body) {
                if (utils.isBreakStatement(expr)) {
                    hasBreak = true;
                    break;
                } else if (utils.isIfStatement(expr)) {
                    hasBreak = inspectIfStatement(expr);
                }
            }

            if ((!node.test || node.test.value == true) && !hasBreak) {
                context.report({
                    node: node,
                    message: 'Loop should have fixed bounds.'
                });
            }
        }

        return {
            ForStatement: inspectLoopStatement,
            WhileStatement: inspectLoopStatement,
            DoWhileStatement: inspectLoopStatement
        };

    }

};
