/**
 * @fileoverview Discourage use of 'tx.origin' global variable.
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

module.exports = {

    meta: {
        docs: {
            description: "Discourage use of 'tx.origin' global variable.",
            recommended: true,
            type: "error"
        },

        schema: []
    },

    create(context) {
        function isAtxoriginExpression(object, property) {
            return (object.type === "Identifier" &&
                property.type === "Identifier" && object.name === "tx" && property.name === "origin");
        }

        function reportIfIstxorigin(emitted) {
            if (emitted.exit) { return; }

            const {node} = emitted, {object, property} = node;

            isAtxoriginExpression(object, property) && context.report({
                node,
                message: "Avoid use of 'tx.origin' global variable. Consider using 'msg.sender' instead."
            });
        }

        return {
            MemberExpression: reportIfIstxorigin
        };
    }

};
