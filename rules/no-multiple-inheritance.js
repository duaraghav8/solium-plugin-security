/**
 * @fileoverview Discourage use of multiple inheritance
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: 'error',
            description: 'Discourage use of multiple inheritance'
        },

        schema: []

    },

    create: function (context) {

        function inspectContractStatement(emitted) {
            if (emitted.exit) { return; }
            var node = emitted.node;

            if (node.is.length > 1) {
                context.report({
                    node: node,
                    message: 'Avoid using multiple inheritance for Contract ' + node.name
                });
            }
        }

        return {
            ContractStatement: inspectContractStatement
        };

    }

};
