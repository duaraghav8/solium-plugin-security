/**
 * @fileoverview Encourage user to explicitly specify visibility of function
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

const FUNCTION_VISIBILITY_MODIFIERS = new Set(["external", "public", "internal", "private"]);

module.exports = {

    meta: {
        docs: {
            description: "Encourage user to explicitly specify visibility of function",
            recommended: true,
            type: "error"
        },

        schema: [],
        fixable: "code"
    },

    create(context) {
        function reportFuncIfNoVisibilitySpecified(emitted) {
            if (emitted.exit) { return; }

            function hasAVisibilityModifier(modifierList) {
                for (let modif of modifierList) {
                    if (FUNCTION_VISIBILITY_MODIFIERS.has(modif.name)) {
                        return true;
                    }
                }

                return false;
            }

            const {node} = emitted;

            /**
             * If returnParams attr exists, insert visibility right before its node.
             * If doesn't exist (is null), then:
             *   If function body is null (ie func is abstract), insert vis right before the ending semicolon
             *   Else insert it right before body (BlockStatement node)
             */
            function fix(fixer) {
                if (node.returnParams !== null) {
                    // Since we don't have exact position of 'returns' token, writing vis
                    // before it becomes bit complex. So leave it for now. TODO.
                    return null;
                }

                if (node.is_abstract) {
                    // No BlockStatement node ahead
                    return fixer.insertTextAt(node.end-1, " public");
                }

                // TODO: check whether we actually require the spaces on both of public's sides below.
                // Give space only if needed, otherwise it just creates extra (ugly) whitespace.
                return fixer.insertTextBefore(node.body, " public ");
            }

            (node.modifiers === null || !hasAVisibilityModifier(node.modifiers)) && context.report({
                node, fix,
                message: `No visibility specified explicitly for ${node.name || "the fallback"} function.`
            });
        }

        return {
            FunctionDeclaration: reportFuncIfNoVisibilitySpecified
        };
    }

};
