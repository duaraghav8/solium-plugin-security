/**
 * @fileoverview Discourage use of void returns in functions prototypes
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: 'error',
            description: 'Discourage use of void returns in functions prototypes'
        },

        schema: []

    },

    create: function (context) {

        function inspectFunctionDeclaration(emitted) {
            var node = emitted.node;
            if (emitted.exit || node.returnParams) { return; }

            if (node.name) {
                var message = 'Avoid using a void return in function ' + node.name;
            } else {
                var message = 'Avoid using a void return in fallback function';
            }
            context.report({
                node: node,
                message: message
            });
        }

        return {
            FunctionDeclaration: inspectFunctionDeclaration
        };

    }

};
