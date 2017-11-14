/**
 * @fileoverview Discourage use of inheritance
 * @author Nicolas Feignon <nfeignon@gmail.com>
 */

'use strict';

module.exports = {

    meta: {

        docs: {
            recommended: true,
            type: 'error',
            description: 'Discourage use of inheritance'
        },

        schema: []

    },

    create: function (context) {

        function inspectContractStatement(emitted) {
            if (emitted.exit) { return; }
            var node = emitted.node;

            if (node.is.length > 0) {
                context.report({
                    node: node,
                    message: 'Avoid using inheritance for Contract ' + node.name
                });
            }
        }

        return {
            ContractStatement: inspectContractStatement
        };

    }

};
