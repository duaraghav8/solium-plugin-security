/**
 * @fileoverview Discourage use of .call.value()()
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

var utils = require('./utils.js');

module.exports = {

    meta: {
        docs: {
            description: "Discourage use of .call.value()()",
            recommended: true,
            type: "error"
        },

        schema: []
    },

    create(context) {
        function reportIfcallvalueUsed(emitted) {
            if (emitted.exit) { return; }

            const {node} = emitted, {object, property} = node.callee;

            if (utils.isMember(node.callee) && property.type === "Identifier" && property.name === "value"
                && utils.isMember(object) && object.property.type === "Identifier"
                && object.property.name === "call") {

                context.report({
                    node,
                    location: {
                        column: context.getSourceCode().getColumn(object.property)
                    },
                    message: "Consider using 'send' or 'transfer' in place of 'call.value()'."
                });

            }
        }

        return {
            CallExpression: reportIfcallvalueUsed
        };
    }

};
