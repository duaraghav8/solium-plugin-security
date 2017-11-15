/**
 * @fileoverview Enforce that the function placeholder is the last statement in the modifier
 * @author Beau Gunderson <beau@beaugunderson.com>
 */

"use strict";

const RE_PLACEHOLDER_WITH_SEMICOLON = /^\s*_\s*;\s*$/;

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
		var sourceCode = context.getSourceCode();

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
					message:
						"a function placeholder must exist and be the last statement in the " +
						`modifier named ${node.name}`
				});

				return;
			}

			const placeholder = topLevelStatements[firstPlaceholderIndex];
			const text = sourceCode.getText(placeholder);

			if (!RE_PLACEHOLDER_WITH_SEMICOLON.exec(text)) {
				context.report({
					node: placeholder,
					message: "the function placeholder must be followed with a semicolon"
				});
			}

			if (firstPlaceholderIndex !== lastIndex) {
				context.report({
					node: placeholder,
					message:
						"the function placeholder must be the last statement in the " +
						`modifier named ${node.name}`
				});
			}
		}

		return {
			ModifierDeclaration: inspectModifierDeclaration
		};
	}
};
