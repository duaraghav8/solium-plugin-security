/**
 * @fileoverview Discourage the use of low-level functions - call(), callcode() & delegatecall().
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

var utils = require('./utils.js');

const DEFAULT_FUNCS_TO_AVOID = ["call", "callcode", "delegatecall"];

module.exports = {

    meta: {
        docs: {
            description: "Discourage use of low-level functions call(), callcode() & delegatecall()",
            recommended: true,
            type: "warning"
        },

        schema: [{
            type: "array",
            items: {
                type: "string",
                enum: DEFAULT_FUNCS_TO_AVOID
            },
            minItems: 1
        }]
    },

    create(context) {
        const functionsToAvoid = new Set(context.options ? context.options[0] : DEFAULT_FUNCS_TO_AVOID);

        function reportIfUsingFuncToAvoid(emitted) {
            const {node} = emitted;

            if (emitted.exit || !utils.isMember(node.callee)) {
                return;
            }

            const {object, property} = node.callee;

            property.type === "Identifier" && functionsToAvoid.has(property.name) && context.report({
                node,
                location: {
                    column: context.getSourceCode().getColumn(property)
                },
                message: `Avoid the use of low-level function '${property.name}'.`
            });
        }

        return {
            CallExpression: reportIfUsingFuncToAvoid
        };
    }

};
