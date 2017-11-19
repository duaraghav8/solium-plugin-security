/**
 * @fileoverview Encourage else blocks after else-if blocks
 * @author Michelle Pokrass <michellepokrass@gmail.com>
 */

'use strict';

var utils = require('./utils.js');

module.exports = {

    meta: {
        docs: {
            description: "Encourage else blocks after else-if blocks",
            recommended: true,
            type: "error"
        },

        schema: []
    },

    create(context) {
        function inspectElseIfStatement(node) {
            // if the else if does not have an alternate, that means there is
            // no else - report an error
            if (!node['alternate']) {
                context.report({
                    node: node,
                    message: '"else if" statement must be followed by an "else" statement'
                });
            } else if (utils.isIfStatement(node['alternate'])) {
                inspectElseIfStatement(node['alternate']);
            }
        }

        function inspectIfStatement(emitted) {
            if (emitted.exit) { return; }
            var node = emitted.node;

            var sourceCode = context.getSourceCode();
            var parent = sourceCode.getParent(node);

            // only inspect top-level if statements
            if (utils.isIfStatement(parent)) {
                return;
            }

            if (node['alternate'] && utils.isIfStatement(node['alternate'])) {
                inspectElseIfStatement(node['alternate'])
            }
        }

        return {
            IfStatement: inspectIfStatement
        };
    }

};
