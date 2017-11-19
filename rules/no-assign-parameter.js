/**
 * @fileoverview Disallow assigning to function parameters.
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

'use strict';

var utils = require('./utils.js');

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

        function isBadAssignment (statement, params) {
            return utils.isAssignment(statement['expression']) &&
                   params.indexOf(statement['expression']['left']['name']) >= 0
        }

        function isBadUpdate (statement, params) {
            return utils.isUpdate(statement['expression']) &&
                   params.indexOf(statement['expression']['argument']['name']) >= 0

        }

        function checkExpressionStatement(statement, node, params) {
            let functionName = node.name ? `"${node.name}"` : 'Fallback function';
            if(isBadAssignment(statement, params) || isBadUpdate(statement, params)) {
                context.report({
                    node: node,
                    message: `${functionName}: Avoid assigning to function parameters.`
                });
            }
        }

        function inspectStatement (statement, node, params, following) {
            if (utils.isExpression(following)) {
                checkExpressionStatement (following, node, params);
            } else if (utils.isIfStatement(following)) {
                inspectIf (following, node, params);
            } else if (utils.isLoopStatement(following)) {
                inspectLoop (following, node, params);
            } else {
                inspectBody (following['body'], node, params);
            }
        }

        function inspectIf (statement, node, params) {
            inspectStatement (statement, node, params, statement['consequent']);

            if (statement['alternate'] == null) { return };
            inspectStatement (statement, node, params, statement['alternate']);
        }

        function inspectLoop (statement, node, params) {
            inspectStatement (statement, node, params, statement['body']);
        }

        function inspectBody (body, node, params) {
            for (let statement of body) {
                if (utils.isExpression(statement)) {
                    checkExpressionStatement (statement, node, params);
                } else if (utils.isLoopStatement(statement)) {
                    inspectLoop (statement, node, params);
                } else if (utils.isIfStatement(statement)) {
                    inspectIf (statement, node, params);
                }
            }
        }

        function inspectFunctionDeclaration (emitted) {
            if (emitted.exit || emitted.node.is_abstract) { return; }

            var node = emitted.node;

            let params = node.params.map(x => x['id']);
            inspectBody (node.body.body, node, params);
        }

        return {
            FunctionDeclaration: inspectFunctionDeclaration
        };

    }

};
