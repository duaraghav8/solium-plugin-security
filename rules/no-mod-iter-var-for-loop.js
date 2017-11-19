/**
 * @fileoverview Flag for loops which modify their iteration variable in their body
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

var utils = require('./utils.js');

module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: 'error',
            description: 'Flag for loops which modify their iteration variable in their body'
        },

        schema: []

    },

    create: function (context) {

        function inspectLoopStatement(emitted) {
            var node = emitted.node;

            if (emitted.exit || !node.init || !utils.isAssignment(node.init)) {
                return;
            }

            var iterationVariable = node.init.left.name;

            for (let expr of node.body.body) {
                if (utils.isExpression(expr.expression)) {
                    continue;
                }

                if (utils.isAssignment(expr.expression) && expr.expression.left.type === 'Identifier') {
                    var name = expr.expression.left.name;
                } else if (utils.isUpdate(expr.expression) && expr.expression.argument.type === 'Identifier') {
                    var name = expr.expression.argument.name;
                } else {
                    continue;
                }

                if (name === iterationVariable) {
                    context.report({
                        node: expr,
                        message: 'Iterator variable modified in for loop'
                    });
                }
            }
        }

        return {
            ForStatement: inspectLoopStatement
        };

    }

};
