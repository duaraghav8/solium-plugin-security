/**
 * @fileoverview Disallow assigning to function parameters.
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

'use strict';

module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: 'error',
            description: 'Disallow assigning to function parameters'
        },

        schema: []
    },

    create: function (context) {

        function inspectBody (body, node, params) {
            for (let statement of body) {
                if (statement['type'] === 'ExpressionStatement') {

                    // Check for any assignment of the variables
                    if (statement['expression']['type'] === 'AssignmentExpression' &&
                        params.indexOf(statement['expression']['left']['name']) >= 0) {
                        context.report ({
                            node: node,
                            message: 'Disallow assigning to function parameters'
                        });
                    }

                    // Check for incrementing and decrementing
                    if (statement['expression']['type'] === 'UpdateExpression' &&
                        params.indexOf(statement['expression']['argument']['name']) >= 0) {
                        context.report ({
                            node: node,
                            message: 'Disallow assigning to function parameters'
                        });
                    }
                }

                if (['ForStatement', 'WhileStatement', 'DoWhileStatement'].indexOf(statement['type']) >= 0) {
                    inspectBody (statement['body']['body'], node, params);
                }

                if ('IfStatement' === statement['type']) {
                    inspectBody (statement['consequent']['body'], node, params);
                    if (statement['alternate'] != null) {
                        inspectBody (statement['alternate']['body'], node, params);
                    }
                }
            }
        }

        function inspectFunctionDeclaration (emitted) {
            if (emitted.exit) { return; }

            var node = emitted.node;
            if (node.is_abstract) { return; }

            let params = node.params.map(x => x['id']);
            inspectBody (node.body.body, node, params);
        }

        return {
            FunctionDeclaration: inspectFunctionDeclaration
        };

    }

};
