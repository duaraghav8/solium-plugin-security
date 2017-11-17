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

        schema: [{
            type: 'object',
            properties: {
                'no-interface': { type: 'boolean' }
            },
            additionalProperties: false
        }]

    },

    create: function (context) {

        var interfaces = [];
        var contracts = {};

        var noInterface = context.options && context.options[0]['no-interface'];

        function inspectInterfaceStatement(emitted) {
            if (emitted.exit || noInterface) { return; }

            interfaces.push(emitted.node.name);
        }

        function inspectContractStatement(emitted) {
            if (emitted.exit) { return; }
            var node = emitted.node;

            if (noInterface && (node.is.length > 0)) {
                context.report({
                    node: node,
                    message: 'Avoid using inheritance for Contract ' + node.name
                });
                return;
            }

            contracts[node.name] = {'parents': [], 'node': node}
            for (let parent of node.is) {
                contracts[node.name].parents.push(parent.name);
            }

        }

        function inspectProgram(emitted) {
            if (!emitted.exit || noInterface) { return; }

            for (let name in contracts) {
                let contract = contracts[name];

                for (let parent of contract.parents) {
                    if (!interfaces.includes(parent)) {
                        context.report({
                            node: contract.node,
                            message: 'Avoid using inheritance for Contract ' + name
                        });
                        break;
                    }
                }
            }
        }

        return {
            InterfaceStatement: inspectInterfaceStatement,
            ContractStatement: inspectContractStatement,
            Program: inspectProgram
        };

    }

};
