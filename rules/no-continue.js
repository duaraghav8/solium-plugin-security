/**
 * @fileoverview Ensure no use of continue statements in the code
 * @author Simon Hajjar <simon.j.hajjar@gmail.com>
 */

"use strict";

module.exports = {

    meta: {

        docs: {
            recommended: false,
            type: "warning",
            description: "Avoid use of 'continue' statement."
        },

        schema: []

    },

    create: function(context) {

        function inspectContinueStatement(emitted) {
            if (emitted.exit) { return; }

            context.report({
                node: emitted.node,
                message: "Avoid use of 'continue' statement."
            });
        }

        return {
            ContinueStatement: inspectContinueStatement
        };

    }

};
