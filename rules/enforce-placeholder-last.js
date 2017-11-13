/**
 * @fileoverview Enforce that the function placeholder is the last statement in the modifier
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

function isFunctionPlaceholder(node) {
	return (
		node.type === "PlaceholderStatement" ||
		(node.type === "ExpressionStatement" && node.expression.name === "_")
	);
}

module.exports = {
	meta: {
		docs: {
			recommended: false,
			type: "error",
			description: "Enforce that the function placeholder is the last statement in the modifier"
		},

		schema: []
	},

	create: function(context) {
		function inspectModifierDeclaration(emitted) {
			if (emitted.exit) {
				return;
			}

			var node = emitted.node;
			var topLevelStatements = node.body.body;
			var lastIndex = topLevelStatements.length - 1;

			var firstPlaceholderIndex = topLevelStatements.findIndex(isFunctionPlaceholder);

			if (firstPlaceholderIndex === -1) {
				context.report({
					node: node,
					message: "a function placeholder must exist and be the last statement in the modifier"
				});

				return;
			}

			if (firstPlaceholderIndex !== lastIndex) {
				context.report({
					node: topLevelStatements[firstPlaceholderIndex + 1],
					message: "the function placeholder must be the last statement in the modifier"
				});
			}
		}

		return {
			ModifierDeclaration: inspectModifierDeclaration
		};
	}
};