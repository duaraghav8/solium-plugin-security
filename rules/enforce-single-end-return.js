/**
 * @fileoverview Functions must have a single return at the end of the function.
 * @author Mitchell Van Der Hoeff <mitchellvanderhoeff@gmail.com>
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

'use strict';

module.exports = {

    meta: {

        docs: {
            recommended: false,
            type: 'error',
            description: 'Functions must have a single return at the end of the function.'
        },

        schema: []

    },

    create: function (context) {

        function inspectFunctionDeclaration(emitted) {
            var node = emitted.node;

            if (emitted.exit) {
                return;
            }

            let body = node.body.body;
            if (body.length === 0) {
                return;
            }
            let function_name = node.name ? `"${node.name}"` : 'Fallback function';
            for (let statement of body.slice(0, -1)) {
                if (statement['type'] === 'ReturnStatement') {
                    context.report({
                        node: node,
                        message: `${function_name}: Return statement not at end of function`,
                    });
                }
            }
            let last_statement = body[body.length - 1];
            if (last_statement['type'] !== 'ReturnStatement') {
                context.report({
                    node: node,
                    message: `${function_name}: Missing return statement at end of function`
                });
            }
        }

        function inspectBlockStatement(emitted) {
            var node = emitted.node;

            if (emitted.exit) {
                return;
            }

            let function_name = node.name ? `"${node.name}"` : 'Fallback function';
            if (node.parent.type !== 'FunctionDeclaration') {
                for (let statement of node.body) {
                    if (statement.type === 'ReturnStatement') {
                        context.report({
                            node: node,
                            message: `${function_name} should only have a single return statement at the end.`
                        });
                    }
                }
            }
        }

        return {
            FunctionDeclaration: inspectFunctionDeclaration,
            BlockStatement: inspectBlockStatement
        };

    }

};
