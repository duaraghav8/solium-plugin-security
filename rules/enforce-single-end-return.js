/**
 * @fileoverview Functions must have a single return at the end of the function.
 * @author Mitchell Van Der Hoeff <mitchellvanderhoeff@gmail.com>
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
            for (let statement of body.slice(0, -1)) {
                if (statement['type'] === 'ReturnStatement') {
                    context.report({
                        node: node,
                        message: 'Return statement not at end of function',
                    });
                }
            }
            let last_statement = body[body.length - 1];
            if (last_statement['type'] !== 'ReturnStatement') {
                context.report({
                    node: node,
                    message: 'Missing return statement at end of function'
                });
            }
        }

        function inspectReturnDeclaration(emitted) {
            var node = emitted.node;

            if (emitted.exit) {
                return;
            }

            let parent_node = context.getSourceCode().getParent(node);
            if (parent_node['type'] !== 'FunctionDeclaration') {
                context.report({
                    node: node,
                    message: 'Missing return statement at end of function'
                });
            }
        }

        return {
            FunctionDeclaration: inspectFunctionDeclaration,
            ReturnStatement: inspectReturnDeclaration
        };

    }

};
